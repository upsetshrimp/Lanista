import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';

export default function BattleView({ currentBattle }) {
    const [chosenStance, setChosenStance] = useState()

    return (
        <div>
            <span>EnemyLevel: {currentBattle.enemyLvl}</span><br />
            <span>Choose your Battle Stance!</span><br />
            <div style={{ display: "flex" }}>
                <div style={{ width: "30%" }}>
                    <Button
                        variant={chosenStance === 'aggressive' ? "contained" : "outlined"}
                        onClick={() => {
                            const nextStance = chosenStance === 'aggressive' ? undefined : 'aggressive'
                            setChosenStance(nextStance)
                        }}
                        color="primary"
                        padding="35px">Aggressive</Button>
                </div>
                <div style={{ width: "30%" }}>
                    <Button
                        variant={chosenStance === 'spectaculum' ? "contained" : "outlined"}
                        onClick={() => {
                            const nextStance = chosenStance === 'spectaculum' ? undefined : 'spectaculum'
                            setChosenStance(nextStance)
                        }}
                        color="primary" padding="35px">Spectaculum</Button>
                </div>
            </div>


        </div>)
}