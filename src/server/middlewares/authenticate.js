import jwt from 'jsonwebtoken';
import config from '../../config';
import { User } from '../models/user';

export default function (role) {
  console.log("ddsss ", role);
  return (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    let token;
    console.log("Dd", role);
    if (authorizationHeader) {
      token = authorizationHeader.split(' ')[1];
    }

    if (token) {
      jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
          res.status(401).json({ errors: 'Failed to authenticate' });
        } else {
          User.query({
            where: { uid: decoded.id },
            select: ['email', 'uid', 'username', 'role']
          }).fetch().then(user => {
            if (!user) {
              res.status(404).json({ errors: 'No such user' });
            } else if (role && user.get('role') != role ) { 
              res.status(403).json({ errors: 'Access denied' });
            }
            else {
              req.currentUser = user;
              next();
            }
          });
        }
      });
    } else {
      res.status(403).json({
        error: 'No token provided'
      });
    }
  }
}