const fs = require("fs");
const Discord = require("discord.js");

const settings = require("./settings.js");


module.exports = (client, guild) => {
    return;
    var invites;
    try {
        guild.fetchInvites().then(ivts => {
            invites = ivts.array().join(", ");

            let oMb = guild.members.size;
            let membersNoBots = guild.members.filter(member => !member.user.bot).size;
            let botMembers = oMb - membersNoBots;
            let allMembers = guild.members.filter(m => (m.presence.status == "online" || m.presence.status == "idle" || m.presence.status == "dnd" || m.presence.status == "offline")).size - botMembers;


            var embed = new Discord.MessageEmbed()
                .setTitle("I just joined `" + guild.name + "` and it might be a bot farm!")
                .addField("Ratio Humans / Bots:", allMembers + " Humans  **/**  " + botMembers + " Bots")
                .addField("Invites:", invites)
                .setFooter("Timestamp (UTC): " + new Date().toUTCString())
                .setColor(settings.embed.color);

            client.guilds.get("524655091538460672").channels.get("524657306487619604").send(embed);
        });
    }
    catch(err) {
        guild.leave().then(m => client.guilds.get("524655091538460672").channels.get("524657306487619604").send("I just left a bot farm: `" + guild.name + "`.\nI had no permissions to view invites or there were none."));
    }
}