export default class Battle {
    constructor(currentTurn) {
        this.enemyLvl = Math.floor(Math.random() * (5 - 1) + 1)
        this.turn = Math.floor(currentTurn + (Math.random() * (3 - 1) + 1))
        this.brandChange = undefined;
        this.didWin = undefined;
    }
}