module.exports.help = "Bans the specified user";
module.exports.args = ["user"];
module.exports.run = (client, message, args) => {
    message.react("🖕");
    return message.reply("http://lmgtfy.com/?q=how+to+ban+someone+in+discord");
}