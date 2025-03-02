const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const setupMiddleware = (app) => {

  app.use(cors({
    origin: ["http://localhost:5173", "*"], 
    credentials: true,
  }));
  

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  
 
  app.use(cookieParser());
  
  console.log('✅ Middleware configured');
};

module.exports = setupMiddleware;