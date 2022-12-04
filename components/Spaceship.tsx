import { Box, Typography } from "@mui/material"
import React from "react";

export interface ISpaceship {
    name: string;
    numberOfShips: number;
    icon?: React.ReactNode;
}

const Spaceship = ({ name, numberOfShips, icon }: ISpaceship) => {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center"
      sx={{
        minWidth: {xs: '65%', md: 'auto'}, 
        width: {xs: '100%', md: 'auto'},
        border: '1px solid #fff',
        borderRadius: '1rem',
        padding: '1rem',
        fontWeight: 'bold',
      }}
    >
      <p>{name}</p>
      <p>{numberOfShips}</p>
      <div>{icon && icon}</div>
    </Box>
  )
}

export default Spaceship;