const jsl = require("svjsl");
const settings = require("../settings.js");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Discord = require("discord.js");

//const reqURL = "https://official-joke-api.herokuapp.com/random_joke";
const reqURL = "https://crackmeup-api.herokuapp.com/random";

module.exports.help = "Tells you a random joke";
module.exports.run = (client, message, args) => {
    try {
		let loadingembed = new Discord.RichEmbed()
			.setFooter("Fetching random joke...", settings.loadingURL)
			.setColor(settings.embed.color);
		var jmsg = message.channel.send(loadingembed).then(smsg => {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", reqURL, true);
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.onreadystatechange = () => {
				if(xhr.readyState == 4 && xhr.status == 200) {
					/*let setup = JSON.parse(xhr.responseText).setup;
					let punchline = JSON.parse(xhr.responseText).punchline;

					message.channel.send(setup);
					setTimeout(()=>{
						message.channel.send(punchline);
					}, settings.joke_punchline_timeout);*/
					let jokedesc = JSON.parse(xhr.responseText).joke.replace(/(\*)/gm, "\\*").replace(/(\`)/gm, "\\`").replace(/(\~)/gm, "\\~").replace(/(A:)/gm, "\n").replace(/(Q:)/gm, "");
					let embed = new Discord.RichEmbed()
						.setDescription(jokedesc)
						.setFooter("Powered by Crackmeup-API (jokes can be malformatted, I can't do anything about that) - " + settings.embed.footer)
						.addBlankField()
						.setColor(settings.embed.color);
					return smsg.edit(embed);
				}
				else if(xhr.readyState == 4 && xhr.status >= 400) {
					let nrembed = new Discord.RichEmbed()
						.setColor(settings.embed.color)
						.setFooter("The Joke API couldn't be reached. Maybe it is down at the moment.\nPlease try again in a few hours.");
					return smsg.edit(nrembed);
				}
			};
			xhr.send();
		});
    }
    catch(err) {
        message.reply("couldn't connect to the joke API.\nError: " + err);
    }
}