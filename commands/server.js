const Discord = require("discord.js");
const settings = require("../settings.js");

module.exports.help = "Gives some info about the server";
module.exports.run = (client, message, args) => {
    var g = message.guild;
    /*message.reply("Created at: " + g.createdAt);
    message.reply("Region: " + g.region);
    message.reply("Icon: " + g.iconURL);
    message.reply("Member count: " + g.memberCount);
    message.reply("Owner: " + g.owner.displayName);*/
    
    let embed = new Discord.RichEmbed()
    .setTitle(g.name + ":")
    .setDescription("**Owner:** " + g.owner.displayName
    + "\n**Created:** " + g.createdAt.toString().replace(/(\(GMT\+\d*\:\d*\))/gm, "")
    + "\n**Region:** " + g.region
    + "\n**Members:** " + g.memberCount)
    .setThumbnail(g.iconURL)
    .setColor(settings.embed.color)
    .addBlankField()
    .setFooter(settings.embed.footer)

    message.channel.send(embed);
}