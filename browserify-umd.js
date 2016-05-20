"use strict;"

const browserify  = require("browserify");
const fs = require("fs");
const glob = require("glob");
const Umd = require("browserify-umdify");
const util = require("util");

const distOutFileUnversioned = "./dist/umd.js";
const distOutUnversioned = fs.createWriteStream(distOutFileUnversioned, { encoding: "utf-8", flags: "w"});

browserify({
    extensions: [".js", ".json"],
    debug: true
})
.require("./dist/index.js", { expose: "la-party" })
.bundle()
.pipe(new Umd())
.pipe(distOutUnversioned);