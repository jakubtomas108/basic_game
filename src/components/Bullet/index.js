import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { number, func, string, object } from "prop-types";

import { moveObject } from "../../lib/moveObject";
import { DIRECTIONS } from "../../constants";

const Container = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: ${({ posX }) => `${posX * 40}px`};
    top: ${({ posY }) => `${posY * 40}px`};
`;

const BulletSprite = styled.div`
    width: 10px;
    height: 10px;
    background: yellow;
`;

const Bullet = ({ startX, startY, dir, bulletCollided, index, map }) => {
    const [bulletPosition, setBulletPosition] = useState([startX, startY]);
    const [direction] = useState(dir);

    useEffect(() => {
        moveBullet();
    }, [bulletPosition]);

    const detectCollisionAndMoveBullet = () => {
        const args = [
            bulletPosition,
            map.walls,
            map.dimensions,
            setBulletPosition,
            null,
            bulletCollided,
            index
        ];

        direction === DIRECTIONS.UP && moveObject(DIRECTIONS.UP, ...args);
        direction === DIRECTIONS.DOWN && moveObject(DIRECTIONS.DOWN, ...args);
        direction === DIRECTIONS.RIGHT && moveObject(DIRECTIONS.RIGHT, ...args);
        direction === DIRECTIONS.LEFT && moveObject(DIRECTIONS.LEFT, ...args);
    };

    const moveBullet = () => {
        const shot = setTimeout(() => {
            detectCollisionAndMoveBullet();
            clearTimeout(shot);
        }, 50);
    };

    return (
        <Container posX={bulletPosition[0]} posY={bulletPosition[1]}>
            <BulletSprite />
        </Container>
    );
};

Bullet.propTypes = {
    startX: number.isRequired,
    startY: number.isRequired,
    dir: string.isRequired,
    bulletCollided: func.isRequired,
    index: number.isRequired,
    map: object.isRequired
};

export default Bullet;
