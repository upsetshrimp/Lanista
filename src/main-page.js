import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import InitialConditions from "./Helpers/app-storage"
import Train from "./train"
import Gladiator from './gladiator';
import Battle from './Battle';


export default function MainPage() {
    const [gladiator, setGladiator] = useState(new Gladiator())
    const [gameHistory, setGameHistory] = useState({ wins: 0, losses: 0 })
    const [brand, setBrand] = useState()
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

        console.log(20, { ...gladiator, [attribute]: gladiator[attribute]++ }) //// WHY DOES THIS WORK????
        setGladiator({ ...gladiator, [attribute]: gladiator[attribute]++ })
        setInBattle(!inBattle)
    }
    const divstyleleft = { width: "30%", display: "grid", padding: "35px" }
    const divstyleRight = { width: "30%", display: "grid", padding: "35px" }
    return (
        <div>
            <header style={{ textAlign: "center" }}>{gladiator?.name ?? null}</header>
            <div style={{ display: "flex" }}>
                <div style={divstyleleft}>
                    <span style={{ textAlign: "center" }}>Brand: {brand}</span>
                    <span style={{ textAlign: "center" }}>Wins: {gameHistory.wins}</span>
                    <span style={{ textAlign: "center" }}>Losses: {gameHistory.losses}</span>
                </div>
                <div style={divstyleleft}>
                    <span style={{ textAlign: "center" }}>Showmanship: {gladiator.showmanship}</span>
                    <span style={{ textAlign: "center" }}>Martial: {gladiator.martial}</span>
                </div>
                <h3>Next Battle: </h3>
                <span>Enemy Level: {currentBattle.enemyLvl}</span>

                <span>
                    Happens in:
                    {currentBattle?.turn - turnCount} 
                    {currentBattle?.turn - turnCount == 1 ? ' Turn' : ' Turns'}
                </span>
                <div style={divstyleRight}>
                    <Button variant="contained" color="secondary" padding="35px">End Turn</Button>
                </div>
            </div>

            {inBattle ?
                <h1>BATTLE</h1> : <Train
                    gladiator={gladiator}
                    train={train}
                />}
        </div>
    );
}
