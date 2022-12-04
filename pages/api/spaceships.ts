// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

function getSpaceshipsArmy(
  numberOfShipsNeeded: number, 
  spaceshipsCount: number, 
  randomChosenSpaceships: any,
  availableSpaceships: any
  ): any {
  const keysToArray = Object.keys(availableSpaceships);
  const index = Math.floor(Math.random() * keysToArray.length);
  const numberOfAvailableShips = availableSpaceships[keysToArray[index]];
  
  let amountToTakeFrom;

  if (numberOfShipsNeeded <= numberOfAvailableShips) {
    amountToTakeFrom = numberOfShipsNeeded - spaceshipsCount;
  } else {
    amountToTakeFrom = (numberOfAvailableShips - spaceshipsCount) + (numberOfShipsNeeded - numberOfAvailableShips);
  }

  if (amountToTakeFrom === 0) return randomChosenSpaceships;

  const spaceshipsAmountToBeAdded = Math.floor(Math.random() * (amountToTakeFrom ) + 1);

  if (randomChosenSpaceships[keysToArray[index]]) {
    randomChosenSpaceships[keysToArray[index]] += spaceshipsAmountToBeAdded;
  } else {
    randomChosenSpaceships[keysToArray[index]] = spaceshipsAmountToBeAdded;
  }
  availableSpaceships[keysToArray[index]] = numberOfAvailableShips - spaceshipsAmountToBeAdded;

  spaceshipsCount += spaceshipsAmountToBeAdded;

  return getSpaceshipsArmy(
    numberOfShipsNeeded, 
    spaceshipsCount, 
    randomChosenSpaceships, 
    availableSpaceships
  );
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {numberOfShips} = req.query as {numberOfShips: string};

    if (/[A-Za-z]/.test(numberOfShips)) return res.status(400).json({error: 'Bad request. Only numbers are allowed.'});

    let spaceshipsCount = 0;
    let randomChosenSpaceships: any = {};
    let availableSpaceships: any = {
      "Millennium Falcon": 1000,
      "X-Wing": 1000,
      "TIE Fighter": 1000,
      "Executor": 1000
    }

    let sumOfShipsAvailable = 0;

    for (let s in availableSpaceships) {
      sumOfShipsAvailable += availableSpaceships[s];
    }

    if (Number(numberOfShips) > sumOfShipsAvailable) { 
      res.status(200).json({error: 'Not enough ships available'}); 
    } else {
      try {
        const result = getSpaceshipsArmy(
          Number(numberOfShips), 
          spaceshipsCount, 
          randomChosenSpaceships, 
          availableSpaceships
        );
        res.status(200).json(result);
      } catch (error) {
        res.status(200).json({error: (error as Error).message});
      }
    }
}
