import { Box, Typography } from "@mui/material"
import React from "react";

export interface ISpaceship {
    name: string;
    numberOfShips: number;
    icon: React.ReactNode;
}

const Spaceship = ({ name, numberOfShips, icon }: ISpaceship) => {
  return (
    <Box display="flex" justifyContent="column">
        <Typography variant="h3">{name}</Typography>
        <p>{numberOfShips}</p>
        <div>{icon}</div>
    </Box>
  )
}

export default Spaceship;