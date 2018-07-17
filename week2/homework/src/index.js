'use strict';

const fsopts = require('./fsopts')
const cmd = process.argv[2]; //0 node 1 main.js 2 args(add/help)
const args = process.argv.slice(3) //3 arg banana// get input from cmd

function printHelp(){
    console.log(
        `Options:
        add: Adds a todo item
        remove: remove an item by index
        help: print help
        list: show all todo item
        reset: remove all todo items
        updata: updata info (num, value)`
    )
}

function toObj(dt) {
    let jobj = [];
    let str = dt.split('\n');
    str = str.slice(0, str.length-1)

    for(let i in str) {
        jobj.push(JSON.parse(str[i]))
    }
    return jobj;
}

function toStr(dt) {
    let txt ='';
    for(let i = 0; i < dt.length; i++) {
        txt += `${JSON.stringify(dt[i])}\n`;
    }
    return txt;
}

switch(cmd) {
    case 'add':
        fsopts.readFile()
            .then(data => {
                let num = data.split('\n').length;
                fsopts.appendFile(args, num);
                return new Promise((reslove, reject) => {
                    reslove(fsopts.readFile());
                })
            }).then(data => console.log(`To-Dos:\n${data}`))
            .catch()
        break;
    case 'help':
        printHelp()
        break;
    case 'remove':
        fsopts.readFile()
            .then(dt => {
                if(args == '') {console.log('null string')}
                else {
                    let jobj = toObj(dt);

                    //find args and delete the last one
                    let rJobj = [...jobj];
                    rJobj.reverse();

                    let exit = rJobj.find((elem) => {
                        return elem.value == args.join(' ')
                    } )
                    if(exit == undefined) {console.log("no such string")}
                    else {
                        jobj.splice((jobj.indexOf(exit)), 1);
                        jobj = toStr(jobj);
                        console.log(jobj)
                        fsopts.writeFile(jobj);
                    }
                }
            }).catch((err) => console.log(err))
        break;
    case 'list':
        fsopts.readFile().then(data => console.log(`To-Dos:\n${data}`))
        break;
    case 'reset':
        fsopts.writeFile('');
        break;
    case 'update':
        fsopts.readFile()
            .then(data => toObj(data))
            .then(data => {
                let all = args.join(' ').split(' ').slice(1,args.length).join(' ');
                for(let i in data) {
                    if(data[i].num == parseInt(args[0])){
                        data[i].value = all;
                        console.log(args[1])
                        break;   
                    }
                }
                data = toStr(data);
                console.log(data);
                fsopts.writeFile(data);
            }).catch((err) => console.log('no such num'))
        break;
    default:
        console.log('Cannot understand')
        break;
}