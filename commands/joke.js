const jsl = require("svjsl");
const settings = require("../settings.js");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Discord = require("discord.js");


module.exports.help = "Tells you a random joke";
module.exports.category = "Fun";
module.exports.args = ["Category"];
module.exports.run = (client, message, args) => {
    try {
		args = args.split(" ");
		if(args.length == 1) {
			let loadingembed = new Discord.RichEmbed()
				.setFooter("Loading...", settings.loadingURL)
				.setColor(settings.embed.color);
			message.channel.send(loadingembed).then(smsg => {

				let catxhr = new XMLHttpRequest();
				catxhr.open("GET", `${settings.command_settings.joke.baseURL}/jokeapi/v2/joke/Any?format=json`);
				catxhr.onreadystatechange = () => {
					if(catxhr.readyState == 4 && catxhr.status == 200) {
						let availableCategories = JSON.parse(catxhr.responseText).categories, jokeCategory;

						if(args[0] === "") {
							let noCat = new Discord.RichEmbed()
								.setColor(settings.embed.color)
								.setDescription(`**Joke category was left empty - Please specify any of the following categories (case sensitive):**\n- ${JSON.parse(catxhr.responseText).categories.join("\n- ")}\n\nExample: \`${settings.command_prefix}joke Miscellaneous\``);
							return smsg.edit(noCat);
						}

						if(!availableCategories.includes(args[0])) {
							let wrongCat = new Discord.RichEmbed()
								.setColor(settings.embed.color)
								.setDescription(`**Couldn't find the category \`${args[0]}\` - Please use any of the following (case sensitive):**\n- ${JSON.parse(catxhr.responseText).categories.join("\n- ")}\n\nExample: \`${settings.command_prefix}joke Miscellaneous\``);
							return smsg.edit(wrongCat);
						}
						else jokeCategory = args[0];

						var xhr = new XMLHttpRequest();
						xhr.open("GET", `${settings.command_settings.joke.baseURL}/jokeapi/v2/joke/Any/${jokeCategory}?format=json`, true);
						xhr.setRequestHeader("Content-type", "application/json; utf-8");
						xhr.onreadystatechange = () => {
							if(xhr.readyState == 4 && xhr.status == 200) {
								let joketype = JSON.parse(xhr.responseText).type;
								var joke = "";

								if(joketype == "single") {
									let embed = new Discord.RichEmbed()
										.setDescription(JSON.parse(xhr.responseText).joke)
										.setFooter(`ID: ${JSON.parse(xhr.responseText).id} - Category: ${JSON.parse(xhr.responseText).category} - Powered by JokeAPI (https://sv443.net/jokeapi)`, settings.command_settings.joke.icon)
										.addBlankField()
										.setColor(settings.embed.color);
									return smsg.edit(embed);
								}
								else if(joketype == "twopart") {
									let embed = new Discord.RichEmbed()
										.setDescription(JSON.parse(xhr.responseText).setup + "\n\n(...)")
										.setFooter(`ID: ${JSON.parse(xhr.responseText).id} - Category: ${JSON.parse(xhr.responseText).category} - Powered by JokeAPI (https://sv443.net/jokeapi)`, settings.command_settings.joke.icon)
										.addBlankField()
										.setColor(settings.embed.color);
									smsg.edit(embed).then(m => {
										setTimeout(()=>{
											let nembed = new Discord.RichEmbed()
												.setDescription(JSON.parse(xhr.responseText).setup + "\n\n" + JSON.parse(xhr.responseText).delivery)
												.setFooter(`ID: ${JSON.parse(xhr.responseText).id} - Category: ${JSON.parse(xhr.responseText).category} - Powered by JokeAPI (https://sv443.net/jokeapi)`, settings.command_settings.joke.icon)
												.addBlankField()
												.setColor(settings.embed.color);
											return m.edit(nembed);
										}, 4000);
									});
								}
							}
							else if(xhr.readyState == 4 && xhr.status >= 400) {
								let nrembed = new Discord.RichEmbed()
									.setColor(settings.embed.color)
									.setDescription(`The Joke API couldn't be reached. Maybe it is down at the moment or you've sent too many requests. Please try again in a few hours.\n\nStatus code: ${xhr.status} - ${xhr.responseText}`);
								return smsg.edit(nrembed);
							}
							else process.stdout.write(xhr.readyState);
						};
						xhr.send();
						
					}
				}
				catxhr.send();
			});
		}
    }
    catch(err) {
        message.reply("📡 Couldn't connect to the joke API.\nError: " + err);
    }
}
