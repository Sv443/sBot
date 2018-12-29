const fs = require("fs");
const settings = require("../settings.js");
const Discord = require("discord.js");
const jsl = require("svjsl");

module.exports.help = "Sends this help message";
module.exports.run = (client, message, args) => {
    var availableHelp = [];
    fs.readdirSync("./commands/").forEach(file => { // get all available commands
        if(require("../commands/" + file).isAdminCommand == (null || undefined) && require("../commands/" + file).isDevCommand == (null || undefined)) {
            let cargs = "";
            if(!jsl.isArrayEmpty(require("../commands/" + file).args)) cargs = " [" + require("../commands/" + file).args.join(", ") + "]";
            availableHelp.push("`" + settings.command_prefix + file.replace(".js", cargs + "` - ") + require("../commands/" + file).help + "\n");
        }
    });
    let embed = new Discord.RichEmbed()
    .setAuthor(settings.bot_name + " v(" + settings.version + ") - All Commands (" + availableHelp.length + "):", settings.avatar_url)
    .setDescription(availableHelp.join("") + "\n\nInvite " + settings.bot_name + " to your server or join the Support Server to get some help using this URL: " + settings.website_url + "\n\nTo view admin commands, use `" + settings.command_prefix + "adminhelp`")
    .setFooter(settings.embed.footer)
    .setColor(settings.embed.color)
    .addBlankField();

    message.channel.send(embed);
}