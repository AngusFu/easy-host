const launch = require('./lib')

launch({
  port: 8081,
  domains: ['test.wemlion.com'],
  browser: ['chrome', 'firefox'],
  startingUrl: 'http://test.wemlion.com/'
}).then(([ps1, ps2]) => {
  ps1.on('exit', () => {
    console.log('Chrome exits.')
  })
  ps2.on('exit', () => {
    console.log('Firefox exits.')
  })
}).catch(console.error)
