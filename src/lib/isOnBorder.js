import { DIRECTIONS } from "../constants/index";

export const isOnBorder = (direction, data, dimension) => {
    if (direction === DIRECTIONS.UP) return data[1] - 1 > -1;
    if (direction === DIRECTIONS.DOWN) return data[1] + 1 < dimension[1];
    if (direction === DIRECTIONS.RIGHT) return data[0] + 1 < dimension[0];
    if (direction === DIRECTIONS.LEFT) return data[0] - 1 > -1;
};
