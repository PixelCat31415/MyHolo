class Game {
    async getPlayer(){
        return await core.send("game-get-player");
    }

    async getBoss(){
        return await core.send("game-get-boss");
    }
}

let game = new Game();