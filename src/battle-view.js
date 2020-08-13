import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';

export default function BattleView({ currentBattle, chosenAction, chooseAction}) {

    return (
        <div>
            <span>EnemyLevel: {currentBattle.enemyLvl}</span><br />
            <span>Choose your Battle Stance!</span><br />
            <div style={{ display: "flex" }}>
                <div style={{ width: "30%" }}>
                    <Button
                        variant={chosenAction === 'aggressive' ? "contained" : "outlined"}
                        onClick={() => {
                            const nextStance = chosenAction === 'aggressive' ? undefined : 'aggressive'
                            chooseAction(nextStance)
                        }}
                        color="primary"
                        padding="35px">Aggressive</Button>
                </div>
                <div style={{ width: "30%" }}>
                    <Button
                        variant={chosenAction === 'spectaculum' ? "contained" : "outlined"}
                        onClick={() => {
                            const nextStance = chosenAction === 'spectaculum' ? undefined : 'spectaculum'
                            chooseAction(nextStance)
                        }}
                        color="primary" padding="35px">Spectaculum</Button>
                </div>
            </div>


        </div>)
}