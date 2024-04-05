"use strict";
module.exports = {
  moduleDirectories: [
    'node_modules'
  ],
  transform: {
    "\\.tsx?$": ["ts-jest", { "tsConfig": '<rootDir>/tsconfig.json' }],
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\](?!lodash-es/).+\\.js$"
  ],
};
