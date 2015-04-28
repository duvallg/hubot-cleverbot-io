// Description:
//   Integrates cleverbot.io with hubot
//
// Dependencies:
//   cleverbot.io
//
// Configuration:
//   None
//
// Commands:
//   hubot chat <dialog>  - returns cleverbot's response to your dialog
//
// Author:
//   Gary DuVall - https://github.com/duvallg


(function() {
    var cleverbot = require("cleverbot.io");
    var bot = new cleverbot("zcgauapUpqnXDeOo", "xAQYaCpTjLrPL9d1uvhx0MmuwyAx5J0D");
    module.exports = function(robot) {
        var findSelf = new RegExp('^[@]?(' + robot.name + ')' + (robot.alias ? '|(' + robot.alias + ')' : '') + '[:,]?\\s', 'i');
        robot.hear(/.*/i, function(msg) {
            if (findSelf.test(msg.message.text)) {
                bot.setNick("generic_nick");
                bot.create(function(err, session) {
                    bot.ask(msg.message.text, function(err, response) {
                        if (err) console.log(err);
                        else msg.send(response);
                    });
                });
            }
        });
    };
}).call(this);