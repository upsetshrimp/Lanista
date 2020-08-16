import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import {Grid} from '@material-ui/core'
import Battle from './Battle';

export default function BattleView({ gladiator, currentBattle, chosenAction, chooseAction }) {
    const victoryChance = 55 + (gladiator.martial - currentBattle.enemyLvl) * 10
    let victoryChanceString = "Low"
    if (victoryChance > 40) {
        victoryChanceString = "Medium"
    }
    if (victoryChance > 70) {
        victoryChanceString = "High"
    }
    const playerAdvantage = Battle.playerAdvantage(gladiator.martial, currentBattle.enemyLvl)
    const brandGainUponVictory = Battle.resolveBrandChange(true, playerAdvantage, gladiator, false)
    const brandGainUponDefeat = Battle.resolveBrandChange(false, playerAdvantage, gladiator, false)
    
   
    return (
        <div>
            <span>EnemyLevel: {currentBattle.enemyLvl}</span>
            <br />
            <span>Choose your Battle Stance!</span>
            <br />
            <br />
            <div style={{ display: "flex" }}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Button
                            variant={chosenAction === 'aggressive' ? "contained" : "outlined"}
                            onClick={() => {
                                const nextStance = chosenAction === 'aggressive' ? undefined : 'aggressive'
                                chooseAction(nextStance)
                            }}
                            color="primary"
                            padding="35px">Aggressive</Button>

                    </Grid>
                    <Grid item>
                        <Button
                            variant={chosenAction === 'spectaculum' ? "contained" : "outlined"}
                            onClick={() => {
                                const nextStance = chosenAction === 'spectaculum' ? undefined : 'spectaculum'
                                chooseAction(nextStance)
                            }}
                            color="primary" padding="35px">Spectaculum</Button>
                    </Grid>
                </Grid>

            </div>
            <div style={{ textAlign: "center" }}>
                <div>Victory Chance: {victoryChanceString}</div>
                <div>Expected Brand Gain Upon Victory: ~{brandGainUponVictory}</div>
                <div>Expected Brand Gain Upon Defeat: ~{brandGainUponDefeat}</div>
                {chosenAction === "spectaculum" ? <span>Bonus per Showmanship level</span> : null}
                {chosenAction === "aggressive" ? <span>Bonus per Martial level</span> : null}
            </div>
        </div>)
}