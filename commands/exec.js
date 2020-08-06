const settings = require("../settings.js");
const Discord = require("discord.js");


module.exports.isDevCommand = true;
module.exports.run = (client, message, args) => {
    try {
        var allowToUse = false;
        for(let i = 0; i < settings.dev_ids.length; i++)
	{
		if(message.author.id == settings.dev_ids[i])
			allowToUse = true;
	}

        if(allowToUse && !args.includes(".env")) {
            var result;
            try {
                message.delete();
                result = eval(args);
                if(typeof result == "object") {
                    if(result.toString() == "[object Object]") result = JSON.stringify(result);
                    else {
                        if(result.then != null) {
                            result = "[Promise]";
                            return result.then(res => {
                                var embed = new Discord.MessageEmbed()
                                    .setTitle(message.author.tag + " just forced me to execute code in `" + message.guild.name + "`:")
                                    .addField("Code:", "```js\n" + args + "\n```")
                                    .addField("Result:", "```Promise: \n" + res + "\n```")
                                    .setFooter("Timestamp (UTC): " + new Date().toUTCString())
                                    .setColor(settings.embed.color);

                                client.guilds.cache.get(settings.serverSpecifics.supportServer.id).channels.cache.get(settings.serverSpecifics.supportServer.logChannel).send(embed);
                                message.author.send("**Promise Result:**\n" + res);
                            });
                        }
                    }
                }
            }
            catch(err) {
                result = "Error: " + err;
            }

            message.author.send("**Result:**\n" + result);

            var embed = new Discord.MessageEmbed()
                .setTitle(message.author.tag + " just forced me to execute code in `" + message.guild.name + "`:")
                .addField("Code:", "```js\n" + args + "\n```")
                .addField("Result:", "```\n" + result + "\n```")
                .setFooter("Timestamp (UTC): " + new Date().toUTCString())
                .setColor(settings.embed.color);

            client.guilds.cache.get(settings.serverSpecifics.supportServer.id).channels.cache.get(settings.serverSpecifics.supportServer.logChannel).send(embed);
        }
        else return message.reply("this command can only be used by the developer.");
    }
    catch(err) {
        console.log("\n\n\x1b[31m\x1b[1mError while executing: " + err);
    }
}
