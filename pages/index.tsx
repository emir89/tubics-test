import { useState } from 'react';
import Head from 'next/head';
import {
  Box, 
  Typography, 
  TextField, 
  Grid,
  Button
} from '@mui/material';
import {ISpaceship} from '../components/Spaceship';
import background from '../assets/background.gif';
import Image from 'next/image';
import SpaceshipList from '../components/SpaceshipList';
import { ToastContainer, toast } from 'react-toastify';

export default function SpaceshipsArmy() {
  const [generatedArmy, setGeneratedArmy] = useState<ISpaceship[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [numberOfShipsToGenerate, setNumberOfShipsToGenerate] = useState(0);

  const generateArmy = async () => {
    try {
      let formattedData = []
      setIsLoading(true);
      const response = await fetch(`/api/spaceships?numberOfShips=${numberOfShipsToGenerate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: {[spaceshipName: string]: number} = await response.json();
      setIsLoading(false);

      if (data.error) {
        toast.error(data.error);
        return;
      }
      for (const s in data) {
        formattedData.push({
          name: s,
          numberOfShips: data[s]

        })
      }
      setGeneratedArmy(formattedData);
    } catch (error) {
      setIsLoading(false);
      toast.error('Something went wrong. Please try again.');
    }
  }

  const handleNumberOfShipsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numberOfShips = Number(event.target.value);
    setNumberOfShipsToGenerate(numberOfShips);
  }

  return (
    <>
      <ToastContainer hideProgressBar />
      <Box sx={{position: 'relative', padding: {xs: '0 1.5rem'}}}>
        <Image src={background} alt="Spaceship" fill quality={100} />
        <Head>
          <title>Spaceship Army Generator</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <Grid 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            height="100vh"
            >
            <Box marginTop={{xs: 6, md:20}} zIndex={99} justifyContent="center">
              <Typography variant='h1' fontSize='2rem' sx={{textAlign: {xs: 'center'}}}>Welcome to the spaceship army generator!</Typography>
              <Box sx={{ width: '100%' }} display="flex" flexDirection="column" alignItems="flex-end">
                <form style={{width: '100%'}} onSubmit={(e) => { 
                  e.preventDefault(); 
                  generateArmy(); 
                  }}>
                    <TextField 
                      sx={{marginTop: '2rem'}}
                      fullWidth
                      variant="standard"
                      type="number" 
                      aria-describedby="my-helper-text" 
                      placeholder='Enter the number of ships' 
                      onChange={handleNumberOfShipsChange} 
                    />
                </form>
                <Button  
                  sx={{marginTop: "2rem", position: "relative", right: 0}} 
                  variant="contained" 
                  disabled={isLoading || numberOfShipsToGenerate === 0}
                  onClick={generateArmy}>
                    Generate
                  </Button>
              </Box>
            </Box>
            <Box marginTop={{xs: '15rem', md: '30rem'}} zIndex={99} display="flex" justifyContent="center" sx={{position: 'absolute'}}>
              {isLoading && <Typography variant='h5' fontSize={{xs: '1rem', md: '2rem'}}>Your army is being generated...</Typography>}
            </Box>
            <Box zIndex={99} sx={{marginTop: {xs: '12rem', md: '25rem'}}}>
              {generatedArmy.length > 0 && 
                <Box display="flex" flexDirection="column" gap="1.2rem" alignItems="center">
                  <Typography sx={{position: 'relative', left: 0}} variant='h3' fontSize='2rem'>Generated army</Typography>
                  <SpaceshipList spaceshipList={generatedArmy} />
                </Box>
              }
            </Box>
          </Grid>
        </main>
      </Box>
    </>
  )
}
