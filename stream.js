const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

class Video {

}

class Stream extends Video {
    constructor(token) {
        super()
        const client_url = `file://${__dirname}/client/index.html`
        const chrome_options = new chrome.Options()
        //chrome_options.addArguments('--headless')
        chrome_options.addArguments('--no-sandbox')
        chrome_options.addArguments('--window-size=1920,1080')
        chrome_options.addArguments('--disable-web-security')
        chrome_options.addArguments('--disable-dev-shm-usage')
        chrome_options.addArguments('-–allow-file-access-from-files')
        chrome_options.addArguments('--autoplay-policy=no-user-gesture-required')
        this.driver = new webdriver.Builder().forBrowser('chrome').setChromeOptions(chrome_options).build()

        this.driver.get(client_url)
        this.driver.executeScript(`localStorage.setItem("token", '"${token}"')`)
    }
}

exports.Stream = Stream