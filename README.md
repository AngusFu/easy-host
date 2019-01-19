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
  // default empty (DIRECT)
  systemProxy: '127.0.0.1:1087',
  // browser(s) to open on start
  browser: ['chrome', 'firefox'],
  // url to open on start
  startingUrl: 'http://test.wemlion.com/',
  // browsers' working dir
  // Please add `.browser/` to your `.gitignore` file.
  userDataDir: require('path').join(process.cwd(), '.browser')
})

ps1.on('exit', () => {
  console.log('Chrome exits.')
})

ps2.on('exit', () => {
  console.log('Firefox exits.')
})
```

## TODO

- [ ] HTTPS support (deeper investigation required)
- [ ] Cli support
