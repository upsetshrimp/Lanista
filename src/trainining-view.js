import React, { useEffect, useState } from 'react';
import { Grid, Button, Paper } from '@material-ui/core';
import Gladiator from './gladiator';



export default function TrainingView({ gladiator, chosenAction, chooseAction }) {

    const pointsToNextShowmanship = Gladiator.xpPerLevel[gladiator.showmanship - 1]
    const currentShowmanshipPoints = gladiator.showmanshipXP + (chosenAction === 'showmanship' ? 100 : 0)

    const pointsToNextMartial = Gladiator.xpPerLevel[gladiator.martial - 1]
    const currentMartialPoints = gladiator.martialXP + (chosenAction === 'martial' ? 100 : 0)

    return (
        <div>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="stretch"
            >
                <Grid item xs={6}><h2>Showmanship</h2></Grid>
                <Grid item xs={6}><h2>Martial</h2></Grid>

                <Grid item xs={6}><Paper variant="outlined">Points to next level: {currentShowmanshipPoints}/{pointsToNextShowmanship}</Paper></Grid>
                <Grid item xs={6}><Paper variant="outlined">Points to next level: {currentMartialPoints}/{pointsToNextMartial}</Paper></Grid>
                <Grid container item xs={6} alignItems="center" spacing={1} direction='column'>

                    <Button
                        variant={chosenAction === 'showmanship' ? "contained" : "outlined"}
                        color={"primary"}
                        onClick={() => {
                            const nextTrain = chosenAction === 'showmanship' ? undefined : 'showmanship'
                            chooseAction(nextTrain)
                        }}>
                        {"Train For Level " + (gladiator?.showmanship + 1)}
                    </Button>
                </Grid>
                <Grid container item xs={6} alignItems="center" spacing={1} direction='column'>
                    <Button
                        variant={chosenAction === 'martial' ? "contained" : "outlined"}
                        color={"primary"}
                        onClick={() => {
                            const nextTrain = chosenAction === 'martial' ? undefined : 'martial'
                            chooseAction(nextTrain)
                        }}>
                        {"Train For Level " + (gladiator?.martial + 1)}
                    </Button>
                </Grid>
            </Grid>
        </div >
    )
}
