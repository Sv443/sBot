const jsl = require("svjsl");
const Discord = require("discord.js");
const performance = require("perf_hooks");

const settings = require("../settings.js");

module.exports.help = "Responds with \"pong\" and the API latency if no URL is provided or else pings the specified URL";
module.exports.category = "Miscellaneous";
module.exports.args = ["?URL"];
module.exports.run = (client, message, args) => {
    args = args.toLowerCase();
    try {
        if(jsl.isEmpty(args)) {
            let embed = new Discord.MessageEmbed()
                .setTitle("Pong!")
                .setDescription("Discord responded within **" + Math.floor(client.ping) + "ms**")
                .setColor(settings.embed.color);
            return message.channel.send(embed);
        }
        else if(args.includes("://") && args.includes("http") && args.includes(".") && args.includes("/")) {
            args = new URL(args.toString());
            jsl.ping(args, settings.command_settings.ping.timeout).then(res=>{
                return message.reply("pinged `" + args + "` and got status **" + res.statusCode + " - " + res.statusMessage + "** within **" + res.responseTime + "ms**");
            }, rej => {
                return message.reply("couldn't ping `" + args + "`, got error: " + rej);
            }).catch(err=>{
                return message.reply("`" + args + "` couldn't be pinged!\nError: " + err);
            });
        }
        else return message.reply("invalid URL, please enter it in this format: `http(s)://www.example.org/` and avoid pathnames (eg. `/search` in `https://www.google.com/search`)");
    }
    catch(err) {
        return message.reply("invalid URL, please enter it in this format: `http(s)://www.example.org/` and avoid pathnames (eg. `/search` in `https://www.google.com/search`)\n");
    }
}