const express = require('express');
const Redis = require("ioredis");
const { v4: uuidv4 } = require('uuid');
const bddreq = require('./bddreq.js')


const redis = new Redis({
  host: 'localhost',
  port: 6379,
});


const app = express();
app.use(express.json());

app.get('/', (req, res) => {

  res.json({
    message: 'hello',
  });
});

app.get('/set', (req, res) => {

  redis.exists(req.query.k).then(ans => {
    console.log("exists", ans)

    if (ans == 0) {
      let uid = ""
      if (req.query.uid) { uid=req.query.uid;}else{uid=uuidv4();}
        return redis.set(req.query.k, req.query.v).then(ans => {
          redis.set("UID:"+uid, req.query.k)
          return res.json({
            ans: ans,
            uid: uid
          });
        })
     

    } else {
      if (!req.query.uid) {
      
      return res.json({
        ans: "notfree"
      })
    }else{

      return redis.get("UID:"+req.query.uid).then(ans => {
        console.log(req.query.k,req.query.uid,ans,typeof(ans),typeof(req.query.uid))
        if(ans == req.query.k){
        return redis.set(req.query.k, req.query.k).then(ans=>{
        return res.json({
          ans: ans
        });
      })}else{
        return res.json({
          ans: "notfree"
        })
      }


    })
      


    }

    }
  }).catch(err => {
    res.json({
      err: err
    });
  })


});

app.get('/get', (req, res) => {
  bddreq.get(req.query.k).then( rep =>{
    res.json(rep);
  })
});

app.get('/uid', (req, res) => {
  bddreq.register_uid(req.query.k,req.query.v).then( rep =>{
    res.json(rep);
  })
});


module.exports = app;
