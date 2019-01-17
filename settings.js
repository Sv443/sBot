
module.exports = {
    bot_name: "sBot",
    version: "0.3.0",
    command_prefix: "^",
    client_id: "524324404583464960",
    dev_ids: ["415597358752071693"],
    avatar_url: "http://sv443.ddns.net/cdn/sBot/dev_pfp2.png",
    website_url: "http://sv443.ddns.net/r/sBot",
    embed: {
        footer: "Homepage: sv443.ddns.net/r/sBot",
        color: "#f99f3e"
    },
    redeployed_status_timeout: 10000,
    joke_punchline_timeout: 4000,
    default_activity: {
        "message": "use %COMMAND_PREFIX%help | %GUILDS_SIZE% servers",
        "type": "PLAYING"
    },
    command_settings: {
        rm: {
            min: 1,
            max: 50
        },
        dice: {
            max: 1000
        },
        coinflip: {
            max: 20
        },
        joke: {
            icon: "http://sv443.ddns.net/cdn/jokeapi/icon_small.png",
            category: "Miscellaneous"
        },
        ping: {
            timeout: 6000
        },
        games: {
            dir: "./games",
            confirmationTimeout: 30000
        },
        mute: {
            file: "./data/mutedUsers.txtdb",
            min: 1,
            max: 1440,
            default: 5
        }
    },
    loadingURL: "https://sv443.net/cdn/sBot/loading2.gif",
    serverSpecifics: {
        supportServer: {
            httpPort: 8077,
            logFile: "./data/latestGithubRequest.log",
            githubIcon: "http://sv443.ddns.net/resources/images/github.png",
            id: "524655091538460672",
            logChannel: "534277477753815045"
        }
    }
};