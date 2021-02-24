const {
    Client,
    Attachement
} = require('discord.js');

const cheerio = require('cheerio');
const request = require('request');
const bot = new Client();


const PREFIX = '!';

bot.on('ready', () => {
    console.log('Booop <3 This bot is online!');
})

bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'redpanda':
            image(message);
            break;
    }
});

function image(message) {
    var keywords = ["cute", "lazy", "fluffy", ""];
    var idx = Math.floor(Math.random() * 3);
    var optinos = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + keywords[idx] + " red panda",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };

    request(optinos, function (error, response, responseBody) {
        if (error)
            return;

        $ = cheerio.load(responseBody);

        var links = $(".image a.link");

        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

        if (!urls.length) {
            return;
        }

        message.channel.send(urls[Math.floor(Math.random() * urls.length)])
    })

}

bot.login(process.env.DJS_KEY);