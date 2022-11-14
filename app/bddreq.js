
const { v4: uuidv4 } = require('uuid');
const Redis = require("ioredis");

const redis = new Redis({
    host: 'localhost',
    port: 6379,
  });

const uid_prefix = "UID:";
const key_prefix = "KEY:";
const newuid = () => {return uuidv4()}

const bddreq = {

}

bddreq.get = (k) => {
    return redis.get(key_prefix+k).then(ans =>{
        return {
            v: ans
          };
    }).catch(err=>{
        return {
        err: err
      };
    })
}

bddreq.set = (k,v) => {
    return redis.set(key_prefix+k,v).then(ans =>{
        return {
            ans: ans
          };
    }).catch(err=>{
        return {
        err: err
      };
    })
}

bddreq.register_uid = (k,v) => {
    const uid=newuid();
    return redis.set(uid_prefix+uid,k).then(ans =>{
        return bddreq.set(k,v).then(ans=>{
        ans.uid=uid;
        return ans;
    })})

}

module.exports = bddreq;