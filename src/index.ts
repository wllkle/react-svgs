#!/usr/bin/env node

import yargs from "yargs";

import opts from "./options";
import run from "./app";

yargs(process.argv.slice(2))
    .options(opts)
    .help(false)
    .pkgConf("svg")
    .parseAsync()
    .then(run);

