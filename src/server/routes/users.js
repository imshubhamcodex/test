import express from 'express';
import commanValidationInput from '../../shared/validations/signup'
import bcrypt from 'bcryptjs';
import isEmpty from 'lodash/isEmpty'

import { User, UserProfile } from '../models/user';

let routers = express.Router();

function validatorInput(data, otherValidations) {
  let { errors } = otherValidations(data);

  return User.query({
    where : {email : data.email},
    orWhere: { username: data.username }
  }).fetch().then(user => {
    if (user) {
      // if (user.get('username') == data.username) {
      //   errors.username = 'There is user with such username';
      // }
      if (user.get('email') === data.email) {
        errors.email = 'There is user with such email';
      }
    }
    return {
      errors,
      isValid : isEmpty(errors)
    }
  })
  .catch(function() {
    return {
      errors,
      isValid : isEmpty(errors)
    }
  });

}


routers.post('/', (req, res) => {
  

  validatorInput(req.body, commanValidationInput).then(({errors, isValid}) => {
    if (isValid) {
      const { username, pass , email, certifications, qualifications, organization } = req.body
      let password = bcrypt.hashSync(pass, 10);
      const status = 1;
      User.forge({
        username, email, password , status 
      }, { hasTimestamp : true}).save() 
      .then(response => {
        let user = response.id;
        UserProfile.forge({certifications, qualifications, organization, user}).save()
        .then(() => {
          res.json({success : true});
        }).catch (errors =>
          res.status(500).send(errors));
      }).catch(errors =>
        res.status(500).send(errors)
      );
    }
    else {
      res.status(400).json(errors);
    } 
  }); 
});

export default routers;
