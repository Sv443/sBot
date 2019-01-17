const Discord = require("discord.js");
const settings = require("../settings.js");


module.exports.isDevCommand = true;
module.exports.run = (client, message, args) => {
    try {
        var allowToUse = false;
        for(let i = 0; i < settings.dev_ids.length; i++) if(message.author.id == settings.dev_ids[i]) allowToUse = true;

        if(allowToUse) {
            var invites = ["succ"], ct = 0;
            client.guilds.forEach(g => {
                g.fetchInvites().then(guildInvites => {
                    invites[invites.length + 1] = (g + ": `Invites: " + guildInvites.array().join(", ") + "`");
                    ct++;

                    if(ct >= client.guilds.size) {
                        for(let i = 0; i < invites.length; i++) {
                            if(invites[i] == undefined) invites.splice(i, 1);
                        }

                        invites.shift();

                        for(let i = 0; i < invites.length; i++) invites[i] = "- " + invites[i];
                        invites = invites.join("\n\n");

                        let embed = new Discord.RichEmbed()
                        .setTitle("All Invites:")
                        .setDescription(invites)
                        .setColor(settings.embed.color);

                        message.channel.send(embed);
                    }
                }).catch(err => {
                    ct++;
                });
            });
        }
        else {
            message.reply("this command can only be used by the developer.");
        }
    }
    catch(err) {
        message.reply("got an error while viewing all data.\nError: " + err);
    }
}