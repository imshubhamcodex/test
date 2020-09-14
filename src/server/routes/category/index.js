import express, { response } from 'express';
import isEmpty from 'lodash/isEmpty';
import bookshelf from 'bookshelf';
import { Category } from '../../models/category';
import {Quiz} from '../../models/quiz';
import { Question, Answer } from '../../models/qna';
import commanValidationInput from '../../../shared/validations/category';
import authenticate from '../../middlewares/authenticate';

import {deleteCategory} from './categoryController';

let routers = express.Router();

function validatorInput(data, otherValidations) {
  let { errors } = otherValidations(data);
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
routers.post('/', authenticate('admin'), (req, res ) => {
  const { errors, isValid } = validatorInput(req.body, commanValidationInput);
  if (isValid) {
    const { category, status } = req.body
    Category.forge({
      category, status
    }).save().then(() => {
        res.json({ success: true });
      }).catch(errors =>
        res.status(500).send(errors)
      );
  }
  else {
    res.status(400).json({ 'errors': errors });
  }
});

routers.get('/list', (req, res ) => {
// authenticate()
  //bookshelf.plugin('pagination');
  Category
  //  .fetchPage({
  //   pageSize: 2, // Defaults to 10 if not specified
  //   page: 1, // Defaults to 1 if not specified
  // })
  .fetchAll({require:true})
  .then(function (results) {
    res.json({
      list: results,
      // totalCount: results.pagination.rowCount
  });
  }).catch(err => {
    res.json({
      list : []
    })
  })
});

routers.get('/quizList/:catId',(req,res)=>{
  const {catId} = req.params;
  Quiz.where({cat_id:catId}).fetchAll({require:true}).then(response => {
    res.json(response);
  }).catch(err => res.send(err));
})


routers.get('/delete/:catId',authenticate('admin'),deleteCategory);
                  
                          


export default routers;