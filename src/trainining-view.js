import React from 'react';
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
                justify="center"
                spacing={2}
            >
                <Grid item xs={12}><h2 style={{ textAlign: 'center' }}>Training</h2></Grid>


                <Grid item xs={4}><Paper
                    elevation={3}
                    style={{ textAlign: 'center', padding: '5px' }}>
                    Points to next Showmanship level: {currentShowmanshipPoints}/{pointsToNextShowmanship}
                </Paper></Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={4}><Paper
                    elevation={3}
                    style={{ textAlign: 'center', padding: '5px' }}>
                    Points to next Martial level: {currentMartialPoints}/{pointsToNextMartial}
                </Paper></Grid>
                <Grid container item xs={6} alignItems="center" spacing={1} direction='column'>

                    {gladiator.showmanship < Gladiator.maxLevel ? <Button
                        variant={chosenAction === 'showmanship' ? "contained" : "outlined"}
                        color={"primary"}
                        onClick={() => {
                            const nextTrain = chosenAction === 'showmanship' ? undefined : 'showmanship'
                            chooseAction(nextTrain)
                        }}>
                        {"Train For Level " + (gladiator?.showmanship + 1)}
                    </Button>
                        :
                        <Button
                            variant={"contained"}
                            color={"secondary"}
                        >
                            Showmanship level 10 - Maximum
                    </Button>}
                </Grid>
                <Grid container item xs={6} alignItems="center" spacing={1} direction='column'>
                    {gladiator.martial < Gladiator.maxLevel ? <Button
                        variant={chosenAction === 'martial' ? "contained" : "outlined"}
                        color={"primary"}
                        onClick={() => {
                            const nextTrain = chosenAction === 'martial' ? undefined : 'martial'
                            chooseAction(nextTrain)
                        }}>
                        {"Train For Level " + (gladiator?.martial + 1)}
                    </Button> :
                        <Button
                            variant={"contained"}
                            color={"secondary"}
                        >
                            Martial level 10 - Maximum
                    </Button>}
                </Grid>
            </Grid>
        </div >
    )
}
