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
            open={isOpen !== undefined}
            onClose={close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Training Completed!</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <span>Training your {ability} ability,</span>
                    <br/>
                    {currentXP === 0 ?
                        <span>You have gained a level! You now have {xpToFinish} points left to get to level {level + 1}</span> :
                        <span>You gained 100XP. You now have {currentXP}/{xpToFinish} to get to level {level + 1}</span>}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}