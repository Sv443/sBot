const settings = require("../settings.js");
const jsl = require("svjsl");

module.exports.isAdminCommand = true;
module.exports.help = "removes specified amount of messages - max is " + settings.command_settings.rm.max;
module.exports.args = ["Number"];
module.exports.run = (client, message, args) => {

    var allowToUse = false;
    for(let i = 0; i < settings.dev_ids.length; i++) if(message.author.id == settings.dev_ids[i]) allowToUse = true;

    args = parseInt(args);

    if(!message.member.hasPermission("MANAGE_MESSAGES") && !allowToUse) return message.reply("you don't have enough permissions to do that!");

    if(isNaN(args) || jsl.isEmpty(args)) return message.reply("please enter a number between " + settings.command_settings.rm.min + " and " + settings.command_settings.rm.max);

    if(args < settings.command_settings.rm.min || args > settings.command_settings.rm.max) return message.reply("please enter a number between " + settings.command_settings.rm.min + " and " + settings.command_settings.rm.max);

    message.react("✅").then(m => {
        message.channel.bulkDelete(args + 1).then(s => {
            if(message.guild.id == "430932202621108275") message.guild.channels.get("489605729624522762").send("**" + message.author.tag + "** just bulk deleted " + args + (args == 1 ? " message in " : " messages in ") + message.guild.channels.get(message.channel.id).toString() + "");
        }).catch(err => {
            message.reply("couldn't delete " + args + " messages.\nGot Error: " + err);
        });
    }).catch(err => {
        message.reply("couldn't delete " + args + " messages.\nGot Error: " + err);
    });
}