import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';



export default function Train({ gladiator, train }) {
    const levels = [1, 2, 3, 4, 5]
 
    
    return (
        <div style={{ display: "block" }}>
            <div className="ShowmanShip">
                {
                    levels.map((level, index) =>
                        (<Button
                            variant="outlined"
                            color={gladiator?.showmanship < level ? "primary" : "secondary"} ////FUTURE US PROBLEM NOT WORKING
                            key={index}
                            disabled={gladiator?.showmanship + 1 < level}
                            onClick={
                                () => {
                                    if (gladiator?.showmanship < level)
                                        train("showmanship")
                                }}>
                            {"Showmanship " + level}
                        </Button>)
                    )}
            </div>
            <div className="Martial">
                {
                    levels.map((level, index) =>
                        (<Button
                            variant="outlined"
                            color={gladiator?.martial < level ? "primary" : "secondary"} ////FUTURE US PROBLEM NOT WORKING
                            key={index}
                            disabled={gladiator?.martial + 1 < level}
                            onClick={
                                () => {
                                    if (gladiator?.martial < level)
                                        train("martial")
                                }}>
                            {"Martial " + level}
                        </Button>)
                    )}
            </div>
        </div>
    )
}
