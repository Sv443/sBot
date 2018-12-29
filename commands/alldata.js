const settings = require("../settings.js");
const Discord = require("discord.js");
const fs = require("fs");


module.exports.isDevCommand = true;
module.exports.run = (client, message, args) => {
    try {
        var allowToUse = false;
        for(let i = 0; i < settings.dev_ids.length; i++) if(message.author.id == settings.dev_ids[i]) allowToUse = true;

        if(allowToUse) {
            let embed = new Discord.RichEmbed()
            .setTitle("All Data:")
            .setDescription("**Bug Reports:**\n```\n"
            + fs.readFileSync("./data/bugReport.txt") + "\n```\n\n"
            + "**Fatal Errors:**\n```\n"
            + fs.readFileSync("./data/fatalError.txt") + "\n```\n\n"
            + "**Feature Requests:**\n```\n"
            + fs.readFileSync("./data/featureRequests.txt") + "\n```")
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