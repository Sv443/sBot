
module.exports.category = "Bot Specific";
module.exports.help = "Responds with the Bot's uptime";
module.exports.run = (client, message, args) => {
    let totalSeconds = (client.uptime / 1000);
    let u = {
        seconds: Math.floor(totalSeconds % 60),
        minutes: Math.floor((totalSeconds / 60) / 60),
        hours: Math.floor(totalSeconds / 3600),
        days: Math.floor(totalSeconds / 86400)
    }

    message.reply("I have been running for " + u.days + (u.days == 1 ? " day, " : " days, ") + u.hours + (u.hours == 1 ? " hour, " : " hours, ") + u.minutes + (u.minutes == 1 ? " minute and " : " minutes and ") + u.seconds + (u.seconds == 1 ? " second." : " seconds."));
}