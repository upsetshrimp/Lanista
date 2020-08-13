export default class Battle {
    static instance = null
    static previousTurn = 0
    constructor(currentTurn) {
        this.enemyLvl = Math.floor(Math.random() * 5 + 1)
        this.turn = currentTurn + Math.floor((Math.random() * 3 + 1))
        this.brandChange = undefined;
        this.didWin = undefined;
    }
    static getInstance = currentTurn => {
        if(this.previousTurn !== currentTurn){
        this.instance = new Battle(currentTurn)
        console.log(11, this.instance, this.previousTurn)
        this.previousTurn=currentTurn
    }
        
        return this.instance
    }
}