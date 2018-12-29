const jsl = require("svjsl");
const settings = require("../settings.js");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Discord = require("discord.js");

const reqURL = "https://sv443.net/mphost";

const capitalizeText = txt => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();


module.exports.help = "Returns the latest versions changelog";
module.exports.run = (client, message, args) => {
    return message.reply("this feature is currently broken. I will fix it ASAP");
    try {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", reqURL, true);
        xhr.setRequestHeader("Content-type", "text/plain");
        xhr.onreadystatechange = () => {
            process.stdout.write(xhr.readyState + "-" + xhr.status + "    / ");
            if(xhr.readyState == 4 && xhr.status == 200) {
                message.reply(xhr.responseText);

                let latestCL = xhr.responseText;
                let clVersion = latestCL.split("%%SPLITTER%%")[0];
                let clContent = latestCL.split("%%SPLITTER%%")[1];

                let embed = new Discord.RichEmbed()
                    .setTitle("Changelog (v" + clVersion + "):")
                    .setDescription(clContent)
                    .setFooter(settings.embed.footer)
                    .addBlankField()
                    .setColor(settings.embed.color);

                message.channel.send(embed);
            }
            else if(xhr.readyState == 4 && xhr.status == 404) return message.reply("couldn't fetch the latest changelog. Server returned " + xhr.status + " - " + xhr.statusText);
        };
        xhr.send("CBOT_LATEST_CHANGELOG:;");
    }
    catch(err) {
        message.reply("couldn't connect to the Server.\nError: " + err);
    }
}