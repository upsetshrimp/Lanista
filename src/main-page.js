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
    const [canEndTurn, setCanEndTurn] = useState(false)
    const [turnCount, setTurnCount] = useState(1)
    const [inBattle, setInBattle] = useState(false)
    const [currentBattle, setCurrentBattle] = useState(new Battle(1))
    useEffect(() => {
        const bubu = InitialConditions.initializeConditions()
        setGladiator(bubu.gladiator)
        setGameHistory({ wins: bubu.wins, losses: bubu.losses })
        setBrand(bubu.brand)
    }, [])
    const train = attribute => {
        setGladiator({ ...gladiator, [attribute]: ++gladiator[attribute] })
        setInBattle(!inBattle)
    }

    return (
        <div>
            <StatView
                gladiator={gladiator}
                currentBattle={currentBattle}
                turnCount={turnCount}
                brand={brand}
                gameHistory={gameHistory} />

            {inBattle ?
                <BattleView
                    currentBattle={currentBattle} /> : <Train
                    gladiator={gladiator}
                    train={train}
                />}
            <Button
                style={{ width: "30%", display: "grid", padding: "35px" }}
                disabled={canEndTurn}
                variant="contained"
                color="secondary"
                padding="35px"
                size="large"
            >End Turn</Button>
        </div>
    );
}
