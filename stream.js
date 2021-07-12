const { exec } = require("child_process")
const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const YoutubeDlWrap = require("youtube-dl-wrap")
const youtubeDlWrap = new YoutubeDlWrap()

class Video {
    async load(url, youtube_dl, msg) {
		if (youtube_dl) {
			console.log("Downloading...")
			const fileName = await this.download(url)
			url = __dirname + "/client/tmp/" + fileName
        }

		await this.driver.executeScript(`video.src='${url}'`)
            .then(_ => {
                console.log('Loading...')
                var int = setInterval(() => {
                    this.driver.getCurrentUrl()
                        .then(url => {
                            if (url === "file:///channels/@me") {
                                this.open_guild()
                                this.join()
                                this.start()
                                clearInterval(int)
                            }
                        })
                }, 10)
            })
		
		// Wait until video load
        var int = setInterval(() => {
            this.driver.executeScript("return video.duration")
                .then(result => {
                    if (result) {
                        this.duration = result
                        clearInterval(int)
                    }
                })
        }, 10)
    }

    download(url) {
        return new Promise((resolve, reject) => {
            const fileName = Date.now()
            const path = "./client/tmp"
            exec(`rm -rf ${path}/*`, _ => {
                youtubeDlWrap.exec([url, "-o", `${path}/video`])
                .on("progress", progress => {
                    console.log(progress);
                })
                .on("close", () => {
                    exec(`mv ${path}/* ${path}/${fileName}`, _ => {
                        console.log("done")
                        resolve(fileName)
                    })
                })
            })
        })
    }

    play() {
        console.log("Play")
        this.driver.executeScript('video.play()')
    }

    pause() {
        console.log("Pause")
        this.driver.executeScript('video.pause()')
    }

    current(time=null) {
        if (time) {
            if (time[0] === '+' || time[0] === '-') {
                this.current().then(c => {
                    if (!c) return

                    let r
                    c = parseFloat(c)
                    const s = parseInt(time.slice(1)) 

                    time[0] === '+' ?
                    r = c + s :
                    r = c - s

                    this.driver.executeScript(`video.currentTime = ${r}`)
                })
            }
            else
                this.driver.executeScript(`video.currentTime = ${time}`)
        }
        else
            return this.driver.executeScript("return video.currentTime")
    }

    hms(sec) {
        if (sec)
            return new Date(sec * 1000).toISOString().substr(11, 8)
        return sec
    }
}

class Stream extends Video {
    client_url = `file://${__dirname}/client/index.html`

    constructor(token, headless=true) {
        super()
        const chrome_options = new chrome.Options()
        headless && chrome_options.addArguments('--headless')
        chrome_options.addArguments('--no-sandbox')
        chrome_options.addArguments('--window-size=1920,1080')
        chrome_options.addArguments('--disable-web-security')
        chrome_options.addArguments('--disable-dev-shm-usage')
        chrome_options.addArguments('--autoplay-policy=no-user-gesture-required')
        chrome_options.addArguments('user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36')
        console.log("Webdriver started")
        this.driver = new webdriver.Builder().forBrowser('chrome').setChromeOptions(chrome_options).build()
        this.driver.get(this.client_url)
        this.driver.executeScript(`localStorage.setItem("token", '"${token}"')`)
    }

    open_guild() {
        this.driver.executeScript(`document.querySelector('[data-list-item-id="guildsnav___${this.guild_id}"]').click()`)
    }

    is_full() {
        this.driver.executeScript(`return document.querySelector("[data-list-item-id='channels___${this.channel_id}']").innerHTML.includes("Voice (Locked)")`)
            .then(result => {
                return result
            })
    }

    is_locked() {
        this.driver.executeScript(`return document.querySelector("[data-list-item-id='channels___${this.channel_id}']").innerHTML.includes("Voice (Locked)")`)
            .then(result => {
                return result
            })
    }

    scroll() {
        this.driver.executeScript(`
            var c_inject = document.getElementById("channels");
            if( c_inject.scrollTop === (c_inject.scrollHeight - c_inject.offsetHeight))
                c_inject.scroll(0, 0)
            else
                c_inject.scroll(0, c_inject.scrollTop + 250)
        `)
    }

    join() {
        this.scroll()

        if (this.is_locked()) {
            console.log("Channel is locked")
            return false
        }

        this.driver.executeScript(`document.querySelector("[data-list-item-id='channels___${this.channel_id}']").click()`)

        if (this.is_full()) {
            console.log("Channel is full")
            return false
        }
    }

    start() {
        this.driver.executeScript(`
                var streamBtn_inject = document.querySelector('[aria-label="Share Your Screen"]')
                !streamBtn_inject.className.includes('buttonActive-3FrkXp') &&
                    streamBtn_inject.click()
        `).catch(e => e)
    }

    stop() {
        console.log("Stop")
        this.driver.get(this.client_url)
    }
}

exports.Stream = Stream