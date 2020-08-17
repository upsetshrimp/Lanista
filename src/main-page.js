import React, { useEffect, useState } from 'react';
import InitialConditions from "./Helpers/app-storage"
import TrainingView from "./trainining-view"
import Gladiator from './gladiator';
import Battle from './Battle';
import StatView from './stat-view'
import BattleView from './battle-view'
import { Grid, Button } from '@material-ui/core';
import BattleResultDialog from './battle-result-dialog';
import TrainingResultDialog from './training-result-dialog'


export default function MainPage() {
    const [gladiator, setGladiator] = useState(new Gladiator())
    const [gameHistory, setGameHistory] = useState({ wins: 0, losses: 0 })
    const [brand, setBrand] = useState()
    const [turnCount, setTurnCount] = useState(1)
    const [chosenAction, setChosenAction] = useState()
    const [currentBattle, setCurrentBattle] = useState(Battle.getInstance(1))
    const [showBattleResult, setShowBattleResult] = useState(false)
    const [battleResult, setBattleResult] = useState({})
    const [showTrainingResult, setShowTrainingResult] = useState(undefined)
    const isInBattle = turnCount === currentBattle.turn
    const canEndTurn = chosenAction !== undefined

    useEffect(() => {
        const bubu = InitialConditions.initializeConditions()
        setGladiator(bubu.gladiator)
        setGameHistory({ wins: bubu.wins, losses: bubu.losses })
        setBrand(bubu.brand)
    }, [])
    const advanceTurn = () => {
        if (isInBattle) {
            const { didPlayerWin, brandChange } = Battle.getBattleResult(currentBattle.enemyLvl, gladiator, chosenAction)
            let nextGameHistory = gameHistory
            didPlayerWin ? nextGameHistory.wins++ : nextGameHistory.losses++

            setGameHistory(nextGameHistory)
            setCurrentBattle(Battle.getInstance(turnCount))
            setBrand(brand + brandChange)
            setBattleResult({ didPlayerWin, stance: chosenAction, enemyLvl: currentBattle.enemyLvl, brandChange })
            setShowBattleResult(true)

            if (brand + brandChange >= 30) {
                alert(`Victory! In ${turnCount} turns.
                Brand: ${brand + brandChange},
                Wins: ${gameHistory.wins}
                Losses: ${gameHistory.losses}`)
            }
        }
        else {
            const gladiatorChange = Gladiator.resolveTraining(chosenAction, gladiator)
            setGladiator({ ...gladiator, ...gladiatorChange }) // Beautiful implementation restored!
            setShowTrainingResult(chosenAction)
        }

        // Advance to Next Turn
        setChosenAction(undefined)
        setTurnCount(turnCount + 1)
    }
    return (
        <Grid container direction='column' alignItems='center'>
            <Grid item key={1} xs={12}>
                <StatView
                    gladiator={gladiator}
                    currentBattle={currentBattle}
                    turnCount={turnCount}
                    brand={brand}
                    gameHistory={gameHistory}
                    isInBattle={isInBattle} />
            </Grid>
            <hr/>
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

                >End Turn</Button>
            </Grid>
            <BattleResultDialog battleResult={battleResult} isOpen={showBattleResult} close={() => setShowBattleResult(false)} />
            <TrainingResultDialog gladiator={gladiator} ability={showTrainingResult} isOpen={showTrainingResult} close={() => setShowTrainingResult(undefined)} />
        </Grid>
    );
}
