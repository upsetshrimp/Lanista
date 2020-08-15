import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';

export default function BattleResultDialog({ battleResult, isOpen, close }) {
    const {didPlayerWin = undefined, stance=undefined, enemyLvl=undefined, brandChange=undefined} = battleResult
    return (
        <Dialog
            open={isOpen}
            onClose={close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">You {didPlayerWin ? "Won" : "Lost"}!</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <p>Fighting a level {enemyLvl} enemy with a {stance} stance,</p>
                    <p>You {brandChange > 0 ? "gained " + brandChange : "lost " + brandChange * -1} brand points.</p>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}