import React, { useEffect, useState } from 'react';
import InitialConditions from "./Helpers/app-storage"
import Train from "./train"
import Gladiator from './gladiator';
import Battle from './Battle';
import StatView from './stat-view'
import BattleView from './battle-view'
import Button from '@material-ui/core/Button';


export default function MainPage() {
    const [gladiator, setGladiator] = useState(new Gladiator())
    const [gameHistory, setGameHistory] = useState({ wins: 0, losses: 0 })
    const [brand, setBrand] = useState()
    const [turnCount, setTurnCount] = useState(1)
    const [chosenAction, setChosenAction] = useState()
    const [currentBattle, setCurrentBattle] = useState(Battle.getInstance(1))
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
        let shownamanshipDC = didPlayerWin ? 4 : 8
        let brandChange
        let playerShowmanshipRoll = currentBattle.brandModifier + gladiator.showmanship * 3
        if (stance === 'spectaculum') {
            playerShowmanshipRoll += gladiator.showmanship
        }

        brandChange = playerShowmanshipRoll - shownamanshipDC;
        console.log(44, playerShowmanshipRoll, shownamanshipDC)

        setBrand(brand + brandChange)
    }
    const advanceTurn = () => {
        if (isInBattle) {
            resolveBattle(chosenAction)
            setCurrentBattle(Battle.getInstance(turnCount))
        }
        else {
            setGladiator({ ...gladiator, [chosenAction]: ++gladiator[chosenAction] })
        }
        // Advance to Next Turn
        setChosenAction(undefined)
        setTurnCount(turnCount + 1)
        console.log(39, turnCount)
    }
    return (
        <div>
            <StatView
                gladiator={gladiator}
                currentBattle={currentBattle}
                turnCount={turnCount}
                brand={brand}
                gameHistory={gameHistory} />

            {isInBattle ?
                <BattleView currentBattle={currentBattle} chosenAction={chosenAction} chooseAction={setChosenAction} /> :
                <Train gladiator={gladiator} chosenAction={chosenAction} chooseAction={setChosenAction} />}
                <Button
                    disabled={!canEndTurn}
                    onClick={advanceTurn}
                    variant="contained"
                    color="secondary"
                    padding="35px"
                >End Turn</Button>
        </div>
    );
}
