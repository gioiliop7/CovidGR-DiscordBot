
# CovidGR-DiscordBot

Covid-GR Discord bot is a bot built in Node.js and gives stastistics and information about Covid-19 in Greece.
The language of the bot answers is in Greek.

## Add to your Discord server.
https://bit.ly/2YexHWX

## Clone the project

```
git clone https://github.com/gioiliop7/CovidGR-DiscordBot.git
```

## Installation

### Packages
Install the required modules with npm
```
npm install discord.js axios dotenv
```

The packages we have installed are:

-   `discord.js`: a Node.js module to allow easy interactions with the Discord API.
-   `axios`: allows making HTTP Promises easily with Node.js.
-   `dotenv`: allows loading variables from process.env in Node apps.


### Create an App in Discord
Then you need to create an app in Discord. Go to [Discord developers portal](https://discord.com/developers) and sign in or create a developer account.

Once you're logged in, click on 'New Application' at the top right of the window.

![alt text](https://buddy.works/tutorials/assets/posts/how-to-build-a-discord-bot-in-node-js-for-beginners/discord-bot-1.png)

Then fill in the details of your app (i.e. name) and you will be taken to your app's dashboard. Navigate to 'Bot' and click 'Add Bot' to enable your app as a bot.

![alt text](https://buddy.works/tutorials/assets/posts/how-to-build-a-discord-bot-in-node-js-for-beginners/discord-bot-2.png)

In the section appear, click copy to token. Create a .env file and store the token there or copy to your code (index.js)

### Install bot to server

Create a new Discord server with your Discord account to install the bot at.

Back at the App dashboard, navigate to 'OAuth2' and select  **'bot'**  under the Scopes section.![enter image description here](https://buddy.works/tutorials/assets/posts/how-to-build-a-discord-bot-in-node-js-for-beginners/discord-bot-4.png)

You will see an URL being generated at the bottom. Copy this URL and paste it on a new tab. You will be redirected to the page that connects the bot on a server.

Install this bot to your preferred Discord server.
If everything works correctly, your bot should now appear in your Discord server.

After you paste the token in your code or stored it in an .env file, run the code.

```default
node index.js
```
The bot status has changed to online and its ready to answer your commands.

## Commands

###  List of bot commands
```
!covidhelp
```

###  Latest news of covid-19 in Greece
```
!news
```

### Check covid certificate validation.
```
!validate
```

### About vaccination.
```
!emvolio
```

### About bot.
```
!about
```
### Check covid cases.
```
!cases
```
### Check covid deaths.
```
!deaths
```
### Check covid critical cases.
```
!ic
```
### Check covid vaccinations.
```
!vaccs
```
### Check covid tests taken number.
```
!tests
```
### Check covid age distribution.
```
!age
```
### Check covid risk levels by region.
```
!risklevels
```
## Api used for stats
[ Coronavirus Greece API](https://covid-19-greece.herokuapp.com/)

## Resources
-   [https://discord.com/developers/docs/intro](https://discord.com/developers/docs/intro)
-   [https://discord.js.org/](https://discord.js.org/)
-   [https://www.npmjs.com/package/axios](https://www.npmjs.com/package/axios)
-   [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)
-   [https://discordjs.guide/](https://discordjs.guide/)
