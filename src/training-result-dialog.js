import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import Gladiator from './gladiator';

export default function TrainingResultDialog({ gladiator, ability, isOpen, close }) {
    let level, xpToFinish, currentXP
    if (ability === "martial") {
        level = gladiator.martial
        currentXP = gladiator.martialXP
        xpToFinish = Gladiator.xpPerLevel[level - 1]
    }
    if (ability === "showmanship") {
        level = gladiator.showmanship
        currentXP = gladiator.showmanshipXP
        xpToFinish = Gladiator.xpPerLevel[level - 1]
    }
    return (
        <Dialog
            open={isOpen}
            onClose={close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Training Completed!</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <p>Training your {ability} ability,</p>
                    {currentXP === 0 ?
                        <p>You have gained a level! You now have {xpToFinish} points left to get to level {level + 1}</p> :
                        <p>You gained 100XP. You now have {currentXP}/{xpToFinish} to get to level {level + 1}</p>}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}