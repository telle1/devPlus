const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile.js');
const User = require('../../models/User.js');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// @route  GET api/profile/me
// @desc   Get current user's profile
// @access Private
router.get('/me', auth, async (req, res) => {
  //   res.send('Profile route');
  try {
    let profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.log('Error message', err.message);
    res.status(500).send('Server error');
  }
});

// @route  POST api/profile/
// @desc   Create/update user profile
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()){
          return res.status(400).json({errors: errors.array()})
      }
      const {
        website,
        skills,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
        company,
        location,
        bio,
        status,
        githubusername,
        // spread the rest of the fields we don't need to check
        ...rest
      } = req.body;
 
      const profileFields = {};
      profileFields.user = req.user.id;
      if(company) profileFields.company = company;
      if(website) profileFields.website = website;
      if(location) profileFields.location = location;
      if(bio) profileFields.bio = bio;
      if(status) profileFields.status = status;
      if(githubusername) profileFields.githubusername = githubusername;
      if(skills) {
          profileFields.skills = skills.split(',').map(skill => skill.trim());
      }
      console.log(profileFields.skills);
      profileFields.social = {}
      if (youtube) profileFields.social.youtube = youtube;
      if (twitter) profileFields.social.twitter = twitter;
      if (facebook) profileFields.social.facebook = facebook;
      if (linkedin) profileFields.social.linkedin = linkedin;
      if (instagram) profileFields.social.youtube = youtube;

      try {
        let profile = await Profile.findOne({user: req.user.id });
        //Update Profile
        if(profile){
            profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true})
            return res.json(profile)
        }
        //Otherwise create a profile
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
      } catch(err) {
        console.error(err.message)
        res.status(500).send('Server Error')
      }

    //   res.send(profileFields)
    });

module.exports = router;
