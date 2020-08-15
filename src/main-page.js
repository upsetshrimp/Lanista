import React, { useEffect, useState } from 'react';
import InitialConditions from "./Helpers/app-storage"
import TrainingView from "./trainining-view"
import Gladiator from './gladiator';
import Battle from './Battle';
import StatView from './stat-view'
import BattleView from './battle-view'
import { Grid, Button, Paper } from '@material-ui/core';
import BattleResultDialog from './battle-result-dialog';


export default function MainPage() {
    const [gladiator, setGladiator] = useState(new Gladiator())
    const [gameHistory, setGameHistory] = useState({ wins: 0, losses: 0 })
    const [brand, setBrand] = useState()
    const [turnCount, setTurnCount] = useState(1)
    const [chosenAction, setChosenAction] = useState()
    const [currentBattle, setCurrentBattle] = useState(Battle.getInstance(1))
    const [showBattleResult, setShowBattleResult] = useState(false)
    const [battleResult, setBattleResult] = useState({})
    const isInBattle = turnCount === currentBattle.turn
    const canEndTurn = chosenAction !== undefined

    useEffect(() => {
        const bubu = InitialConditions.initializeConditions()
        setGladiator(bubu.gladiator)
        setGameHistory({ wins: bubu.wins, losses: bubu.losses })
        setBrand(bubu.brand)
    }, [])
    const resolveBattle = (stance) => {

        const playerAdvantage = gladiator.martial - currentBattle?.enemyLvl

        let playerVictoryThreshold = 55 + (playerAdvantage * 10)

        if (stance === 'martial') {
            playerVictoryThreshold += 3 * gladiator.martial
        }

        // If advantage is 0, player's chances are 55%, increases/decreases with every level
        const enemyRoll = Math.floor(Math.random() * 100 + 1)
        const didPlayerWin = enemyRoll < playerVictoryThreshold

        let nextHistory = gameHistory
        if (didPlayerWin) {
            nextHistory.wins++
        } else {
            nextHistory.losses++
        }

        setGameHistory(nextHistory)

        let shownamanshipDC = didPlayerWin ? 4 : 8
      
        let brandChange

        let playerShowmanshipRoll = currentBattle.brandModifier + (gladiator.showmanship * 2) + gladiator.martial
        if (stance === 'spectaculum') {
            playerShowmanshipRoll += Math.floor(gladiator.showmanship * 1.5)
        }
        
        brandChange = playerShowmanshipRoll - shownamanshipDC;
        
        setBattleResult({ didPlayerWin, stance, enemyLvl: currentBattle.enemyLvl, brandChange })
        
        return brand + brandChange
    }
    const advanceTurn = () => {
        let nextBrand = brand
        if (isInBattle) {
            nextBrand = resolveBattle(chosenAction)
            setCurrentBattle(Battle.getInstance(turnCount))
            setBrand(nextBrand)
            setShowBattleResult(true)
        }
        else {
            const xpPerLevel = [100, 200, 200, 400]
            
            if (chosenAction === "martial") {
                let martialXP = gladiator.martialXP + 100
                let martialLevel = gladiator.martial
                if (xpPerLevel[gladiator.martial - 1] === martialXP) {
                    martialXP = 0
                    martialLevel++
                }
                setGladiator({ ...gladiator, martial: martialLevel, martialXP: martialXP })
            }
            if (chosenAction === "showmanship") {
                let showmanshipXP = gladiator.showmanshipXP + 100
                let showmanshipLevel = gladiator.showmanship
                if (xpPerLevel[gladiator.showmanship - 1] === showmanshipXP) {
                    showmanshipXP = 0
                    showmanshipLevel++
                }
                setGladiator({ ...gladiator, showmanship: showmanshipLevel, showmanshipXP: showmanshipXP })
            }

            // setGladiator({ ...gladiator, [chosenAction]: ++gladiator[chosenAction] }) -> RIP a beautiful implementation
            // press F to pay respects
        }

        // Advance to Next Turn
        setChosenAction(undefined)
        setTurnCount(turnCount + 1)
        if (nextBrand >= 30) {
            alert(`Victory! In ${turnCount} turns.
            Brand: ${nextBrand},
            Wins: ${gameHistory.wins}
            Losses: ${gameHistory.losses}`)
        }
    }
    return (
        <Grid container direction='column' alignItems='center'>
            <Grid item key={1}>
                <StatView
                    gladiator={gladiator}
                    currentBattle={currentBattle}
                    turnCount={turnCount}
                    brand={brand}
                    gameHistory={gameHistory} />
            </Grid>
            <Grid item key={2}>
                {isInBattle ?
                    <BattleView gladiator={gladiator} currentBattle={currentBattle} chosenAction={chosenAction} chooseAction={setChosenAction} /> :
                    <TrainingView gladiator={gladiator} chosenAction={chosenAction} chooseAction={setChosenAction} />
                }
            </Grid>
            <Grid item key={3} xs={10}>
                <Button
                    disabled={!canEndTurn}
                    onClick={advanceTurn}
                    variant="contained"
                    color="secondary"
                    fullWidth
                    sizeLarge

                >End Turn</Button>
            </Grid>
            <BattleResultDialog battleResult={battleResult} isOpen={showBattleResult} close={() => setShowBattleResult(false)} />
            </Grid>
    );
}
