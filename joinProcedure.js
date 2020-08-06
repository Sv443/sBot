const Discord = require("discord.js");
const jsl = require("svjsl");
const settings = require("./settings");

/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Guild} guild 
 */
module.exports = (client, guild) => {
    console.log(`JOINED ${guild.name}`);
    var invites;
    try {
        guild.fetchInvites().then(ivts => {
            invites = ivts.array().join(", ");

            let oMb = guild.members.cache.size;
            let membersNoBots = guild.members.cache.filter(member => !member.user.bot).size;
            let botMembers = oMb - membersNoBots;
            let allMembers = guild.members.cache.filter(m => (m.presence.status == "online" || m.presence.status == "idle" || m.presence.status == "dnd" || m.presence.status == "offline")).size - botMembers;


            var embed = new Discord.MessageEmbed()
                .setTitle("I just joined `" + guild.name + "`.")
                .addField(`Invite${invites.length != 1 ? "s" : ""}:`, invites)
                .setFooter("Timestamp (UTC): " + new Date().toUTCString())
                .setColor(settings.embed.color);

            client.guilds.cache.get("524655091538460672").channels.cache.get("524657306487619604").send(embed);
        });
    }
    catch(err) {
        console.log(`JoinProcedure-ERROR: ${err}`);
    }
}