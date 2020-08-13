import React from 'react';


export default function StatView({ gladiator, currentBattle, turnCount, brand, gameHistory }) {
    
    
    
    
    const divstyleleft = { width: "30%", display: "grid", padding: "35px" }
    const timeToNextBattle = currentBattle?.turn - turnCount
    return (
        <>
            < header style={{ textAlign: "center" }}> {gladiator?.name ?? null}</header >
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
                <p>
                <h3 style={{textAlign: "center",marginTop: 0 }}>Next Battle</h3>
                <span>Enemy Level: </span> 
                <span>{currentBattle.enemyLvl}</span>
                    <br/>
                <span>
                    Happens in&nbsp;
                    {timeToNextBattle} Turn
                    {timeToNextBattle === 1 ? null : 's'}
                </span>
                </p>

            </div>
        </>
    )
}