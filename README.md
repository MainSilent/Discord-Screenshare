## Discord Stream Bot

It's headless and there is no need for GUI.

I rewrote it in JavaScript for self bot, But still I kept the python code..., Please make sure you have the latest version of `youtube_dl` installed.

### [Video Sample](https://www.youtube.com/watch?v=HA18QDE5GhQ)
![ScreenShot](https://raw.githubusercontent.com/MainSilent/DiscordStream/master/demo.png)

### Setup
Create a discord user find the token and put it in .env `token`

Get your user id and put it in .env `owner_id` (Only the `owner_id` can use the bot)

Join the selfbot user to your guild and type `*help`, If it respond your bot is working.

### Run
```
npm i

npm start
```

### Note
type `*play` when selfbot has joined the voice channel

if you want other users user the bot, use `*add 'User_ID'`, `*remove 'User_ID'`

you can also use `*list` to see added users
