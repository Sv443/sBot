
module.exports.help = "Responds with the Bot's uptime";
module.exports.run = (client, message, args) => {
    let u = {
        seconds: Math.floor(client.uptime / 1000) //% 60,
    }

    message.reply("(WIP) I have been running for " + u.seconds + " seconds");
}