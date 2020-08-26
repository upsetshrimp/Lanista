export default class Battle {
    static instance = null
    static previousTurn = -1
    static gameGoal = 10
    constructor(currentTurn, gladiatorLevel) {

        const minLevel = gladiatorLevel > 5 ? gladiatorLevel - 4 : 1
        const maxLevel = gladiatorLevel < 4 ? gladiatorLevel + 4 : 8
        this.enemyLvl = Math.floor(Math.random() * maxLevel + minLevel)
        this.turn = currentTurn + Math.floor((Math.random() * 2 + 2))
        this.didWin = undefined;
    }
    static getInstance = (currentTurn, gladiatorLevel) => {
        if (this.previousTurn !== currentTurn) {
            this.instance = new Battle(currentTurn, gladiatorLevel)
            this.previousTurn = currentTurn
        }

        return this.instance
    }
    static playerAdvantage = (playerMartial, enemyMartial) => playerMartial - enemyMartial

    static playerVictoryChance = (playerMartial, enemyMartial, stanceIsAggressive, martialLevel) => {

        const martialStanceBonus = (stanceIsAggressive, martialLevel, enemyMartial) => stanceIsAggressive ? (10 - enemyMartial) * martialLevel : 0

        let victoryChance = 50

        victoryChance += this.playerAdvantage(playerMartial, enemyMartial) * 10

        // Stance bonus is relative to the fraction, so it never gets over 100
        let stanceRelativeBonus = (100 - victoryChance) * martialStanceBonus(stanceIsAggressive, martialLevel, enemyMartial) / 100

        return Math.ceil(victoryChance + stanceRelativeBonus)
    }

    static getBattleResult = (enemyMartial, gladiator, stance) => {
        const didPlayerWin = this.getDidPlayerWin(enemyMartial, gladiator, stance === "aggressive")
        const brandChange = this.getBrandChange(didPlayerWin, enemyMartial, gladiator, stance === "spectaculum", this.generateModifier())
        return { didPlayerWin, brandChange }
    }

    static getDidPlayerWin = (enemyMartial, gladiator, stanceIsAggressive) => {

        // If advantage is 0, player's chances are 50%, increases/decreases by 10 with every level
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

        let surprisingResult = playerAdvantage * -1.5

        surprisingResult = surprisingResult > 0 ? Math.floor(surprisingResult) : Math.ceil(surprisingResult)

        /*
        // If the player's result is over 0 without assistance of the surprising result, 
        // don't use it
        if (!didPlayerWin && surprisingResult > 0 && surprisingResult + playerResult >= 0) {
            return playerResult > 0 ? playerResult : 0
        }
        */

        let brandChange = surprisingResult + playerResult;

        if ((!didPlayerWin && brandChange > 0) || (didPlayerWin && brandChange < 0)) {
            brandChange = 0;
        }
        return brandChange
    }
    static generateModifier = () => {
        const seed = Math.floor(Math.random() * 10 + 1)
        return seed > 7 ? 0 : (seed - 4)
    }
}