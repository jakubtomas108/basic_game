import { DIRECTIONS } from "../constants";
import { isOnBorder } from "./isOnBorder";

export const moveObject = (
    direction,
    position,
    walls,
    dimensions,
    setState,
    setDirection,
    bulletCollided,
    index
) => {
    const nextPlaces = {
        [DIRECTIONS.UP]: `${position[0]}x${position[1] - 1}`,
        [DIRECTIONS.DOWN]: `${position[0]}x${position[1] + 1}`,
        [DIRECTIONS.RIGHT]: `${position[0] + 1}x${position[1]}`,
        [DIRECTIONS.LEFT]: `${position[0] - 1}x${position[1]}`
    };

    const nextState = prevState => ({
        [DIRECTIONS.UP]: [prevState[0], prevState[1] - 1],
        [DIRECTIONS.DOWN]: [prevState[0], prevState[1] + 1],
        [DIRECTIONS.RIGHT]: [prevState[0] + 1, prevState[1]],
        [DIRECTIONS.LEFT]: [prevState[0] - 1, prevState[1]]
    });

    setDirection && setDirection(direction);
    const nextPlace = nextPlaces[direction];

    if (!walls[nextPlace] && isOnBorder(direction, position, dimensions)) {
        setState(prevState => nextState(prevState)[direction]);
    } else {
        bulletCollided && index && bulletCollided(index);
    }
};
