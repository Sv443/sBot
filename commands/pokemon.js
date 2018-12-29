const jsl = require("svjsl");
const settings = require("../settings.js");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Discord = require("discord.js");

const reqURL = "https://pokeapi.co/api/v2/pokemon/";

const capitalizeText = txt => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();


module.exports.help = "Gets all data of the specified Pokémon from the PokéAPI";
module.exports.args = ["Name"];
module.exports.run = (client, message, args) => {
    args = args.toLowerCase();
    try {
        if(jsl.isEmpty(args)) return message.reply("please enter a Pokémon's name, for example: `" + settings.command_prefix + "pokemon Diglett`");

        var rawinput = args;
        var entered_pokemon = args.toLowerCase();
        var xhr = new XMLHttpRequest();
        xhr.open("GET", reqURL + entered_pokemon + "/", true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4 && xhr.status == 200) {

                let pname = JSON.parse(xhr.responseText).name;
                let abilities = JSON.parse(xhr.responseText).abilities;
                let id = JSON.parse(xhr.responseText).id;
                let types = JSON.parse(xhr.responseText).types;
                let iconURL = JSON.parse(xhr.responseText).sprites.front_default;

                let f_abilities = [];
                for(let i = 0; i < abilities.length; i++) {
                    f_abilities.push(capitalizeText(abilities[i].ability.name));
                }

                let f_types = [];
                for(let i = 0; i < types.length; i++) {
                    f_types.push(capitalizeText(types[i].type.name));
                }

                let content = ""
                + "\n**ID:** " + id
                + "\n**Abilities:** " + f_abilities.join(", ")
                + "\n**Type(s):** " + f_types.join(", ")
                + "\n\n\n**More is coming soon!**";

                let embed = new Discord.RichEmbed()
                .setTitle("Pokémon " + capitalizeText(pname) + ":")
                .setDescription(content)
                .setFooter("Powered by PokéAPI - " + settings.embed.footer)
                .setThumbnail(iconURL)
                .addBlankField()
                .setColor(settings.embed.color);

                message.channel.send(embed);
            }
            else if(xhr.readyState == 4 && xhr.status == 404) return message.reply("couldn't find Pokémon **" + rawinput + "**, please try again.");
        };
        xhr.send();
    }
    catch(err) {
        message.reply("couldn't connect to the PokeAPI.\nError: " + err);
    }
}