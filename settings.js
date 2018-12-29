
module.exports = {
    bot_name: "sBot",
    version: "0.1.0",
    command_prefix: "^",
    client_id: "524324404583464960",
    dev_ids: ["415597358752071693"],
    avatar_url: "https://sv443.net/cdn/sBot/pfp2.png",
	//avatar_url: "https://cdn.discordapp.com/attachments/446371455270387732/528350168408391699/unknown.png", //ninja
    website_url: "https://sv443.net/r/sBot",
    embed: {
        footer: "sBot by Sv443 (www.Sv443.net)",
        color: "#f99f3e"
    },
    redeployed_status_timeout: 5000,
    joke_punchline_timeout: 4000,
    default_activity: {
        "message": "%COMMAND_PREFIX%help | on %GUILDS_SIZE% servers",
        "type": "PLAYING"
    },
    command_settings: {
        rm: {
            min: 1,
            max: 50
        },
        dice: {
            max: 10000
        },
        coinflip: {
            max: 25
        }
    },
    loadingURL: "https://sv443.net/cdn/sBot/loading2.gif"
};