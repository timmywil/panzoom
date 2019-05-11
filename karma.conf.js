module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'karma-typescript'],
    files: ['panzoom.ts', 'test/unit/*.test.ts'],
    preprocessors: {
      '**/*.ts': ['karma-typescript']
    },
    karmaTypescriptConfig: {
      tsconfig: './tsconfig.json',
      compilerOptions: {
        sourceMap: true
      }
    },
    reporters: ['progress', 'karma-typescript'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true,
    browsers: ['ChromeHeadless'],
    concurrency: Infinity
  })
}
