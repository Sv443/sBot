const Discord = require("discord.js");
const jsl = require("svjsl");
const settings = require("./settings");

module.exports = (client, guild) => {
    console.log(`JOINED ${guild.name}`);
    var invites;
    try {
        guild.fetchInvites().then(ivts => {
            invites = ivts.array().join(", ");

            let oMb = guild.members.size;
            let membersNoBots = guild.members.filter(member => !member.user.bot).size;
            let botMembers = oMb - membersNoBots;
            let allMembers = guild.members.filter(m => (m.presence.status == "online" || m.presence.status == "idle" || m.presence.status == "dnd" || m.presence.status == "offline")).size - botMembers;


            var embed = new Discord.RichEmbed()
                .setTitle("I just joined `" + guild.name + "`.")
                .addField(`Invite${invites.length != 1 ? "s" : ""}:`, invites)
                .setFooter("Timestamp (UTC): " + new Date().toUTCString())
                .setColor(settings.embed.color);

            client.guilds.get("524655091538460672").channels.get("524657306487619604").send(embed);
        });
    }
    catch(err) {
        console.log(`JoinProcedure-ERROR: ${err}`);
    }
}