import React from 'react';
import { Grid, Paper } from '@material-ui/core';

export default function StatView({ gladiator, currentBattle, turnCount, brand, gameHistory }) {
    const timeToNextBattle = currentBattle?.turn - turnCount
    return (
        <>
            <Paper>
                <h1> {gladiator?.name ?? null} </h1>
            </Paper>
            <br />
            <Grid container spacing={3}>
                <Grid item xs={4}><Paper style={{padding: '10px'}}>
                    <h3 style={{ textAlign: "center", marginTop: 0 }}>Game Stats</h3>
                        Brand:&nbsp;{brand}<br />
                        Wins:&nbsp;{gameHistory.wins}<br />
                        Losses:&nbsp;{gameHistory.losses}<br />
                        Turn:&nbsp;{turnCount}
                </Paper></Grid>
                <Grid item xs={4}><Paper elevation={3} style={{padding: '10px'}}>
                    <h3 style={{ textAlign: "center", marginTop: 0 }}>Gladiator</h3>
                        Showmanship:&nbsp;{gladiator.showmanship}<br />
                        Martial:&nbsp;{gladiator.martial}
                </Paper></Grid>
                <Grid item xs={4}> <Paper style={{padding: '10px'}}>
                    <h3 style={{ textAlign: "center", marginTop: 0 }}>Next Battle</h3>
                    <span>Enemy Level: </span>
                    <span>{currentBattle.enemyLvl}</span>
                    <br />
                    <span>
                        Happens in&nbsp;
                    {timeToNextBattle} Turn
                    {timeToNextBattle === 1 ? null : 's'}
                    </span>
                </Paper></Grid>
            </Grid>

        </>
    )
}