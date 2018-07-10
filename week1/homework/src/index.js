'use strict';

// TODO: Write the homework code in this file
const http = require('http'); 

const server = http.createServer()
        .listen(8080, console.log('listening...'));

let state =  10;

server.on('end', (err) => {
    console.error(err.stack);
    }).on('request', (request, response) => {
        console.log("localhost:8080" + request.url + ' ..request success');
        response.writeHead(200, {
            "Content-Type": "text/html"
        });
        response.write('<html><body><h1>');
        switch (request.url) {
            case '/state':
                response.write(`state: ${state} <br>`);
                break;
            case '/add':
                state += 1
                response.write(`OK, state: ${state}<br>`);
                break;
            case '/subtract':
                state -= 1
                response.write(`OK, state: ${state}<br>`);
                break;
            case '/reset':
                state = 10;
                response.write(`OK, state: ${state}<br>`);
                break;
            default:
                response.write('404: This Page Not found<br>');
                break;
        }
        response.end('Hello, There!</h1></body></html>', console.log('response success'));
    })


