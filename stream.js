const { exec } = require("child_process")
const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const YoutubeDlWrap = require("youtube-dl-wrap")
const youtubeDlWrap = new YoutubeDlWrap()

class Video {
    async load(url, youtube_dl, msg) {
        if (this.in_loading) return
        this.in_loading = true
        this.driver.executeScript('video.innerHTML = null')

		if (youtube_dl) {
            await msg.edit("Downloading...")
                .then(async msg => {
                    console.log("Downloading...")
                    const fileName = await this.download(url, msg)
                    url = __dirname + "/client/tmp/" + fileName
                })
        }

		await this.driver.executeScript(`video.src='${url}'`)
            .then(_ => {
                console.log('Loading...')
                msg.edit("Loading...")
                    .then(_ => {
                        var int1 = setInterval(() => {
                            is_error && clearInterval(int1)

                            if (this.killed) {
                                msg.edit(":no_entry_sign: Loading stopped")
                                this.in_loading = false
                                this.killed = false
                                clearInterval(int1)
                                clearInterval(int2)
                                clearInterval(int3)
                            }

                            this.driver.getCurrentUrl()
                                .then(url => {
                                    if (!this.init && url === "file:///channels/@me") {
                                        this.init = true
                                        this.open_guild()
                                        this.join(msg)
                                        clearInterval(int1)
                                    } 
                                    else if(this.init)
                                        clearInterval(int1)
                                })
                        }, 10)
                    })
            })
		
		// Wait until video load
        let is_load
        var int2 = setInterval(() => {
            this.driver.executeScript("return video.duration")
                .then(result => {
                    if (result) {
                        is_load = true
                        this.duration = result
                        this.in_loading = false
                        msg.edit("Done, Type `*play` to start playing.")
                        clearInterval(int2)
                    }
                    else if (is_error)
                        clearInterval(int2)
                })
        }, 10)

        // Error event
        let is_error
        var int3 = setInterval(() => {
            this.driver.executeScript('return video_error')
                .then(error_msg => {
                    if (error_msg) {
                        msg.edit(":no_entry_sign: " + error_msg)
                        is_error = true
                        this.in_loading = false
                        this.driver.executeScript('video_error = ""')
                        clearInterval(int3)
                        return
                    }
                    else if (is_load)
                        clearInterval(int3)
                })
        }, 10)
    }

    download(url, msg) {
        return new Promise((resolve, reject) => {
            const fileName = Date.now()
            const path = "./client/tmp"
            exec(`rm -rf ${path}/*`, _ => {
                this.download_process = youtubeDlWrap.exec([url, "-o", `${path}/video`])
                .on("progress", progress => {
                    //console.log(progress.percent)
                })
                .on("error", err => {
                    msg.edit(":no_entry_sign: " + err.message)
                        .then(_ => {
                            this.in_loading = false
                        })
                })
                .on("close", () => {
                    if (this.killed) {
                        msg.edit(":no_entry_sign: Downloading process killed")
                        this.killed = false
                    }
                    else
                        exec(`mv ${path}/* ${path}/${fileName}`, _ => {
                            resolve(fileName)
                        })
                }).youtubeDlProcess
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
        return this.driver.executeScript(`
            return document.querySelector("[aria-label='Channel is full']")
        `)
    }

    is_locked() {
        return this.driver.executeScript(`
            return document.querySelector("[data-list-item-id='channels___${this.channel_id}']").innerHTML.includes("Voice (Locked)")
        `)
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

    join(msg) {
        var intJoin = setInterval(() => {
            this.driver.executeScript(`document.querySelector("[data-list-item-id='channels___${this.channel_id}']").click()`)
                .then(() => {
                    // this.is_locked()
                    //     .then(result => {
                    //         if (result) {
                    //             msg.channel.send(":no_entry_sign: Channel is locked")
                    //             return
                    //         }
                    //     })
   
                    // this.is_full()
                    //     .then(result => {
                    //         if (result) {
                    //             msg.channel.send(":no_entry_sign: Channel is full")
                    //             return
                    //         }
                    //     })

                    this.start()
                    clearInterval(intJoin)
                })
                .catch(() => this.scroll())
        }, 10)
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
        this.init = false
        this.driver.get(this.client_url)
    }
}

exports.Stream = Stream