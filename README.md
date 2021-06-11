# sBot by [Sv443](https://sv443.net/)<br>[![](https://img.shields.io/github/license/Sv443/sBot.svg?style=flat-square)](https://github.com/Sv443/sBot/blob/master/LICENSE) [![](https://img.shields.io/github/issues/Sv443/sBot.svg?style=flat-square)](https://github.com/Sv443/sBot/issues) [![](https://img.shields.io/github/stars/Sv443/sBot.svg?style=flat-square)](https://github.com/Sv443/sBot/)
### A fun and useful Discord Bot that was designed as a bot that has many different features from as many categories as possible to give every user something they can enjoy.

<br><br>

## This project is abandoned and the bot is offline for good
I don't have the fucking nerve to coninue working with the Discord API having to rewrite everything twice a year.  
Maybe I'll continue some day but probably not, we'll see.

<br><br><br>

---
[Invitation](#invitation) - [Usage](#usage) - [User Commands](#commands-every-user) - [Admin Commands](#commands-admins)

---

<br><br><br><br><br><br><br><br>

## Invitation:
Please visit [this page](https://sv443.net/r/sBot) to either add the bot to your server or to join the support server.

<br><br><br><br><br><br>

## Usage:
To view all available commands, type `^help` into any channel<br>
If you wanna see the admin commands, use `^adminhelp` instead.<br><br><br>

If you cloned the repo and want to start the bot you need NodeJS installed and you have to create a file called `.env` that contains two lines: `BOT_TOKEN=your_bot_token` and `STEAM_KEY=your_steam_api_key`. Afterwards you need to open CMD and `cd` to the project folder. Then, type `npm i --save` to install all dependencies and then `node .` to start the bot.

<br><br><br><br><br><br>

## Commands (Every User):

Note: every argument that's prefixed with a `?` is optional

- `^bug [Bug(s)]`: Sends a bug report to the dev
- `^feature [Your Feature(s)]`: Sends a feature request to the dev
- `^coinflip [?Number of Flips]`: Flips one (if the arguments are left empty) or multiple coins
- `^dice [Number of Eyes]`: Rolls a dice with the specified number of eyes (also has a cool little animation, yay)
- `^joke`: Tells a random joke
- `^ping [?URL]`: Responds with pong if the arguments are left empty or pings the specified website
- `^pokemon [Name]`: Gets some info about the specified Pokémon
- `^server`: Responds with some info about the server
- `^steam [User]`: Returns some info about the specified Steam user
- `^mock [?Username], [Message]`: sENdS a MessAGe lIKe tHIs
- `^define [?wiki], [Search String]`: Search DuckDuckGo/Wikipedia for a word's definition
- `^fact`: Tells you a random / useless fact
- `^changelog`: Returns the latest versions changelog
- `^uptime`: Responds with the Bot's uptime

<br><br><br><br>

## Commands (Admins):

Note: every argument that's prefixed with a `?` is optional

- `^rm [Number]`: Removes the last n messages of the channel
- `^say [?Channel, Message]`: Sends a message as sBot either in the same channel if none is provided or found or in the specified channel if the first argument is in the normal tag (#channelname) format
- `^configure`: (Coming Soon) Starts a chain of prompts to change the bot preferences for your specific server
- `^mute [User]`: (Work in Progress) Mutes the specified user (Deletes every new message of them instantly)


<br><br><br><br>
© Sv443 2018 - MIT License
