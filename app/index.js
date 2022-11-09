const express = require('express');
const conf = new (require('conf'))()

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
      message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
    });
  });

  app.get('/set', (req, res) => {
    if(req.query.k && req.query.v){
      conf.set(req.query.k,req.query.v);
    }
    
    res.json({
      k: req.query.k,v: req.query.v
    });
  });

  app.get('/get', (req, res) => {
    
    res.json({
      k: req.query.k,v: conf.get(req.query.k)
    });
  });
 
 
module.exports = app;
