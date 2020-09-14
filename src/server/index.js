require('dotenv').config();

import express from "express"
import cors from "cors"
/*import thunk from 'redux-thunk'
import { createStore,  applyMiddleware, compose} from 'redux'
import rootReducer from '../shared/Reducer/rootReducer';*/

import passport from 'passport';
import passportInit from './passport-setup';
import session from 'express-session';

import React from "react"
import { renderToString } from "react-dom/server"
import { Provider } from 'react-redux'
import { StaticRouter, matchPath } from "react-router-dom"
import serialize from "serialize-javascript"
import App from '../shared/App'
import routes from '../shared/routes'
import bodyParser from 'body-parser';

import users from './routes/users';
import auth from './routes/auth';
import category from './routes/category';
import file from './routes/file';
import quiz from './routes/quiz';
import metadata from './routes/metadata';
// import store from '../shared/store';
import configureStore from '../shared/store';
import { PathData, Metadata } from "./models/metadata";

const app = express()

app.use(bodyParser.json());
app.use(cors())
app.use(express.static("public"))

app.use(session({ 
  secret: 'secret', 
  resave: true, 
  saveUninitialized: true 
}))

app.use(passport.initialize());
app.use(passport.session());
passportInit();

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/category', category);
app.use('/api/file',file);
app.use('/api/quiz',quiz);
app.use('/api/metadata',metadata);

const sendRes = (Data,markup,res,metaData) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      ${metaData}    
      <script src="/bundle.js" defer></script>
      
      <script>window.__INITIAL_DATA__ = ${serialize(Data)}</script>
      
      <!-- Global site tag (gtag.js) - Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-NHL2TN6RSQ"></script>
      <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-NHL2TN6RSQ');
      </script>
      
      <script data-ad-client="ca-pub-1599290037328689" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      
    </head>

    <body>
      <div id="app">${markup}</div>
    </body>
  </html>
`)
}

app.get("*", (req, res, next) => {
  console.log(req.url,"::::::::::");
  const data = {};
  const context = {};
  const store = configureStore();
  const markup = renderToString(
    <StaticRouter location={req.url} context={context}>
        <Provider store={ store }><App /></Provider>
    </StaticRouter>
  )

  const defaultMeta = 
  `<title>SimplyOpen: Prepare online for all major Certification Exams</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="keyword" content="SimplyOpen, Simply open, certification exams, certification, exam, exam engine, Certification Questions, testing engine, exam simulator, certification preparation, dump">
  <meta name="description" content="SimplyOpen offers free access to professional IT training Exams and Certifications in Exam Engine formats to help individuals prepare for them easily.">`

  if(req.url !== '/images/logo.png'){
   PathData.where({path:req.url}).fetch().then(pageRes => {
      const {pid} = pageRes.attributes; 
      Metadata.where({pathId:pid}).fetchAll({require:true}).then(metaRes =>{
        const metaAttribsList = metaRes.models.map(ele => ele.attributes);
        const metaList = metaAttribsList.map(item => item.key.trim().toLowerCase() != 'title' ? 
              `<meta name="${item.key.trim()}" content="${item.value.trim()}">` : `<title>${item.value.trim()}</title>`);
        const metaData = metaList.reduce( (acc,item) => {
          acc += item;
          return acc;
        } , '' );
        sendRes(data,markup,res,metaData);
      }).catch(err => {
        sendRes(data,markup,res,defaultMeta);
      })
    }).catch(err => {
      sendRes(data,markup,res,defaultMeta);
    })
    // }) 
  }
  else{
    const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}

    const promise = activeRoute.fetchInitialData
      ? activeRoute.fetchInitialData(req.path)
      : Promise.resolve()
  
    promise.then((data) => {
      const context = { data }
      const store = configureStore();
      const markup = renderToString(
        <StaticRouter location={req.url} context={context}>
            <Provider store={ store }><App /></Provider>
        </StaticRouter>
      )
       sendRes(data,markup,res,defaultMeta); 
    }).catch(next)
  
  }
})

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`)
})

/*
  1) Just get shared App rendering to string on server then taking over on client.
  2) Pass data to <App /> on server. Show diff. Add data to window then pick it up on the client too.
  3) Instead of static data move to dynamic data (github gists)
  4) add in routing.
*/