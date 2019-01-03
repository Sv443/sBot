const jsl = require("svjsl");
const Discord = require("discord.js");

const settings = require("../settings.js");

module.exports.help = "Responds with \"pong\", if no URL is provided or else pings the specified URL";
module.exports.args = ["URL"];
module.exports.run = (client, message, args) => {
    args = args.toLowerCase();
    try {
        if(jsl.isEmpty(args)) {
            let embed = new Discord.RichEmbed()
                .setTitle("Pong!")
                .setDescription("I got your request within **" + ((new Date()).getTime() - message.createdTimestamp) + "ms**\nThe Discord API responded within **" + Math.floor(client.ping) + "ms**")
                .setColor(settings.embed.color);
            return message.channel.send(embed);
        }
        else if(args.includes("://") && args.includes("http") && args.includes(".") && args.includes("/")) {
            args = args.toString();
            jsl.ping(args, settings.command_settings.ping.timeout).then(res=>{
                return message.reply("pinged `" + args + "` and got status **" + res.statusCode + " - " + res.statusMessage + "** within **" + res.responseTime + "ms**");
            }).catch(err=>{
                return message.reply(args + " couldn't be pinged!\nError: " + err);
            });
        }
        else return message.reply("invalid URL, please enter it in this format: `http(s)://www.example.org/` and avoid pathnames (eg. `/search` in `https://www.google.com/search`)");
    }
    catch(err) {
        return message.reply("invalid URL, please enter it in this format: `http(s)://www.example.org/` and avoid pathnames (eg. `/search` in `https://www.google.com/search`)");
    }
}