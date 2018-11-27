module.exports = async ({
  url,
  pacPort,
  userDataDir,
  ...rest
}) => {
  userDataDir = require('path').join(userDataDir, 'chrome')
  await require('mkdirp')(userDataDir)

  // SEE https://github.com/GoogleChrome/chrome-launcher
  return require('chrome-launcher').launch({
    userDataDir,
    startingUrl: url,
    envVars: process.env,
    enableExtensions: true,
    chromeFlags: [`--proxy-pac-url=http://127.0.0.1:${pacPort}`],
    ...rest
  }).then(chrome => chrome.process)
}
