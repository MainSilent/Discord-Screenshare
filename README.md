🔴 Due to time issues and left discord a while ago, I am not interested in continuing this project.

## Discord ScreenShare Bot

It's headless and there is no need for GUI.

### [Video Sample](https://www.youtube.com/watch?v=HA18QDE5GhQ)
![ScreenShot](https://raw.githubusercontent.com/MainSilent/Discord-Screenshare/master/demo.png)

### Setup
Create a discord user, find the token and set it in .env `token`

If you don't set `owner_id` anyone can use the bot or else only you and the people you add can control it

Join the selfbot user to your guild and type `*help`, If it respond your bot is working.

### Run

It is recommended to use the `Dockerfile`

```
sudo docker build .
```

### Note (`owner_id`)
Use the following commands to add or remove other users
```
*add `user_id`
*remove `user_id`
```

You can also use `*list` to see added users.

### Contributing
Pull requests are welcome
