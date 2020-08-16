export default class Battle {
    static instance = null
    static previousTurn = 0
    constructor(currentTurn) {
        this.enemyLvl = Math.floor(Math.random() * 5 + 1)
        this.turn = currentTurn + Math.floor((Math.random() * 1 + 2))
        this.didWin = undefined;
    }
    static getInstance = currentTurn => {
        if (this.previousTurn !== currentTurn) {
            this.instance = new Battle(currentTurn)
            this.previousTurn = currentTurn
        }

        return this.instance
    }
    static playerAdvantage = (playerMartial, enemyMartial) => playerMartial - enemyMartial

    
    static resolveBattle = (playerAdvantage, gladiator, stanceIsMartial) => {

        // If advantage is 0, player's chances are 55%, increases/decreases by 10 with every level
        let playerVictoryThreshold = 55 + (playerAdvantage * 10)

        if (stanceIsMartial) {
            playerVictoryThreshold += 3 * gladiator.martial
        }

        const enemyRoll = Math.floor(Math.random() * 100 + 1)
        const didPlayerWin = enemyRoll < playerVictoryThreshold

        console.log(31, playerVictoryThreshold, didPlayerWin)
        return didPlayerWin
    }
    static resolveBrandChange = (didPlayerWin, playerAdvantage, gladiator, stanceIsSpectaculum) => {
        let brandChange

        let shownamanshipDC = didPlayerWin ? 4 : 8

        let playerShowmanshipRoll = this.generateModifier() + (gladiator.showmanship * 2) + gladiator.martial
        if (stanceIsSpectaculum) {
            playerShowmanshipRoll += Math.floor(gladiator.showmanship * 1.5)
        }

        brandChange = playerShowmanshipRoll - shownamanshipDC;

        console.log(46, stanceIsSpectaculum, brandChange)
        return brandChange
    }
    static generateModifier = () => {
        const seed = Math.floor(Math.random() * 10 + 1)
        return seed > 7 ? 0 : (seed - 4)
    }
}