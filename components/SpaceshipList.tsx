import React from 'react';
import { Grid } from '@mui/material';
import Spaceship, {ISpaceship} from './Spaceship';

interface SpaceshipListProps {
    spaceshipList: ISpaceship[];
}

const SpaceshipList = ({spaceshipList}: SpaceshipListProps) => {
    console.log('spaceshipList', spaceshipList);

  return (
    <Grid sx={{
            display: 'flex',  
            flexWrap: {xs: "nowrap", md: "wrap"},
            gap: {xs: "1.2rem", md: "2rem"},
            overflowX: "auto",
        }}>
        {spaceshipList.map((spaceship: ISpaceship) => (
            <Spaceship key={spaceship.name} {...spaceship} />
        ))}
    </Grid>
  )
}

export default SpaceshipList;