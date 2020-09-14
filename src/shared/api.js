import fetch from 'isomorphic-fetch'
import axios from 'axios';
import jwt from 'jsonwebtoken';



export function fetchPopularRepos (language = 'all') {
  const encodedURI = encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

  return fetch(encodedURI)
    .then((data) => data.json())
    .then((repos) => repos.items)
    .catch((error) => {
      console.warn(error)
      return null
    });
}

export function uploadFile(file){
  return axios.post('/api/file/upload',file);
}


export function submitFormDetails(formData){
  return axios.post('/api/file/submit',formData,{
    headers:{
      'Content-Type':'application/json'
    }
  })
}

export function getQuizList(catId){
  return axios.get(`/api/category/quizList/${catId}`);
}


export function getQuestions(quizId,limit){

    const userDetails = jwt.decode(localStorage.jwtToken);
    return userDetails === null ? axios.post(`/api/quiz/quizid/${quizId}`,{
        limit
    },{
        headers:{
            contentType:'application/json',
        }
    }) : 
    axios.post(`/api/quiz/quizid/${quizId}`,{
      limit
    },{
      headers:{
          contentType:'application/json',
          uid:userDetails.id,
          email:userDetails.email
      }
  })
}

export function getAnswers(qsidList){
  return axios.post(`/api/quiz/answers`,{
    qsidList
  },{
    headers:{
      contentType : 'application/json'
    }
  });
}


export function deleteCategory(catId){
  return axios.get(`/api/category/delete/${catId}`);
}


export function deleteQuiz(qid){
  return axios.get(`/api/quiz/delete/${qid}`);
}

export function fetchMetaData(pathName){
  return axios.post(`/api/metadata/get`,{pathName},{
    headers :{
      contentType : 'application/json',
    }
  });
} 

export function submitMeta(payload){
  return axios.post('/api/metadata/set',payload,{
    headers :{
      contentType : 'application/json',
    }
  })
}