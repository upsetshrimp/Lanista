import React from 'react';
import { Paper, Box } from '@material-ui/core';


export default function VictoryPage({ turnCount, brand, wins, losses }) {
    return (
        <Box
        width = {1}>
            <h1>Victory!    In {turnCount} turns </h1>
                    <Paper 
                    style={{ width: "60%", textAlign: "center" }}
                    elevation = {6}>
                        Brand: {brand} <br />
                Wins: {wins} <br />
                Losses: {losses} <br />
                    </Paper>
        </Box>
    )
}