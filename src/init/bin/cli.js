#!/usr/bin/env node

const { resolve } = require('path')
const inquirer = require('inquirer')
const co = require('co')
const download = require('../lib/download')
const pkg = require('../package.json')
const name = process.argv.slice(2, 3)[0]
const questions = [
  {
    name: 'type',
    type: 'list',
    message: 'Please select a boilerplate type',
    choices: [
      'spa',
      'module'
    ]
  },
  {
    name: 'name',
    default: name || 'newapp',
    message: 'Project Name'
  }
]

inquirer.prompt(questions).then(answer => {
  const boiUrl = pkg.boilerplate[answer.type]
  co(function*() {
    yield download.repo(boiUrl, resolve(process.cwd(), answer.name))
  }).catch(err => console.error(err))
})

