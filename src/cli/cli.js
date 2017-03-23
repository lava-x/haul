/**
 * Copyright 2017-present, Callstack.
 * All rights reserved.
 * 
 * @flow
 */
const program = require("commander");
const pjson = require("../../package.json");
const logger = require("../utils/logger")(false);

import type { Command, Context } from "../types";

const commands: Array<Command> = [require("./start")];

const ctx: Context = {
  console: console,
};

commands.forEach(cmd => {
  program
    .command(cmd.name)
    .description(cmd.description)
    .action(() => {
      logger.clear();
      logger.printLogo();
      cmd.action(ctx);
    });
});

program
  .command('*', null, { noHelp: true })
  .action((cmd) => {
    logger.clear();
    logger.printLogo();
    logger.error(`:x:  Command '${cmd}' not recognized`);
    program.help();
  });

program.version(pjson.version).parse(process.argv);