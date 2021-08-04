/*
    --- Cosmetic Generator ---
    Make sure you have node.js installed and did the command npm i. Or just speak to UCDFiddes.

    url = MCStore URL
    type = Either "Avatar" or "Costume" or "Title"
    threeKeywords = 3 Keywords that descripe the cosmetics (Name is already included)
*/

// Edit These
var url = "https://mcstore.io/the-hive/punch-costume";
var type = "Avatar";
var threeKeywords = "Fox, Punch, Animal";
// Edit These

/*
    CODE BELOW
*/

const fetch = require("node-fetch");
const { default: parse } = require("node-html-parser");

const capitalize = (text) => {
    var a = text.toLowerCase();
    var b = text.charAt(0);
    var c = b.toUpperCase();
    var d = a.slice(1);
    var e = c + d;

    return e;
};

fetch(url)
    .then((res) => res.text())
    .then((body) => {
        const root = parse(body);
        var image = root.querySelectorAll("meta")[6].getAttribute("content");
        var name = root.querySelectorAll("title")[0].innerText;
        var longName = name.split("by")[0].trimEnd();

        var shortName = name.split("Costume")[0].trimEnd();

        if (type == "Avatar") {
            var description = root
                .querySelector("div.desc")
                .querySelector("p")
                .innerText.split(`+ Includes`)[2]
                .split('" avatar')[0]
                .slice(2);
            var longName = `${description} Avatar`;
        }

        if (type == "Title") {
            var description = root
                .querySelector("div.desc")
                .querySelector("p")
                .innerText.split(`+ Includes`)[1]
                .split('" hub title')[0]
                .slice(2);
            var longName = `"${description}" Title`;
        }

        var description = root
            .querySelector("div.desc")
            .querySelector("p")
            .innerText.split("Features")[0]
            .trim();
        var coins = root
            .querySelector("div.coins")
            .innerText.split("Minecoins")[0]
            .trim();

        var getSimilar = () => {
            var similar = [];

            similar.push(`avatars/${shortName.toLowerCase()}.json`);
            similar.push(`costumes/${shortName.toLowerCase()}.json`);
            similar.push(`titles/${shortName.toLowerCase()}.json`);

            var filter = similar.filter(
                (x) => !x.startsWith(`${type.toLowerCase()}s`)
            );
            return filter;
        };

        var output = {
            id: `${type.toLowerCase()}s/${shortName.toLowerCase()}.json`,
            name: `${longName}`,
            thumbnail: `${image}`,
            price: {
                type: "Minecoins",
                amount: `${coins}`,
            },
            description: `${description}`,
            source: "Store",
            type: `${type}`,
            obtainable: true,
            date: "N/A",
            keywords: `${type}, Store, Obtainable, ${capitalize(
                shortName
            )}, ${threeKeywords}`,
            similar: getSimilar(),
        };
        var s = JSON.parse(JSON.stringify(output));
        console.log(s);
    });
