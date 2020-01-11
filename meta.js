const path = require('path')
const fs = require('fs')

const {
  sortDependencies,
  installDependencies,
  runLintFix,
  printMessage,
} = require('./utils')
const pkg = require('./package.json')

const templateVersion = pkg.version

const { addTestAnswers } = require('./scenarios')

module.exports = {
  metalsmith: {
    // When running tests for the template, this adds answers for the selected scenario
    before: addTestAnswers
  },
  helpers: {
    if_or(v1, v2, options) {

      if (v1 || v2) {
        return options.fn(this)
      }

      return options.inverse(this)
    },
    template_version() {
      return templateVersion
    },
  },

  prompts: {
    name: {
      when: 'isNotTest',
      type: 'string',
      required: true,
      message: 'Project name',
    },
    description: {
      when: 'isNotTest',
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'A Vue.js project',
    },
    author: {
      when: 'isNotTest',
      type: 'string',
      message: 'Author',
    },
    vuex: {
      when: 'isNotTest',
      type: 'confirm',
      default: true,
      message: 'Install vuex?'
    },
    platform: {
      when: 'isNotTest',
      type: 'list',
      message: 'PC or Mobile run your project ?',
      default: 'mobile',
      choices: [
        {
          name: 'Mobile',
          value: 'mobile',
          short: 'mobile',
        },
        {
          name: 'PC',
          value: 'pc',
          short: 'pc',
        }
      ]
    },
    autoInstall: {
      when: 'isNotTest',
      type: 'list',
      default: 'yarn',
      message:
          'Should we run `yarn install` for you after the project has been created?',
      choices: [
        {
          name: 'Yes, use Yarn (recommended)',
          value: 'yarn',
          short: 'yarn',
        },
        {
          name: 'Yes, use NPM',
          value: 'npm',
          short: 'npm',
        }
      ],
    },
  },
  filters: {
    'src/store/**/*': 'vuex',
    'postcss.config.js': "platform === 'mobile'",
  },
  complete: function(data, { chalk }) {
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          return runLintFix(cwd, data, green)
        })
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  },
}