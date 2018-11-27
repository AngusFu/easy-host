const { join } = require('path')
const { promisify } = require('util')
const { readFile } = require('fs')
const readFileP = promisify(readFile)

const http = require('http')
const httpProxy = require('http-proxy')
const getPort = require('get-port')

const chrome = require('./chrome')
const firefox = require('./firefox')

module.exports = async function ({
  port,
  domains,
  browser,
  startingUrl,
  userDataDir = join(process.cwd(), '.browser')
}) {
  if (typeof port !== 'number') {
    throw new TypeError('port must be a number.')
  }

  if (!Array.isArray(domains)) {
    throw new TypeError('domains is not an array.')
  }

  const [ proxyPort, pacServerPort ] = await Promise.all([
    getPort({ port: 3000 }),
    getPort({ port: 3100 })
  ])

  const template = await readFileP(join(__dirname, 'pac.txt'), 'utf-8')
  const pacContent = template
    .replace(/____PROXY_PORT____/g, proxyPort)
    .replace(/____DOMAINS____/g, JSON.stringify(domains))

  httpProxy.createProxyServer({
    target: `http://127.0.0.1:${port}`
  }).listen(proxyPort)

  http.createServer((req, res) => {
    res.writeHead(200, {
      ContentType: 'application/x-ns-proxy-autoconfig'
    })
    res.end(pacContent)
  }).listen(pacServerPort)

  console.log([
    `Proxy server running at 127.0.0.1:${proxyPort}.`,
    `PAC file is served on 127.0.0.1:${pacServerPort}.`
  ].join('\n'))

  if (!browser) {
    browser = ['chrome']
  } else {
    browser = [].concat(browser)
  }

  const options = {
    userDataDir,
    url: startingUrl,
    pacPort: pacServerPort
  }

  const promises = browser.reduce((acc, name) => {
    if (name === 'chrome') {
      return acc.concat(chrome(options))
    }
    if (name === 'firefox') {
      return acc.concat(firefox(options))
    }
  }, [])

  if (promises.length) {
    try {
      const processes = await Promise.all(promises)
      return processes
    } catch (e) {
      console.error(e)
      throw e
    }
  }
}
