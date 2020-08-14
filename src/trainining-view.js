import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';



export default function TrainingView({ gladiator, chosenAction, chooseAction }) {
    const levels = [1, 2, 3, 4, 5]
    const xpPerLevel = [100, 200, 200, 400]

    const pointsToNextShowmanship = xpPerLevel[gladiator.showmanship - 1]
    const currentShowmanshipPoints = gladiator.showmanshipXP + (chosenAction === 'showmanship' ? 100 : 0)

    const pointsToNextMartial = xpPerLevel[gladiator.martial - 1]
    const currentMartialPoints = gladiator.martialXP + (chosenAction === 'martial' ? 100 : 0)

    return (
        <div style={{ display: "block" }}>
            <div className="ShowmanShip">
                <p>Points to next level: {currentShowmanshipPoints}/{pointsToNextShowmanship}</p>
                {
                    levels.map((level, index) =>
                        (<Button
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
                        </Button>)
                    )}
            </div>
            <div className="Martial">
                <p>Points to next level: {currentMartialPoints}/{pointsToNextMartial}</p>
                {
                    levels.map((level, index) =>
                        (<Button
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
                        </Button>)
                    )}
            </div>
        </div>
    )
}
