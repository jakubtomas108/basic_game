import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { DIRECTIONS } from "../../constants";
import { moveObject } from "../../lib/moveObject";

import Bullet from "../Bullet";

const PlayerSprite = styled.div`
    transition: all 0.3s linear;
    width: 40px;
    height: 40px;
    background: blue;
    position: absolute;
    left: ${({ position }) => `${position[0] * 40}px`};
    top: ${({ position }) => `${position[1] * 40}px`};
    box-sizing: border-box;
    border-top: ${({ direction }) => direction === "UP" && "4px solid red"};
    border-right: ${({ direction }) =>
        direction === "RIGHT" && "4px solid red"};
    border-bottom: ${({ direction }) =>
        direction === "DOWN" && "4px solid red"};
    border-left: ${({ direction }) => direction === "LEFT" && "4px solid red"};
    z-index: 1;
`;

const Player = ({ map }) => {
    const [positionInMatrix, setPosInMatrix] = useState(map.spawnPlace);
    const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
    const [bullets, setBullets] = useState([]);

    const posInMtrxRef = useRef(positionInMatrix);
    const canMove = useRef(true);
    const keyMapper = useRef({});
    const shooting = useRef(false);

    useEffect(() => {
        document.addEventListener("keydown", event => recognizeEvent(event));
        document.addEventListener("keyup", event => recognizeEvent(event));

        return () => {
            document.removeEventListener("keydown", recognizeEvent);
            document.removeEventListener("keyup", recognizeEvent);
        };
    }, []);

    useEffect(() => {
        posInMtrxRef.current = positionInMatrix;
    }, [positionInMatrix]);

    const validKeyPressed = key => {
        const validKeys = ["KeyW", "KeyD", "KeyS", "KeyA", "Space"];

        return validKeys.some(valKey => valKey === key);
    };

    const isMovementKeyPressed = () => {
        const { KeyW, KeyD, KeyS, KeyA } = keyMapper.current;

        if (KeyW || KeyD || KeyS || KeyA) return true;
    };

    const isOneDirectionKeyPressed = () => {
        return (
            Object.values(keyMapper.current).filter(keyPress => keyPress)
                .length < 4
        );
    };

    const detectCollisionAndMove = () => {
        const args = [
            posInMtrxRef.current,
            map.walls,
            map.dimensions,
            setPosInMatrix,
            setDirection
        ];

        if (isOneDirectionKeyPressed()) {
            keyMapper.current.KeyW && moveObject(DIRECTIONS.UP, ...args);
            keyMapper.current.KeyS && moveObject(DIRECTIONS.DOWN, ...args);
            keyMapper.current.KeyD && moveObject(DIRECTIONS.RIGHT, ...args);
            keyMapper.current.KeyA && moveObject(DIRECTIONS.LEFT, ...args);
        }
    };

    const performMove = () => {
        if (canMove.current) {
            canMove.current = false;
            detectCollisionAndMove();

            const timeout = setTimeout(() => {
                canMove.current = true;
                clearTimeout(timeout);
            }, 300);
        }
    };

    const bulletCollided = index =>
        setBullets(prevState =>
            prevState.filter(bullet => bullet[2] !== index)
        );

    const triggerShot = () => {
        const { current } = posInMtrxRef;

        if (!shooting.current) {
            shooting.current = true;
            setBullets(prevState => [
                ...prevState,
                [current[0], current[1], prevState.length + 1 * Math.random()]
            ]);

            const timeout = setTimeout(() => {
                shooting.current = false;
                clearTimeout(timeout);
            }, 300);
        }
    };

    const recognizeEvent = event => {
        const { code, type } = event;

        if (validKeyPressed(code) || code === "shootAndMove") {
            event.preventDefault();

            if (type === "keydown") {
                keyMapper.current = { ...keyMapper.current, [code]: true };

                code === "shootAndMove" && performMove();
                isMovementKeyPressed() && performMove();
                keyMapper.current.Space && triggerShot();
            } else {
                keyMapper.current = { ...keyMapper.current, [code]: false };

                if (isMovementKeyPressed() && !keyMapper.current.Space) {
                    const newEvent = new KeyboardEvent("keydown", {
                        code: "shootAndMove"
                    });

                    setInterval(() => document.dispatchEvent(newEvent), 100);
                }
            }
        }
    };

    return (
        <div>
            <PlayerSprite position={positionInMatrix} direction={direction} />
            {bullets.map(bullet => (
                <Bullet
                    key={bullet[2]}
                    startX={bullet[0]}
                    startY={bullet[1]}
                    index={bullet[2]}
                    dir={direction}
                    bulletCollided={bulletCollided}
                    map={map}
                />
            ))}
        </div>
    );
};

export default Player;
