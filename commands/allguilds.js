const Discord = require("discord.js");
const settings = require("../settings.js");


module.exports.isDevCommand = true;
module.exports.run = (client, message, args) => {
    try {
        var allowToUse = false;
        for(let i = 0; i < settings.dev_ids.length; i++) if(message.author.id == settings.dev_ids[i]) allowToUse = true;

        if(allowToUse) {
            var g = client.guilds.array(), invite = [];
            //g.forEach(g => g.fetchInvites().then(i => i.array().forEach(ivt => invite.append(!jsl.isEmpty(ivt.url)?"- " + g.name + ": " + ivt.url:"no permission"))));
            for(let i = 0; i < g.length; i++) g[i] = "- " + g[i];
            let allGuilds = g.join("\n");

            let embed = new Discord.RichEmbed()
            .setTitle("All Guilds:")
            .setDescription(allGuilds)
            //.addField("All Invites:", invite.join("\n"), false)
            .setColor(settings.embed.color);

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