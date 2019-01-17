const jsl = require("svjsl");
const settings = require("../settings.js");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Discord = require("discord.js");

const reqURL = "http://localhost:8079"; // https://sv443.net/jokeapi for non-local use


module.exports.help = "Tells you a random joke";
module.exports.category = "Fun";
module.exports.run = (client, message, args) => {
    try {
		let loadingembed = new Discord.RichEmbed()
			.setFooter("Fetching random joke...", settings.loadingURL)
			.setColor(settings.embed.color);
		message.channel.send(loadingembed).then(smsg => {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", reqURL, true);
			xhr.setRequestHeader("joke_category", settings.command_settings.joke.category);
			xhr.setRequestHeader("Content-type", "application/json; utf-8");
			xhr.onreadystatechange = () => {
				if(xhr.readyState == 4 && xhr.status == 200) {
					let joketype = JSON.parse(xhr.responseText).type;
					var joke = "";

					if(joketype == "single") {
						let embed = new Discord.RichEmbed()
							.setDescription(JSON.parse(xhr.responseText).joke)
							.setFooter("Category: " + JSON.parse(xhr.responseText).category + " - Powered by JokeAPI (https://sv443.net/jokeapi)", settings.command_settings.joke.icon)
							.addBlankField()
							.setColor(settings.embed.color);
						return smsg.edit(embed);
					}
					else if(joketype == "twopart") {
						let embed = new Discord.RichEmbed()
							.setDescription(JSON.parse(xhr.responseText).setup + "\n\n(...)")
							.setFooter("Category: " + JSON.parse(xhr.responseText).category + " - Powered by JokeAPI (https://sv443.net/jokeapi)", settings.command_settings.joke.icon)
							.addBlankField()
							.setColor(settings.embed.color);
						smsg.edit(embed).then(m => {
							setTimeout(()=>{
								let nembed = new Discord.RichEmbed()
									.setDescription(JSON.parse(xhr.responseText).setup + "\n\n" + JSON.parse(xhr.responseText).delivery)
									.setFooter("Category: " + JSON.parse(xhr.responseText).category + " - Powered by JokeAPI (https://sv443.net/jokeapi)", settings.command_settings.joke.icon)
									.addBlankField()
									.setColor(settings.embed.color);
								return m.edit(nembed);
							}, 4000);
						});
					}
				}
				else if(xhr.readyState == 4 && xhr.status != 200) {
					let dedembed = new Discord.RichEmbed()
						.setColor(settings.embed.color)
						.setDescription("You wanna hear a joke?\n\nMy server breaking for no apparent reason at all and me having to wipe the damn thing.\nSorry, this API will be back soon :/");

					return smsg.edit(dedembed);

					let nrembed = new Discord.RichEmbed()
						.setColor(settings.embed.color)
						.setDescription("The Joke API couldn't be reached. Maybe it is down at the moment.\nPlease try again in a few hours.\n\nStatus code: " + xhr.status);
					return smsg.edit(nrembed);
				}
				else process.stdout.write(xhr.readyState);
			};
			xhr.send();
		});
    }
    catch(err) {
        message.reply("📡 Couldn't connect to the joke API.\nError: " + err);
    }
}