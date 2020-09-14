import express from 'express';
import { User } from '../../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../../config';

import passport from 'passport';

let routers = express.Router();


// Setting up the passport middleware for each of the OAuth providers
const googleAuth = passport.authenticate('google', { scope: ['profile','email'] });
const facebookAuth = passport.authenticate('facebook');


routers.get('/failed',(req,res) => {
  res.status(401).json({ errors: { form: 'Invalid Credential' } })
})


routers.get('/google',googleAuth);
routers.get('/facebook',facebookAuth);

routers.get('/google/callback',passport.authenticate('google',{failureRedirect:'/'}),(req,res) => {
  const {user} = req;
  const token = jwt.sign({
    id:user.uid,
    username:user.username,
    email:user.email,
    staus:user.status,
    role:user.role,
    userimage:user.userimage
  }, config.jwtSecret)
  res.json({ token });
})

routers.get('/facebook/callback',passport.authenticate('facebook',{failureRedirect:'/'}),facebookAuth,(req,res) => {
  const {user} = req;
  const token = jwt.sign({
    id:user.uid,
    username:user.username,
    email:user.email,
    staus:user.status,
    role:user.role,
    userimage:user.userimage
  }, config.jwtSecret)
  res.json({ token });
})


routers.post('/', (req, res) => {
  const { identifier, password } = req.body;
  return User.query({
    where: { username: identifier },
    orWhere: { email: identifier }
  }).fetch().then(user => {
    if (user) {
      if (user.get('status') === 0) {
        res.status(401).json({ errors: { form: 'User Blocked.' } })
        
      }
      else if (bcrypt.compareSync(password, user.get('password'))) {
        const token = jwt.sign({
          id:user.get('uid'),
          username:user.get('username'),
          email:user.get('email'),
          staus:user.get('status'),
          role:user.get('role'),
          userimage:user.get('userimage')
        }, config.jwtSecret)
        res.json({ token });
      }
      else {
        res.status(401).json({ errors: { form: 'Invalid Credential' } })
      }
    }
    else {
      res.status(400).json({ errors: { form: 'Invalid Credential' } })
    }

  }).catch((errors) => {
    console.log("fff");
    res.status(401).json({ errors: { form: 'Invalid Credential' } })
    
  })
    
});

export default routers;