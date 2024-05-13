## Github devops
This is a repo to learn and practice with github actions and other CICD configurations.

## Features
1. Jest configuration: run `npm run test`
2. Linter configuration: run `npm run lint` check [this article](https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/)

## Useful articles and documentation
1. [pre-commit](https://pre-commit.com/)
2. [Branch rules](https://calmcode.io/course/github-actions/prevent-merge)
3. [commitlint](https://commitlint.js.org/guides/getting-started.html)

## Angular
This is a description about how to setup devops in a basic Angular App.

1. Add angular linter: ```ng add @angular-eslint/schematics```
   1. Ignore `.nx` folder from git: `/.nx` on `.gitignore` file.
   2. Add custom rules on: `.eslintrc.json` file.
   3. Run linter: `npm run lint`.

2. Migrate to jest (optional):
   1. Install jest: `npm install jest jest-preset-angular --save-dev`
   2. Add jest configuration file: `echo "module.exports = {preset: 'jest-preset-angular',setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],coverageReporters: ['text'],roots: ['<rootDir>/src/'],testMatch: ['**/+(*.)+(spec).+(ts)'],setupFilesAfterEnv: ['<rootDir>/src/test.ts'],collectCoverage: true,coverageReporters: ['html', 'text']};" > jest.config.js`
   3. Add test configuration: `src/test.ts`
      ```ts
      import 'jest-preset-angular/setup-jest';

      Object.defineProperty(window, 'CSS', {value: null});
      Object.defineProperty(window, 'getComputedStyle', {
        value: () => {
          return {
            display: 'none',
            appearance: ['-webkit-appearance']
          };
        }
      });

      Object.defineProperty(document, 'doctype', {
        value: '<!DOCTYPE html>'
      });

      Object.defineProperty(document.body.style, 'transform', {
        value: () => {
          return {
            enumerable: true,
            configurable: true
          };
        }
      });
      ```
   4. Uninstall karma and jasmine: `npm uninstall karma karma-chrome-launcher karma-coverage-istanbul-reporter karma-jasmine karma-jasmine-html-reporter`

3. Add commitlint:
   1. Install commitlint: `npm install --save-dev @commitlint/{cli,config-conventional}`
   2. Add commitlint configuration: `echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.ts`
   3. Install husky: `npm install --save-dev husky`
   4. Init husky: `npx husky init`
   5. Add precommit configuration for commit messages: `echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg`
   6. Test commmitlint configuration: `npx commitlint --from HEAD~1 --to HEAD --verbose`

4. Add git workflows:
   1. Create file on `./github/workflows/test.yml`
   2. Add the following content:
    ```yml
    name: Jest CI

    on:
      push:
        branches: [ "main" ]
      pull_request:
        branches: [ "main" ]

    jobs:
      test:

        runs-on: ubuntu-latest

        strategy:
          matrix:
            node-version: [20.x]
            # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

        steps:
        - uses: actions/checkout@v3
        - name: Use Node.js ${{ matrix.node-version }}
          uses: actions/setup-node@v3
          with:
            node-version: ${{ matrix.node-version }}
            cache: 'npm'
        - run: npm ci
        - run: npm run test
  ```
  3. You can repeat this same file for other operations like build or lint.
