#!/usr/bin/env node

const fs = require('fs')
const program = require('commander')

program
    .version('1.0.0')
    .option('-e, --extension [extension]', 'File extension will be scanned. Ex: -e "js,css,html" ')
    .option('-i, --ignore [ignore]', 'File or Directory will be passed when scan. Ex: -i "node_modules,bin/build,.git"')
    .option('-o, --object [object]', 'File or Directory will be scanned. Default is all file and directory. Ex: -o "app,public"')
    .parse(process.argv)


let root = process.cwd()
let ls = fs.readdirSync(`${root}`)
let obj = []
let ign = []
let ext = []

if (program.object){
    obj = program.object.split(',')
}

if (program.ignore){
    ign = program.ignore.split(',')
}

if (program.extension){
    ext = program.extension.split(',')
}

let line = 0
let file = 0
let dir = 0
while (ls.length > 0){
    let cur = ls.shift()
    let path = `${root}/${cur}`

    if (obj.length > 0){
        let c = false
        for (let name of obj)
            if (name === cur.substr(0, name.length)){
                c = true
                break
            }
        if (!c){
            continue
        }
    }

    if (ign.length > 0){
        let c = false
        for (let name of ign)
            if (name === cur.substr(0, name.length)){
                c = true
            }
        if (c){
            continue
        }
    }

    let stat = fs.statSync(path)

    if (stat.isFile()){
        if (ext.length > 0){
            let c = false
            for (let e of ext){
                if (cur.substr(cur.length - e.length - 1, e.length + 1) === `.${e}`){
                    c = true
                    break
                }
            }
            if (!c)
                continue
        }
        
        let text = fs.readFileSync(path).toString()
        let r = /\n/gm
        while (r.exec(text))
            line++
        file++
    } else {
        dir++
        let ls2 = fs.readdirSync(path)
        for (let name of ls2)
            ls.push(`${cur}/${name}`)
    }
}

console.log(`File: ${file} - Dir: ${dir} - Line: ${line}`)