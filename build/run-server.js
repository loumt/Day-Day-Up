"use strict";

if(!process.env.RUN_ENV){
    return console.error(`\n┏ Command Error -------------- \n    Please Run With NPM!\n    Such as "npm run server"\n┗ ----------------------------`);
}

const path =require('path')
const SERVER_NODE_MODULES = './../day-day-up-back-server/node_modules'
function getServerModule(m) {return require(path.join(SERVER_NODE_MODULES,m))}
const { exec } = require('child_process')
const chalk = getServerModule('chalk')

let serverProcess = null

function serverLog (data, color) {
    let log = ''
    data = data.toString().split(/\r?\n/)
    data.forEach(line => {
        log += `  ${line}\n`
    })
    if (/[0-9A-z]+/.test(log)) {
        console.log(chalk[color].bold(log))
    }
}

function startServer () {
    serverProcess = exec(`node ./day-day-up-back-server/bin/www`)
    serverProcess.stdout.on('data', data => {
        serverLog(data, 'blue')
    })
    serverProcess.stderr.on('data', data => {
        serverLog(data, 'red')
    })
    serverProcess.on('close', () => {
        process.exit()
    })
}

startServer();
