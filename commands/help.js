const fs = require("fs");
const settings = require("../settings.js");
const Discord = require("discord.js");
const jsl = require("svjsl");

const categories = [
    {
        name: "Bot Specific",
        displayName: "🤖 Bot Specific"
    },
    {
        name: "Fun",
        displayName: "🎮 Fun / Games"
    },
    {
        name: "Knowledge",
        displayName: "📖 Learning"
    }
];


module.exports.help = "Sends this help message";
module.exports.run = (client, message, args) => {
    var availableHelp = [], botsp = [], fun = [], knowldg = [];
    fs.readdirSync("./commands/").forEach(file => { // get all available commands
        if(require("../commands/" + file).isAdminCommand == (null || undefined) && require("../commands/" + file).isDevCommand == (null || undefined)) {
            let cargs = "";
            let fArgs = require("../commands/" + file).args;
            if(fArgs && !jsl.isArrayEmpty(fArgs)) cargs = " [" + require("../commands/" + file).args.join("], [") + "]";
            if(require("../commands/" + file).category == "Bot Specific") botsp.push("`" + settings.command_prefix + file.replace(".js", cargs + "` - ") + require("../commands/" + file).help + "\n");
            else if(require("../commands/" + file).category == "Fun") fun.push("`" + settings.command_prefix + file.replace(".js", cargs + "` - ") + require("../commands/" + file).help + "\n");
            else if(require("../commands/" + file).category == "Knowledge") knowldg.push("`" + settings.command_prefix + file.replace(".js", cargs + "` - ") + require("../commands/" + file).help + "\n");
        }
    });
    let embed = new Discord.RichEmbed()
        .setAuthor(settings.bot_name + " v(" + settings.version + ") - All Commands (" + (botsp.length + fun.length + knowldg.length) + "):", settings.avatar_url)
        // .setDescription(availableHelp.join("") + "\n\nInvite " + settings.bot_name + " to your server or join the Support Server to get some help using this URL: " + settings.website_url + "\n\nTo view admin commands, use `" + settings.command_prefix + "adminhelp`")
        .setDescription("Arguments prefixed with `?` are optional.\n\n")
        .addBlankField()
        .addField(categories[1].displayName, fun.join(""), false)
        .addBlankField()
        .addField(categories[2].displayName, knowldg.join(""), false)
        .addBlankField()
        .addField(categories[0].displayName, botsp.join(""), false)
        .addBlankField()
        .addField(client.guilds.get(settings.serverSpecifics.supportServer.id).emojis.find(em => em.name == "sBot") + " Other:", "Invite " + settings.bot_name + " to your server, join the Support Server to get some help or test out experimental features [here.](" + settings.website_url + ")\n\nTo view admin commands, use `" + settings.command_prefix + "adminhelp`\n\nIf you like this bot, you can do me a huge favor by voting for the bot [here.](https://discordbots.org/bot/524324404583464960/vote) Thanks :smiley:")
        .setFooter(settings.embed.footer)
        .setColor(settings.embed.color)
        .addBlankField();

    message.channel.send(embed);
}