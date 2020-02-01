var tmi = require("tmi.js");
const fetch = require("node-fetch");
const axios = require("axios");
const twitchapi = require("./twitchapi");
const commands = require("./commands");

const uptime_api = "https://beta.decapi.me/twitch/uptime/kitolito";
const channel = "kitolito";
const token = "xxx";
const helixBaseUrl = "https://api.twitch.tv/helix";
const helix = axios.create({
  baseURL: helixBaseUrl
});

async function getUptime() {
  const uptime = await fetch(uptime_api);
  const uptime_text = await uptime.text();
  client.say(channel, `Der Stream ist live seit: ${uptime_text}`);
}

var config = {
  options: {
    debug: true
  },
  connection: {
    cluster: "aws",
    reconnect: true
  },
  identity: {
    username: "juztimchatbot",
    password: "oauth:9ni21sfgwv7v4teg67tkhkodtqw93s"
  },
  channels: [channel]
};

var client = new tmi.client(config);
client.connect();

client.on("connected", (address, port) => {
  client.action(channel, "Der Bot wurde aktualisiert");
});

client.on("chat", (channel, user, message, self) => {
  if (message == "!kito") {
    var number = Math.floor(Math.random() * 6);
    switch (number) {
      case 0:
        client.say(channel, "@kitolito ist ein Ehrenmann");
        break;
      case 1:
        client.say(channel, "@kitolito ist Schlecht in FIFA");
        break;
      case 2:
        client.say(channel, "@kitolito? wer soll das sein?");
        break;
      case 3:
        client.say(channel, "@kitolito kuschelt gern mit Pique");
        break;
      case 4:
        client.say(channel, "@kitolito geh bitte einfach PES spielen...");
        break;
      case 5:
        client.say(channel, "@kitolito ist Topstreamer #1");
        break;
    }
  }
});

client.on("chat", (channel, user, message, self) => {
  if (message == "!liebe") {
    client.say(channel, "<3 <3 <3 <3 <3 <3");
  }
});

client.on("chat", (channel, user, message, self) => {
  if (message == "!origin") {
    client.say(channel, "Origin Name: Twitchkitolito");
  }
});

client.on("chat", (channel, user, message, self) => {
  if (message == "!skill") {
    var errorcode = Math.floor(Math.random() * 100);
    var username = user["display-name"];
    client.say(channel, `@${username} dein Skill beträgt ${errorcode}`);
  }
});

client.on("chat", (channel, user, message, self) => {
  if (message == "!uptime") {
    getUptime();
    console.log(typeof message);
  }
});

client.on("chat", (channel, user, message, self) => {
  if (message == "!squad") {
    client.say(
      channel,
      "aktuelles Team: https://www.futbin.com/20/squad/12996016"
    );
  }
});

client.on("chat", (channel, user, message, self) => {
  if (message == "!twitter") {
    client.say(
      channel,
      "Folgt gerne auch auf Twitter : https://twitter.com/kito_mzor"
    );
  }
});

client.on("chat", (channel, user, message, self) => {
  if (message == "vamos") {
    client.say(channel, "GG! VAMOS <3");
    twitchapi.getChannelInfo();
  }
});

client.on("chat", (channel, user, message, self) => {
  if (message == "!clip") {
    client.say(
      channel,
      "Dein Clip wird für dich erstellt bitte warte einen Augenblick."
    );
    var promiseURL = twitchapi.createClip();
    promiseURL.then(function(result) {
      client.say(channel, `Hier ist dein Clip ${result}`);
    });
  }
});

client.on("chat", (channel, user, message, self) => {
  if (message == "!hilfe") {
    client.say(
      channel,
      "- !hilfe - !liebe - !origin - !kito - !skill - !uptime - !squad - !twitter - !clip - !wetter (stadt) - !followed - !laliga - !bpl - !bundesliga - !stats"
    );
  }
});

client.on("chat", (channel, user, message, self) => {
  if (message == "!followed") {
    var username = user["display-name"];
    var followed = twitchapi.getFollowDate(username);
    followed.then(function(result) {
      client.say(channel, `@${username} folgt seit ${result}`);
      console.log(username);
    });
  }
});

client.on("chat", (channel, user, message, self) => {
  if (message.startsWith("!wetter ")) {
    const location = message.split(" ")[1];
    const temp = twitchapi.getWeatherInfo(location);
    temp.then(function(result) {
      const temp = result.toString();
      client.say(channel, `Die Temperatur in ${location} beträgt ${temp} Grad`);
    });
  }
});

client.on("chat", (channel, user, message, self) => {
  if (message == "!laliga") {
    const matchups = twitchapi.getMatchupsLaLiga();
    matchups.then(function(matches) {
      client.say(channel, `Die Spiele der LaLiga sind: `);
      matches.forEach(element => {
        client.say(channel, element);
      });
    });
  }
});

client.on("chat", (channel, user, message, self) => {
  if (message == "!bundesliga") {
    const matchups = twitchapi.getMatchupsBuLi();
    matchups.then(function(matches) {
      client.say(channel, `Die nächsten Spiele der Bundesliga sind: `);
      matches.forEach(element => {
        client.say(channel, element);
      });
    });
  }
});

client.on("chat", (channel, user, message, self) => {
  if (message == "!bpl") {
    const matchups = twitchapi.getMatchupsBPL();
    matchups.then(function(matches) {
      client.say(channel, `Die nächsten Spiele der Premiere League sind: `);
      matches.forEach(element => {
        client.say(channel, element);
      });
    });
  }
});

client.on("chat", async (channel, user, message, self) => {
  if (message == "!stats") {
    const viewerCount = await twitchapi.getViewerCount();
    const followerCount = await twitchapi.getFollowerCount();
    const channelViews = await twitchapi.getChannelViews();

    client.say(channel, `${viewerCount}, ${followerCount} und ${channelViews}`);
  }
});

client.on("chat", async (channel, user, message, self) => {
  var username = user["display-name"];
  if (message == "!clear") {
    if (username == "juztim" || username == "kitolito") {
      client.say(channel, "/clear");
    } else {
      client.say(channel, "Dazu hast du leider keine Rechte!");
    }
  }
});

client.on("chat", async (channel, user, message, self) => {
  if (message == "!fifa") {
  }
});
