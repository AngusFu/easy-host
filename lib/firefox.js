module.exports = async ({
  url,
  pacPort,
  userDataDir,
  ...rest
}) => {
  userDataDir = require('path').join(userDataDir, 'firefox')
  await require('mkdirp')(userDataDir)

  // SEE https://github.com/hughsk/firefox-launch
  const ffLaunch = require('firefox-launch')
  return ffLaunch(url, {
    // SEE https://developer.mozilla.org/en-US/docs/Mozilla/Command_Line_Options
    args: [],
    dir: userDataDir,
    env: process.env,
    nuke: false,
    pref: [
      // SEE about:config
      `user_pref('network.proxy.http', '127.0.0.1')`,
      `user_pref('network.proxy.http_port', ${pacPort})`,
      // SEE http://kb.mozillazine.org/Network.proxy.type
      `user_pref('network.proxy.type', 1)`
    ].join('\n'),
    ...rest
  })
}
