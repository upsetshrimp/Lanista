import React from 'react';
import { Grid, Paper } from '@material-ui/core';

<<<<<<< HEAD
export default function StatView({ gladiator, currentBattle, turnCount, brand, gameHistory, isInBattle }) {
=======
export default function StatView({ gladiator, currentBattle, turnCount, brand, gameHistory }) {

>>>>>>> ffb99e4d3e60e01cde89b39ce63e6aba29787297
    const timeToNextBattle = currentBattle?.turn - turnCount
    const gridItemSize = isInBattle ? 6 : 4
    return (
        <>
            <Paper>
                <h1> Brand:&nbsp;{brand}/30 </h1>
            </Paper>

            <br />
            <Grid container spacing={gridItemSize}>
                <Grid item xs={4}><Paper style={{ padding: '10px' }}>
                    <h3 style={{ textAlign: "center", marginTop: 0 }}>Game Stats</h3>
                        Wins:&nbsp;{gameHistory.wins}<br />
                        Losses:&nbsp;{gameHistory.losses}<br />
                        Turn:&nbsp;{turnCount}
                </Paper></Grid>
                <Grid item xs={gridItemSize}><Paper elevation={3} style={{ padding: '10px' }}>
                    <h3 style={{ textAlign: "center", marginTop: 0 }}>Gladiator Level</h3>
                        Showmanship:&nbsp;{gladiator.showmanship}<br />
                        Martial:&nbsp;{gladiator.martial}
                </Paper></Grid>
                <Grid item xs={4} style={{display: isInBattle? 'none' : 'inherit'}}> <Paper style={{ padding: '10px' }}>
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