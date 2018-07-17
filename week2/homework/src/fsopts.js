'use strict';

const fs = require('fs')
const STORE_FILE_NAME = 'node.txt';
const DEFAULT_ENCODING = 'utf8';   

module.exports.readFile =  function() {
    return new Promise(function(resolve, reject) {
        fs.readFile(STORE_FILE_NAME, DEFAULT_ENCODING, 
           (err, data) => err ? reject(err) : resolve(data))
    })
}

module.exports.writeFile = function(args) {
    return new Promise(function(resolve, reject){
        if(args == '') {
            fs.writeFile('node.txt', '',(err, data) => {
                err ? reject(err) :resolve(data)
            })
        } else {
            fs.writeFile('node.txt', (args), 
            (err, data) => err ? reject(err) : resolve(data))
        }
    })
}

module.exports.deleteFile = function(args) {
    return new Promise((resolve, reject) => {
        fs.unlink(args, (err, data) => err ? reject(err) : resolve(data))
    })
}

module.exports.appendFile = (args, num) => {
    return new Promise((resolve, reject) => {
        if (args =='') {console.log('null string')}
        else {
            let jsobj = {};
            jsobj.num = num;
            args = args.join(' ').toString()
            jsobj.value = args; 
            let jstr = JSON.stringify(jsobj)
            fs.appendFile(STORE_FILE_NAME, `${jstr}\n`,
            (err, data) => err ? reject(err) : resolve(data = 1))
        }
    })
}