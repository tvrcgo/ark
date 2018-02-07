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
    message: 'Select a boilerplate type',
    choices: [
      'spa',
      'module',
      'cli'
    ]
  },
  {
    name: 'name',
    default: name || 'newapp',
    message: 'Project Name'
  }
]

co(function* (){
  const answer = yield inquirer.prompt(questions)
  const boiUrl = pkg.boilerplate[answer.type]
  const saveDir = resolve(process.cwd(), answer.name)
  yield download.repo(boiUrl, saveDir)
})
