const axios = require("axios");
const fetch = require("node-fetch");
const tmi = require("tmi.js");

const channelname = "kitolito";
const token = "xxx";
const broadcaster_id = "41772911";
const helixBaseUrl = "https://api.twitch.tv/helix";
const clipAPI = `https://api.twitch.tv/helix/clips?broadcaster_id=${broadcaster_id}`;

const helix = axios.create({
  baseURL: helixBaseUrl
});

async function createClip() {
  var clipRAW = await fetch(clipAPI, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  var clipJSON = await clipRAW.json();
  var clipURL = clipJSON.data[0].edit_url;
  return clipURL;
}

async function getUser() {
  const response = await helix.get("/users", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data[0] || null;
}

async function getChannelInfo() {
  const response = await helix.get(`/users?login=juztim`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  console.log(response.data);
  return response.data[0] || null;
}

async function getFollowDate(username) {
  const followedAPI = `https://beta.decapi.me/twitch/followed/kitolito/${username}`;
  var followInfoRAW = await fetch(followedAPI, {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  var followdate = await followInfoRAW.text();
  return followdate;
}

async function getWeatherInfo(location) {
  const weatherAPI = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=0fcc15a2ad746790e472df3d5fe344f4&units=metric`;
  var weatherInfoRAW = await fetch(weatherAPI);
  var weatherJSON = await weatherInfoRAW.json();
  var temperature = await weatherJSON.main.temp;
  console.log(temperature);
  return temperature;
}

async function getMatchupsLaLiga() {
  const matchday = await getMatchDayPD();
  const matchUPAPI = `http://api.football-data.org/v2/competitions/PD/matches?matchday=${matchday}`;
  const matchUPRAW = await fetch(matchUPAPI, {
    headers: {
      "X-Auth-Token": `a339e5327cd74c3fb35c9f5d977a61cd`
    }
  });

  const matchUPJSON = await matchUPRAW.json();
  const matchTeams = matchUPJSON.matches.map(
    match => `${match.homeTeam.name} - ${match.awayTeam.name}`
  );
  return matchTeams;
}

async function getMatchupsBuLi() {
  const matchday = await getMatchDayBuLi();
  const matchUPAPI = `http://api.football-data.org/v2/competitions/BL1/matches?matchday=${matchday}`;
  const matchUPRAW = await fetch(matchUPAPI, {
    headers: {
      "X-Auth-Token": `a339e5327cd74c3fb35c9f5d977a61cd`
    }
  });

  const matchUPJSON = await matchUPRAW.json();
  const matchTeams = matchUPJSON.matches.map(
    match => `${match.homeTeam.name} - ${match.awayTeam.name}`
  );
  return matchTeams;
}

async function getMatchupsBPL() {
  const matchday = await getMatchDayBPL();
  const matchUPAPI = `http://api.football-data.org/v2/competitions/PL/matches?matchday=${matchday}`;
  const matchUPRAW = await fetch(matchUPAPI, {
    headers: {
      "X-Auth-Token": `a339e5327cd74c3fb35c9f5d977a61cd`
    }
  });

  const matchUPJSON = await matchUPRAW.json();
  const matchTeams = matchUPJSON.matches.map(
    match => `${match.homeTeam.name} - ${match.awayTeam.name}`
  );
  return matchTeams;
}

async function getMatchDayPD() {
  const API = `http://api.football-data.org/v2/competitions/PD/matches`;
  const APIRAW = await fetch(API, {
    headers: {
      "X-Auth-Token": `a339e5327cd74c3fb35c9f5d977a61cd`
    }
  });
  const APIJSON = await APIRAW.json();
  const matchday = await APIJSON.matches[1].season.currentMatchday;
  matchdayString = matchday.toString();
  return matchdayString;
}

async function getMatchDayBPL() {
  const API = `http://api.football-data.org/v2/competitions/PL/matches`;
  const APIRAW = await fetch(API, {
    headers: {
      "X-Auth-Token": `a339e5327cd74c3fb35c9f5d977a61cd`
    }
  });
  const APIJSON = await APIRAW.json();
  const matchday = await APIJSON.matches[1].season.currentMatchday;
  matchdayString = matchday.toString();
  return matchdayString;
}

async function getMatchDayBuLi() {
  const API = `http://api.football-data.org/v2/competitions/BL1/matches`;
  const APIRAW = await fetch(API, {
    headers: {
      "X-Auth-Token": `a339e5327cd74c3fb35c9f5d977a61cd`
    }
  });
  const APIJSON = await APIRAW.json();
  const matchday = await APIJSON.matches[1].season.currentMatchday;
  matchdayString = matchday.toString();
  return matchdayString;
}

async function getViewerCount() {
  const API = `https://api.twitch.tv/helix/streams?user_login=${channelname}`;
  const response = await fetch(API, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const json = await response.json();
  try {
    return String(
      `Der Stream hat gerade ${json.data[0].viewer_count} Zuschauer`
    );
  } catch (error) {
    console.log("" + error);
    return String("Kitolito ist gerade offline!");
  }
}

async function getFollowerCount() {
  const API = `https://api.twitch.tv/helix/users/follows?to_id=41772911`;
  const response = await fetch(API, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const json = await response.json();
  return String(`@kitolito hat ${json.total} Follower`);
}

async function getChannelViews() {
  const API = `https://api.twitch.tv/helix/users?login=kitolito`;
  const response = await fetch(API, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const { data } = await response.json();
  return String(`Insgesamt ${data[0].view_count} Kanalaufrufe!`);
}

async function getFifaViews() {
  const API = ``;
}

module.exports = {
  getUser,
  createClip,
  getChannelInfo,
  getFollowDate,
  getWeatherInfo,
  getMatchupsLaLiga,
  getMatchupsBuLi,
  getMatchupsBPL,
  getMatchDayPD,
  getMatchDayBPL,
  getMatchDayBuLi,
  getViewerCount,
  getFollowerCount,
  getChannelViews
};
