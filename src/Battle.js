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

    static playerVictoryChance = (playerMartial, enemyMartial, stanceIsAggressive, martialLevel) => {
        const martialStanceBonus = (stanceIsAggressive, martialLevel) => stanceIsAggressive ? 8 * martialLevel : 0

        let victoryChance = 55
        victoryChance += this.playerAdvantage(playerMartial, enemyMartial) * 10
        victoryChance += martialStanceBonus(stanceIsAggressive, martialLevel)

        return victoryChance
    }

    static getBattleResult = (enemyMartial, gladiator, stance) => {
        const didPlayerWin = this.getDidPlayerWin(enemyMartial, gladiator, stance === "aggressive")
        const brandChange = this.getBrandChange(didPlayerWin, enemyMartial, gladiator, stance === "spectaculum", this.generateModifier())
        return { didPlayerWin, brandChange }
    }

    static getDidPlayerWin = (enemyMartial, gladiator, stanceIsAggressive) => {

        // If advantage is 0, player's chances are 55%, increases/decreases by 10 with every level
        let playerVictoryThreshold = this.playerVictoryChance(gladiator.martial, enemyMartial, stanceIsAggressive, gladiator.martial)

        const enemyRoll = Math.floor(Math.random() * 100 + 1)
        const didPlayerWin = enemyRoll < playerVictoryThreshold

        return didPlayerWin
    }
    static getBrandChange = (didPlayerWin, enemyMartial, gladiator, stanceIsSpectaculum, brandModifier) => {

        let shownamanshipDC = didPlayerWin ? 5 : 10

        let playerShowmanshipRoll = brandModifier + (gladiator.showmanship * 2) + gladiator.martial

        const spectaculumStanceBonus = stanceIsSpectaculum ? Math.ceil(gladiator.showmanship * 0.6) : 0

        playerShowmanshipRoll += spectaculumStanceBonus

        const playerResult = playerShowmanshipRoll - shownamanshipDC
        
        const playerAdvantage = this.playerAdvantage(gladiator.martial, enemyMartial)

        // A range from -4 to 4, multiplying the excitement factor
        //const surprisingResult = didPlayerWin ? playerAdvantage * -1 : playerAdvantage

        //const brandChange = didPlayerWin ? surprisingResult + playerResult : playerResult - surprisingResult

        const surprisingResult = playerAdvantage * -1

        if (!didPlayerWin && surprisingResult > 0 && surprisingResult + playerResult >= 0) {
            return playerResult > 0 ? playerResult : 0
        }
        let brandChange = surprisingResult + playerResult;
        if ((!didPlayerWin && brandChange > 0) || (didPlayerWin && brandChange < 0)) {
            brandChange = 0;
        }
        return surprisingResult + playerResult
    }
    static generateModifier = () => {
        const seed = Math.floor(Math.random() * 10 + 1)
        return seed > 7 ? 0 : (seed - 4)
    }
}