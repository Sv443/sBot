const jsl = require("svjsl");
const settings = require("../settings.js");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Discord = require("discord.js");
require('dotenv').config();


const reqURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/%ROVER%/photos?sol=1000&api_key=${process.env.NASA_KEY}&page=%PAGE%`;
const availableRovers = ["Curiosity"];


module.exports.help = "Sends a random picture the NASA rover Curiosity took on Mars";
module.exports.category = "Knowledge";
module.exports.run = (client, message, args) => {
    var loadingembed = new Discord.MessageEmbed()
        .setFooter("Fetching random space image...", settings.loadingURL)
        .setColor(settings.embed.color);
    var delsm;
    message.channel.send(loadingembed).then(smsg => {
        delsm = smsg;
        var rover = availableRovers[jsl.randRange(0, availableRovers.length - 1)];
        var randPage = jsl.randRange(0, 32);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", reqURL.replace("%ROVER%", rover.toLowerCase()).replace("%PAGE%", randPage), true);
        xhr.setRequestHeader("Content-type", "application/json; utf-8");
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4 && xhr.status == 200) {
                var resp = JSON.parse(xhr.responseText).photos;
                var rnd = jsl.randRange(0, resp.length);
                var nembed = new Discord.MessageEmbed()
                    .setTitle(`Image #${(rnd + 1) + randPage * 25}:`)
                    .setImage(resp[rnd].img_src)
                    .setFooter(`Planet: Mars - Rover: ${rover} - Camera: ${resp[rnd].camera.full_name} - Images by NASA (www.nasa.gov)`)
                    .setColor(settings.embed.color);

                if(new Date().getDate() == 5 && new Date().getMonth() == 7)
                    nembed.setDescription("[Happy Birthday, Curiosity!](https://youtu.be/sh2f0COM6-w)"); // happy birthday :)

                smsg.edit(nembed);
            }
            else if(xhr.readyState == 4 && xhr.status >= 400) {
                let nembed = new Discord.MessageEmbed()
                    .setFooter(`📡 Couldn't connect to the NASA API.
                        Status: ${xhr.status} - Error: ${xhr.responseText}`)
                    .setColor(settings.embed.color);
                smsg.edit(nembed);
            }
        }
        xhr.send();
    }).catch(err => {
        loadingembed.delete().catch(err=>delsm.delete().catch(err=>{}));
        let nembed = new Discord.MessageEmbed()
        .setFooter(`📡 Couldn't connect to the NASA API.
            Error: ${err}`)
        .setColor(settings.embed.color);
        message.channel.send(nembed);
    });
}