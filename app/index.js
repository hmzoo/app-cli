const express = require('express');
const Redis = require("ioredis");
const { v4: uuidv4 } = require('uuid');


const redis = new Redis({
  host: 'localhost',
  port: 6379,
});


const app = express();
app.use(express.json());

app.get('/', (req, res) => {

  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.get('/set', (req, res) => {

  redis.exists(req.query.k).then(ans => {
    console.log("exists", ans)

    if (ans == 0) {
      if (req.query.uid) {
        return redis.set(req.query.k, req.query.v).then(ans => {
          redis.set(req.query.uid, req.query.k)
          return res.json({
            ans: ans
          });
        })
      } else {
        return res.json({
          ans: "nouid"
        })
      }

    } else {
      if (!req.query.uid) {
      return res.json({
        ans: "notfree"
      })
    }else{

      return redis.get(req.query.uid).then(ans => {
        console.log(req.query.k,ans)
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

  redis.get(req.query.k).then(ans => {
    return res.json({
      v: ans
    });
  }).catch(err => {
    res.json({
      err: err
    });
  })

});


module.exports = app;
