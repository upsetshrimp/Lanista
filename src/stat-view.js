import React from 'react';


export default function StatView({ gladiator, currentBattle, turnCount, brand, gameHistory }) {
    const divstyleleft = { width: "30%", display: "grid", padding: "35px" }
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
                <h3>Next Battle: </h3>
                <span>Enemy Level: {currentBattle.enemyLvl}</span>

                <span>
                    Happens in:
                    {currentBattle?.turn - turnCount}
                    {currentBattle?.turn - turnCount === 1 ? ' Turn' : ' Turns'}
                </span>

            </div>
        </>
    )
}