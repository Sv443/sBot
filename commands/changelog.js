const jsl = require("svjsl");
const settings = require("../settings.js");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Discord = require("discord.js");
const fs = require("fs");



module.exports.help = "Returns the latest versions changelog";
module.exports.category = "Bot Specific";
module.exports.run = (client, message, args) => {
    try {
        let latestCL = fs.readFileSync("./data/latestChange.log").toString();
        var title = latestCL.split("%%SPLITTER%%")[0];
        var desc = latestCL.split("%%SPLITTER%%")[1];

        let embed = new Discord.MessageEmbed()
            .setTitle(`Version ${title}:`)
            .setDescription(desc)
            .setFooter(settings.embed.footer)
            .setColor(settings.embed.color);
        message.channel.send(embed);
    }
    catch(err) {
        message.reply("couldn't access changelog.\nError: " + err);
    }
}