export default class Battle {
    constructor(enemyLvl, turn) {
        this.enemyLvl = enemyLvl;
        this.turn = turn;
        this.brandChange = undefined;
        this.didWin = undefined;
    }
}