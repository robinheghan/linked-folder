#!/usr/bin/env node

const process = require('process');
const path = require('path');
const fs = require('fs');

const time = new Date();
const args = process.argv.slice(2);

if (args.length !== 3) {
    console.log('Usage: <src-dir> <dest-dir> <subfolder>');
    process.exit(1);
}

const [src, dest, name] = args;
const linkFrom = path.resolve(src, name);
const linkTo = path.resolve(dest, src);

if (!fs.existsSync(linkFrom)) {
    console.log(`${linkFrom} does not exist!`);
    process.exit(1);
}

const linkFromStats = fs.lstatSync(linkFrom);
if (!linkFromStats.isDirectory()) {
    console.log(`${linkFrom} must be a directory!`);
    process.exit(1);
}

if (fs.existsSync(linkTo)) {
    if (!fs.lstatSync(linkTo).isSymbolicLink()) {
        console.log(`It seems ${linkTo} exists and is not a link. Aborting...`);
        process.exit(1);
    }
 
    fs.unlinkSync(linkTo);
}

fs.symlinkSync(linkFrom, linkTo);
touchFilesInDir(linkFrom);


function touchFilesInDir(dir) {
    const dirContents = fs.readdirSync(dir);

    for (let item of dirContents) {
        const fullpath = path.resolve(dir, item);

        if (fs.lstatSync(fullpath).isDirectory()) {
            touchFilesInDir(fullpath);
            continue;
        }

        touch(fullpath);
    }
}

function touch(filepath) {
    try {
        fs.utimesSync(filepath, time, time);
    } catch (err) {
        fs.closeSync(fs.openSync(filepath, 'w'));
    }
}