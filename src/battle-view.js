import React from 'react';
import Button from '@material-ui/core/Button';
import {Grid} from '@material-ui/core'
import Battle from './Battle';

export default function BattleView({ gladiator, currentBattle, chosenAction, chooseAction }) {
    const victoryChance = Battle.playerVictoryChance(gladiator.martial, currentBattle.enemyLvl, chosenAction === "aggressive", gladiator.martial)

    const brandGainUponVictory = Battle.getBrandChange(true, currentBattle.enemyLvl, gladiator, chosenAction === "spectaculum", 0)
    const brandGainUponDefeat = Battle.getBrandChange(false, currentBattle.enemyLvl, gladiator, chosenAction === "spectaculum", 0)
    
   
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
                <div>Victory Chance: {victoryChance}%</div>
                <div>Expected Brand Gain Upon Victory
                    <span className="specialSymbols"> ≅ {brandGainUponVictory < 0 ? "-" : null}</span>
                    {Math.abs(brandGainUponVictory)}</div>
                <div>Expected Brand {brandGainUponDefeat < 0 ? 
                <span style={{color:'red'}}>loss</span>:
                <span style={{color:'green'}}>gain</span>} Upon Defeat
                <span className="specialSymbols"> ≅ </span>
                    {Math.abs(brandGainUponDefeat)}</div>
                {chosenAction === "spectaculum" ? <span>Bonus per Showmanship level</span> : null}
                {chosenAction === "aggressive" ? <span>Bonus per Martial level</span> : null}
            </div>
        </div>)
}