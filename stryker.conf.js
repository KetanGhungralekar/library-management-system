/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  mutate: [
    "src/**/*.js",
    "!src/server.js",
    "!src/app.js"
  ],
  testRunner: "mocha",
  mochaOptions: {
    spec: ["tests/**/*.test.js"]
  },
  reporters: ["clear-text", "html"],
  coverageAnalysis: "off",
  timeoutMS: 60000
};
