import { Box } from "@mui/material"
import React from "react";

export interface ISpaceship {
    name: string;
    numberOfShips: number;
}

const Ship = ({ name, numberOfShips }: ISpaceship) => {
  return (
    <Box>
        <p>{name}</p>
    </Box>
  )
}

export default Ship;