// channels
//  - levelUp (Player)
//  - challengeSuccess (Player, record)
//  - challengeFail (Player, record)
//  - death (Player)
//  - respawn (Player)
//  - newAdvancement (Player, advancement)
//
//
//

events = {
    callbacks: {},
    on: function (channel, func) {
        if (!this.callbacks.hasOwnProperty(channel)) {
            this.callbacks[channel] = [];
        }
        this.callbacks[channel].append(func);
    },
    send: function (channel, ...args) {
        if (this.callbacks.hasOwnProperty(channel)) {
            for (let func of this.callbacks[channel]) {
                func(...args);
            }
        }
    },
};

console.log("loaded module EVENTS");
