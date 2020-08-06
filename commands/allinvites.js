const Discord = require("discord.js");
const settings = require("../settings.js");


module.exports.isDevCommand = true;
/**
 * 
 * @param {Discord.Client} client 
 * @param {*} message 
 * @param {*} args 
 */
module.exports.run = (client, message, args) => {
    try {
        var allowToUse = false;
        for(let i = 0; i < settings.dev_ids.length; i++) if(message.author.id == settings.dev_ids[i]) allowToUse = true;

        if(allowToUse) {
            let invites = ["succ"], ct = 1;
            client.guilds.cache.array().forEach(g => {
                g.fetchInvites().then(guildInvites => {
                    ct++;

                    if(guildInvites.array().length < 1)
                        return;

                    invites[invites.length + 1] = ("**" + g.name + "**: " + guildInvites.array().join(", "));

                    if(ct >= client.guilds.cache.size) {
                        for(let i = 0; i < invites.length; i++) {
                            if(invites[i] == undefined) invites.splice(i, 1);
                        }

                        invites.shift();

                        for(let i = 0; i < invites.length; i++) invites[i] = "- " + invites[i];
                        invites = invites.join("\n");

                        if(invites.length > 2048)
                            invites = invites.substr(0, 2023) + "...\n\n(too many to show)";

                        let embed = new Discord.MessageEmbed()
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
    }
    catch(err) {
        message.reply("got an error while viewing all data.\nError: " + err);
    }
}