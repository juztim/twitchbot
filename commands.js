var main = require("./index");

function liebeCommand() {
  main.client.on("chat", (channel, user, message, self) => {
    main.client.say(channel, "<3 <3 ");
  });
}

module.exports = {
  liebeCommand
};
