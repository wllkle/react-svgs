#!/usr/bin/env node

import yargs from "yargs";

import opts from "./io/options";
import validate from "./validation";
import run from "./app";
import log from "./log";

yargs(process.argv.slice(2))
    .pkgConf("svg")
    .options(opts)
    .help(false)
    .parseAsync()
    .then(validate)
    .then(run)
    .catch(log.error);
