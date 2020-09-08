const requiredOptions = {
  source: 'string',
  destination: 'string',
}

const optionalOptions = {
  deleteSourceFiles: 'boolean',
  appendToDestination: 'boolean',
}

const defaultOptions = {
  deleteSourceFiles: false,
  appendToDestination: false,
}

module.exports = {
  requiredOptions,
  optionalOptions,
  defaultOptions,
}
