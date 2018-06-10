"use strict";

if(!process.env.RUN_ENV){
    return console.error(`\n┏ Command Error -------------- \n    Please Run With NPM!\n    Such as "npm run client"\n┗ ----------------------------`);
}

const path =require('path')
const CLIENT_NODE_MODULES = './../day-day-up-client/node_modules'
const CLIENT_MAIN =path.join(__dirname,'./../day-day-up-client');


function getClientModule(m) {return require(path.join(CLIENT_NODE_MODULES,m))}
const electron = getClientModule('electron')
const chalk = getClientModule('chalk')
const { spawn } = require('child_process')


let electronProcess = null

function electronLog (data, color) {
    let log = ''
    data = data.toString().split(/\r?\n/)
    data.forEach(line => {
        log += `  ${line}\n`
    })
    if (/[0-9A-z]+/.test(log)) {
        console.log(
            chalk[color].bold('┏ Electron -------------------') +
            '\n\n' +
            log +
            chalk[color].bold('┗ ----------------------------') +
            '\n'
        )
    }
}

function startElectron () {
    console.log(__dirname);
    electronProcess = spawn(electron, ['--inspect=5858', CLIENT_MAIN])

    electronProcess.stdout.on('data', data => {
        electronLog(data, 'blue')
    })
    electronProcess.stderr.on('data', data => {
        electronLog(data, 'red')
    })

    electronProcess.on('close', () => {
        process.exit()
    })
}

startElectron();