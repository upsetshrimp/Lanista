import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { Box } from '@material-ui/core';




export default function StatView({ gladiator, currentBattle, turnCount, brand, gameHistory }) {




    const timeToNextBattle = currentBattle?.turn - turnCount
    return (
        <>

            <Paper>
                < header style={{ textAlign: "center" }}> {gladiator?.name ?? null}</header >
            </Paper>

            <div style={{ display: "flex" , flexGrow: 1, padding: '20px'}}>
                <Paper>
                <h3 style={{ textAlign: "center", marginTop: 0 }}>Game Stats</h3>
                        Brand:&nbsp;{brand}/30<br/>
                        Wins:&nbsp;{gameHistory.wins}<br/>
                        Losses:&nbsp;{gameHistory.losses}<br/>
                        Turn:&nbsp;{turnCount}
                </Paper>
                <Paper elevation='3' s>
                    <h3 style={{ textAlign: "center", marginTop: 0 }}>Stats</h3>
                        Showmanship:&nbsp;{gladiator.showmanship}<br/>
                        Martial:&nbsp;{gladiator.martial}
                </Paper>
                <Paper>
                    <h3 style={{ textAlign: "center", marginTop: 0 }}>Next Battle</h3>
                    <span>Enemy Level: </span>
                    <span>{currentBattle.enemyLvl}</span>
                    <br />
                    <span>
                        Happens in&nbsp;
                    {timeToNextBattle} Turn
                    {timeToNextBattle === 1 ? null : 's'}
                    </span>
                </Paper>
            </div>

        </>
    )
}