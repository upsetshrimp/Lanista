import React from 'react';
import { Grid, Button, Paper } from '@material-ui/core';



export default function TrainingView({ gladiator, chosenAction, chooseAction }) {
    const levels = [1, 2, 3, 4, 5]
    const xpPerLevel = [100, 200, 200, 400]

    const pointsToNextShowmanship = xpPerLevel[gladiator.showmanship - 1]
    const currentShowmanshipPoints = gladiator.showmanshipXP + (chosenAction === 'showmanship' ? 100 : 0)

    const pointsToNextMartial = xpPerLevel[gladiator.martial - 1]
    const currentMartialPoints = gladiator.martialXP + (chosenAction === 'martial' ? 100 : 0)

    return (
        <div>
            <Grid
                container
                direction="row"
                justify="center"
                spacing={2}
            >
                <Grid item xs={6}><h2 style={{textAlign: 'center'}}>Showmanship</h2></Grid>
                <Grid item xs={6}><h2 style={{textAlign: 'center'}}>Martial</h2></Grid>

                <Grid item xs={6}><Paper elevation={3} style={{textAlign: 'center'}}>Points to next level: {currentShowmanshipPoints}/{pointsToNextShowmanship}</Paper></Grid>
                <Grid item xs={6}><Paper elevation={3} style={{textAlign: 'center'}}>Points to next level: {currentMartialPoints}/{pointsToNextMartial}</Paper></Grid>
                <Grid container item xs={6} alignItems="center" spacing={1} direction='column'>

                    {
                        levels.map((level, index) =>
                            (<Grid item xs={6} key={index}>
                                <Button
                                    variant={
                                        gladiator?.showmanship + 1 === level &&
                                            chosenAction === 'showmanship' ? "contained" : "outlined"}
                                    color={gladiator?.showmanship < level ? "primary" : "secondary"}
                                    key={index}
                                    disabled={gladiator?.showmanship + 1 < level}
                                    onClick={() => {
                                        if (gladiator?.showmanship < level) {
                                            const nextTrain = chosenAction === 'showmanship' ? undefined : 'showmanship'
                                            chooseAction(nextTrain)
                                        }
                                    }}>
                                    {"Showmanship " + level}
                                </Button></Grid>)
                        )}
                </Grid>
                <Grid container item xs={6} alignItems="center" spacing={1} direction='column'>

                    {
                        levels.map((level, index) =>
                            (<Grid item xs={6} key={index}>
                                <Button
                                    variant={
                                        gladiator?.martial + 1 === level &&
                                            chosenAction === 'martial' ? "contained" : "outlined"}
                                    color={gladiator?.martial < level ? "primary" : "secondary"}
                                    key={index}
                                    disabled={gladiator?.martial + 1 < level}
                                    onClick={() => {
                                        if (gladiator?.martial < level) {
                                            const nextTrain = chosenAction === 'martial' ? undefined : 'martial'
                                            chooseAction(nextTrain)
                                        }
                                    }}>
                                    {"martial " + level}
                                </Button></Grid>)
                        )}
                </Grid>
            </Grid>
        </div >
    )
}
