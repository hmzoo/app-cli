
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

bddreq.set = (uid,k,v) => {

    return bddreq.check_uid_key(uid,k).then(ans =>{
        if(ans){
            return redis.set(key_prefix+k,v).then(ans =>{
                return {
                    ans: ans
                  };
            })
        }else{
            return {
                ans: "badkey"
              };
        }


    })

   
}

bddreq.uid_key = (k) => {

    return bddreq.check_key_exists(k).then(ans=>{
        console.log(ans)
        if(!ans){
            const uid=newuid();
            return redis.set(uid_prefix+uid,k).then(ans =>{ 
                return {ans:ans,uid:uid};
            })
        }else{
                return {ans:"notfree"};
        }

    })

}

bddreq.check_key_exists =(k)=> {
    return redis.exists(key_prefix+k).then(ans =>{
        return ans == 1
    })
}

bddreq.check_uid_key =(uid,k)=> {
    return redis.get(uid_prefix+uid).then(ans =>{
        return ans == k
    })
}

module.exports = bddreq;