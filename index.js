#! /usr/bin/env node

const { program } = require('commander')
const conf = new (require('conf'))()
const { v4: uuidv4 } = require('uuid');


//uid
let uid = conf.get('uid');
console
if (!uid){
    uid=uuidv4();
    conf.set('uid',uid);
}

//num
let num = "NONE"

const myinfos = ()=>{
    console.log(('UID: %s NUM: %s'),uid,num)
}

program
    .command('info')
    .description('My infos')
    .action(myinfos)

program
    .command('hello')
    .description('Say hello')
    .action(()=>{console.log("hello")})

program.parse();

