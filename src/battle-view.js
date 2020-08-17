import React from 'react';
import Button from '@material-ui/core/Button';
import {Grid} from '@material-ui/core'

export default function BattleView({ gladiator, currentBattle, chosenAction, chooseAction }) {
    const victoryChance = 55 + (gladiator.martial - currentBattle.enemyLvl) * 10
    let victoryChanceString = "Low"
    if (victoryChance > 40) {
        victoryChanceString = "Medium"
    }
    if (victoryChance > 70) {
        victoryChanceString = "High"
    }
    const brandGainUponVictory = (gladiator.showmanship * 2) + gladiator.martial - 4
    const brandGainUponDefeat = (gladiator.showmanship * 2) + gladiator.martial - 8
    console.log(15, brandGainUponDefeat)
    const expectedBrandGain = ((brandGainUponVictory * victoryChance / 100)
        + (brandGainUponDefeat * (100 - victoryChance) / 100)).toFixed(1)

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Battle!</h1>
            <span>Enemy Level: {currentBattle.enemyLvl}</span>
            <br />
            <span style={{textAlign: 'center'}}>      Choose your Battle Stance!</span>
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
                <div>Expected Brand Gain: ~{expectedBrandGain}</div>
                {chosenAction === "spectaculum" ? <span>Bonus per Showmanship level</span> : null}
                {chosenAction === "aggressive" ? <span>Bonus per Martial level</span> : null}
            </div>
        </div>)
}