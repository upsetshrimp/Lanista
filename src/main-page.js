import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import InitialConditions from "./Helpers/app-storage"


export default function MainPage() {
    const [gladiator, setGladiator] = useState()
    const [gameHistory, setGameHistory] = useState({wins: 0, losses: 0})
    const [brand, setBrand] = useState()
    useEffect(() => {
        const bubu = InitialConditions.initializeConditions()
        setGladiator(bubu.gladiator)
        setGameHistory({wins: bubu.wins, losses: bubu.losses})
        setBrand(bubu.brand)


    }, [])
    console.log(18,gladiator)
    const divstyleleft = { width: "30%", display: "grid", padding: "35px" }
    const divstyleRight = { width: "30%", display: "grid", padding: "35px" }
    return (
        <div style={{ display: "flex" }}>
            <header style={{ textAlign: "center" }}>{gladiator?.name ?? null}</header>
            <div style={divstyleleft}>  
                <span style={{ textAlign: "center" }}>Brand: {brand}</span>
                <span style={{ textAlign: "center" }}>Wins: {gameHistory.wins}</span>
                <span style={{ textAlign: "center" }}>Losses: {gameHistory.losses}</span>
            </div>
            <div style={divstyleRight}>
                <Button variant="contained" color="secondary" padding="35px">Next Fight!</Button>
                <Button variant="outlined" color="primary" padding="35px">Train</Button>
            </div>


        </div>
    );
}
