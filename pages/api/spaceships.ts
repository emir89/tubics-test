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

  if (numberOfShipsNeeded < numberOfAvailableShips) {
    amountToTakeFrom = numberOfShipsNeeded - spaceshipsCount;
  } else {
    if (numberOfAvailableShips > spaceshipsCount) {
      amountToTakeFrom = numberOfAvailableShips - spaceshipsCount;
    } else {
      amountToTakeFrom = numberOfAvailableShips;
    }
  }

  if (amountToTakeFrom === 0) {
    return getSpaceshipsArmy(
      numberOfShipsNeeded, 
      spaceshipsCount, 
      randomChosenSpaceships, 
      availableSpaceships
    );
  }


  const spaceshipsAmountToBeAdded = Math.floor(Math.random() * (amountToTakeFrom ) + 1);

  if (randomChosenSpaceships[keysToArray[index]]) {
    randomChosenSpaceships[keysToArray[index]] += spaceshipsAmountToBeAdded;
  } else {
    randomChosenSpaceships[keysToArray[index]] = spaceshipsAmountToBeAdded;
  }

  spaceshipsCount += spaceshipsAmountToBeAdded;

  if (spaceshipsCount !== numberOfShipsNeeded) {
    return getSpaceshipsArmy(
      numberOfShipsNeeded, 
      spaceshipsCount, 
      randomChosenSpaceships, 
      availableSpaceships
    );
  } else {
    return randomChosenSpaceships;
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {numberOfShips} = req.query;

    let spaceshipsCount = 0;
    let randomChosenSpaceships: any = {};
    let availableSpaceships: any = {
      "Millennium Falcon": 5000,
      "X-Wing": 5000,
      "TIE Fighter": 5000,
      "Executor": 5000
    }

    let sumOfShipsAvailable = 0;

    for (let s in availableSpaceships) {
      sumOfShipsAvailable += availableSpaceships[s];
    }

    if (Number(numberOfShips) > sumOfShipsAvailable) { 
      res.send({error: 'Not enough ships available'}); 
    } else {
      try {
        const result = getSpaceshipsArmy(
          Number(numberOfShips), 
          spaceshipsCount, 
          randomChosenSpaceships, 
          availableSpaceships
        );
        res.send(result);
      } catch (error) {
        res.send({error: (error as Error).message});
      }
    }
}
