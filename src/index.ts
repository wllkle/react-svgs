#!/usr/bin/env node

import yargs from "yargs";

import {opts} from "./io";
import {validate} from "./validation";
import {run} from "./app";
import {log} from "./log";
import {banner} from "./util/constants";

console.log(banner);

yargs(process.argv.slice(2))
    .pkgConf("svg")
    .options(opts)
    .help(true)
    .version(true)
    .parseAsync()
    .then(validate)
    .then(run)
    .catch(log.error);
