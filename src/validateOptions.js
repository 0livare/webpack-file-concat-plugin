const pluginName = 'FileConcatenationPlugin'
const invalidOptionErrorText = `Invalid options passed to ${pluginName}`

const {requiredOptions, optionalOptions} = require('./options')

module.exports = function validateOptions(options) {
  if (!options) {
    throw new Error(
      `Options object must be passed to ${pluginName} constructor`,
    )
  }

  let requiredOptionNames = Object.keys(requiredOptions)
  for (let requiredOptionName of requiredOptionNames) {
    let passedOption = options[requiredOptionName]
    if (!passedOption) {
      throw new Error(
        `${invalidOptionErrorText}: "${requiredOptionName}" option is required`,
      )
    }
  }

  let allOptions = {...requiredOptions, ...optionalOptions}
  for (let passedOptionName of Object.keys(options)) {
    let optionExists = !!allOptions[passedOptionName]
    if (!optionExists) {
      throw new Error(
        `${invalidOptionErrorText}: Unknown option "${passedOptionName}"`,
      )
    }

    let passedOptionType = typeof options[passedOptionName]
    let expectedTypeForOption = allOptions[passedOptionName]

    if (passedOptionType !== expectedTypeForOption) {
      throw new Error(
        `${invalidOptionErrorText}: ${passedOptionName} must of of type ${expectedTypeForOption}, but found ${passedOptionType}`,
      )
    }
  }
}
