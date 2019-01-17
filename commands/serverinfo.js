const Discord = require("discord.js");
const settings = require("../settings.js");

module.exports.help = "Gives some info about the server";
module.exports.category = "Discord";
module.exports.run = (client, message, args) => {
    var g = message.guild;
    /*message.reply("Created at: " + g.createdAt);
    message.reply("Region: " + g.region);
    message.reply("Icon: " + g.iconURL);
    message.reply("Member count: " + g.memberCount);
    message.reply("Owner: " + g.owner.displayName);*/

    let allMembers = g.memberCount;
    let oMb = g.members.size;
    let membersNoBots = g.members.filter(member => !member.user.bot).size;
    let botMembers = oMb - membersNoBots;
    let onlineMembers = g.members.filter(m => (m.presence.status == "online" || m.presence.status == "idle" || m.presence.status == "dnd")).size - botMembers;

    var vL = parseInt(message.guild.verificationLevel);
    var allLevels = ["None", "Low", "Medium", "(╯°□°）╯︵ ┻━┻", "┻━┻︵\\(ಠ益ಠ)/︵┻━┻"]
    try {
        var verificationLevel = allLevels[vL];
    }
    catch(err) {
        var verificationLevel = "(not available)";
    }

    let embed = new Discord.RichEmbed()
    .setTitle(g.name + ":")
    .addField("Owner:", g.owner.user.tag, true)
    .addField("Region:", g.region, true)
    .addField("Roles:", g.roles.array().length, true)
    .addField("Verification Level:", verificationLevel, true)
    .addBlankField()
    .addField("Online Members / Total Members / Bots:", "**" + onlineMembers + "** / **" + allMembers + "** / **" + botMembers + "**", false)
    .addBlankField()
    .addField("Created:", g.createdAt.toUTCString(), false)
    .setThumbnail(g.iconURL)
    .setColor(settings.embed.color)
    .addBlankField()
    .setFooter(settings.embed.footer)

    message.channel.send(embed);
}