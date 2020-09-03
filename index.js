const path = require('path')
const fs = require('fs-extra')
const glob = require('glob')

const validateOptions = require('./validateOptions')

const defaultOptions = {deleteSourceFiles: false, appendToDestination: false}

module.exports = class FileConcatenationPlugin {
  constructor(options) {
    validateOptions(options)
    this.options = {...defaultOptions, ...options}
  }

  apply(compiler) {
    let webpackOutputPath = compiler.options.output.path
    this.destinationFilePath = path.join(
      webpackOutputPath,
      this.options.destination,
    )
    this.sourceFilesGlob = path.join(webpackOutputPath, this.options.source)

    compiler.hooks.afterEmit.tapPromise(
      'FileConcatenationPlugin',
      this.run.bind(this),
    )
  }

  async run(compilation) {
    let inputFiles = await this.performGlobSearch(this.sourceFilesGlob)

    let allInputFileContents = ''
    for (let inputFilePath of inputFiles) {
      let inputFileContents = await fs.readFile(inputFilePath)
      allInputFileContents += inputFileContents

      if (this.options.deleteSourceFiles) {
        await fs.remove(inputFilePath)
      }
    }

    if (this.options.appendToDestination) {
      await fs.appendFile(this.destinationFilePath, allInputFileContents)
    } else {
      await fs.writeFile(this.destinationFilePath, allInputFileContents)
    }
  }

  performGlobSearch(globStr) {
    return new Promise(resolve => {
      glob(globStr, null, function (er, files) {
        resolve(files)
      })
    })
  }
}
