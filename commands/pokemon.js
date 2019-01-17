const jsl = require("svjsl");
const settings = require("../settings.js");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Discord = require("discord.js");
const convert = require("../convert.js");

const reqURL = "https://pokeapi.co/api/v2/pokemon/";

const capitalizeText = txt => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();


module.exports.help = "Gets all data of the specified Pokémon from the PokéAPI";
module.exports.category = "Fun";
module.exports.args = ["Name or ID"];
module.exports.run = (client, message, args) => {
    args = args.toLowerCase();
    try {
        if(jsl.isEmpty(args)) return message.reply("please enter a Pokémon's name or ID, for example: `" + settings.command_prefix + "pokemon Diglett` or `" + settings.command_prefix + "pokemon 50`");

        var rawinput = args;
        var entered_pokemon = args.toLowerCase();
        var xhr = new XMLHttpRequest();
        xhr.open("GET", reqURL + entered_pokemon + "/", true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4 && xhr.status == 200) {
                var xhr2 = new XMLHttpRequest();
                var splashText;
                xhr2.open("GET", JSON.parse(xhr.responseText).species.url, true);
                xhr2.setRequestHeader("Content-type", "application/json");
                xhr2.onreadystatechange = () => {
                    if(xhr2.readyState == 4 && xhr2.status == 200) {
                        let flavorTE = JSON.parse(xhr2.responseText).flavor_text_entries;
                        for(let i = 0; i < flavorTE.length; i++) {
                            if(flavorTE[i].language.name == "en") splashText = flavorTE[i].flavor_text.replace(/\u000C/gm, " ").replace(/\n/gm, " ").replace(/\./gm, ". ").replace(/\,/gm, ", ");
                        }

                        var respT = JSON.parse(xhr.responseText);
                        let pname = respT.name;
                        let abilities = respT.abilities;
                        let id = respT.id;
                        let types = respT.types;
                        let iconURL = respT.sprites.front_default;
                        let height = (parseInt(respT.height) < 10 ? "0." + respT.height : calcHeight(respT.height));
                        let weight = (parseInt(respT.weight) < 10 ? "0." + respT.weight : calcWeight(respT.weight));

                        let f_abilities = [];
                        for(let i = 0; i < abilities.length; i++) {
                            f_abilities.push(capitalizeText(abilities[i].ability.name));
                        }

                        let f_types = [];
                        for(let i = 0; i < types.length; i++) {
                            f_types.push(capitalizeText(types[i].type.name));
                        }

                        let embed = new Discord.RichEmbed()
                            .addField("Name:", capitalizeText(pname), true)
                            .addField("ID:", id, true)
                            .addField("Height:", height + "m / " + convert.distance.toImperial(height) + "ft", true)
                            .addField("Weight:", weight + "kg / " + convert.weight.toImperial(weight) + "lbs", true)
                            .addField((f_types.length > 1 ? "Types:" : "Type:"), f_types.join(", "), true)
                            .addField((f_abilities.length > 1 ? "Abilities:" : "Ability:"), f_abilities.join(", "), true)
                            .addBlankField()
                            .addField("Description:", splashText, false)
                            .setFooter("Powered by PokéAPI - " + settings.embed.footer)
                            .setThumbnail(iconURL)
                            .addBlankField()
                            .setColor(settings.embed.color);

                        message.channel.send(embed);
                    }
                    else if(xhr2.readyState == 4 && xhr2.status == 404) return message.reply("couldn't find Pokémon **" + rawinput + "**, please try again and make sure you specified a correct name or ID.");
                }
                xhr2.send();
            }
            else if(xhr.readyState == 4 && xhr.status == 404) return message.reply("couldn't find Pokémon **" + rawinput + "**, please try again and make sure you specified a correct name or ID.");
        };
        xhr.send();
    }
    catch(err) {
        message.reply("📡 Couldn't connect to the PokeAPI.\nError: " + err);
    }
}

function calcHeight(height) {
    return height.toString().substring(0, height.toString().length - 1) + "." + height.toString().substring(height.toString().length - 1);
}

function calcWeight(weight) {
    return weight.toString().substring(0, weight.toString().length - 1) + "." + weight.toString().substring(weight.toString().length - 1);
}