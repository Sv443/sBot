const settings = require("../settings.js");
const Discord = require("discord.js");
const fs = require("fs");
const jsl = require("svjsl");


module.exports.isDevCommand = true;
module.exports.run = (client, message, args) => {
    try {
        var allowToUse = false;
        for(let i = 0; i < settings.dev_ids.length; i++) if(message.author.id == settings.dev_ids[i]) allowToUse = true;

        if(allowToUse) {
            let bugs = fs.readFileSync("./data/bugReport.txt").toString();
            let fatal = fs.readFileSync("./data/fatalError.txt").toString();
            let feature = fs.readFileSync("./data/featureRequests.txt").toString();

            let embed = new Discord.RichEmbed()
            .setTitle("All Data:")
            .setDescription("**Bug Reports:**\n```\n"
            + (jsl.isEmpty(bugs) ? "(none)" : bugs) + "\n```\n\n"
            + "**Fatal Errors:**\n```\n"
            + (jsl.isEmpty(fatal) ? "(none)" : fatal) + "\n```\n\n"
            + "**Feature Requests:**\n```\n"
            + (jsl.isEmpty(feature) ? "(none)" : feature) + "\n```")
            .setColor(settings.embed.color)
            .setFooter(settings.embed.footer)
            .addBlankField();

            message.channel.send(embed);
        }
        else {
            message.reply("this command can only be used by the developer.");
        }
    }
    catch(err) {
        message.reply("got an error while viewing all data.\nError: " + err);
    }
}