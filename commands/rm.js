const settings = require("../settings.js");
const jsl = require("svjsl");

module.exports.isAdminCommand = true;
module.exports.help = "removes specified amount of messages - max is " + settings.command_settings.rm.max;
module.exports.args = ["Number"];
module.exports.run = (client, message, args) => {

    args = parseInt(args);

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have enough permissions to do that!");

    if(isNaN(args) || jsl.isEmpty(args)) return message.reply("please enter a number between " + settings.command_settings.rm.min + " and " + settings.command_settings.rm.max);

    if(args < settings.command_settings.rm.min || args > settings.command_settings.rm.max) return message.reply("please enter a number between " + settings.command_settings.rm.min + " and " + settings.command_settings.rm.max);

    message.channel.bulkDelete(args + 1).catch(err => {
        message.reply("couldn't delete " + args + " messages.\nGot Error: " + err);
    });
}