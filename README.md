# easy-host

No more Swicth Hosts.

## Install

```
yarn add --dev easy-host
```

Please make sure that following host is set:

```
127.0.0.1 localhost
```

## Usage

```js
const easyHost = require('easy-host')

const [ps1, ps2] = await easyHost({
  port: 8081,
  domains: ['test.wemlion.com'],
  browser: ['chrome', 'firefox'],
  startingUrl: 'http://test.wemlion.com/'
})

ps1.on('exit', () => {
  console.log('Chrome exits.')
})

ps2.on('exit', () => {
  console.log('Firefox exits.')
})
```
