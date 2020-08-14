export default class Battle {
    static instance = null
    static previousTurn = 0
    constructor(currentTurn) {
        this.enemyLvl = Math.floor(Math.random() * 5 + 1)
        this.turn = currentTurn + Math.floor((Math.random() * 1 + 2))
        this.brandModifier = this.generateModifier()
        this.didWin = undefined;
    }
    static getInstance = currentTurn => {
        if (this.previousTurn !== currentTurn) {
            this.instance = new Battle(currentTurn)
            this.previousTurn = currentTurn
        }

        return this.instance
    }
    generateModifier = () => {
        const seed = Math.floor(Math.random() * 10 + 1)
        return seed > 7 ? 0 : (seed - 4)

    }
}