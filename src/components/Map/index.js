import React from "react";
import styled from "styled-components";

import Player from "../Player";

const MapTile = styled.div`
    background: cadetblue;
    border: 1px solid black;
    width: ${({ dimensions }) => `${dimensions[0]}` * 40}px;
    height: ${({ dimensions }) => `${dimensions[1]}` * 40}px;
    position: absolute;
`;

const Brick = styled.div`
    width: 40px;
    height: 40px;
    background: red;
    position: absolute;
    left: ${({ position }) => `${position[0] * 40}px`};
    top: ${({ position }) => `${position[1] * 40}px`};
    z-index: 1;
    box-sizing: border-box;
    border: 3px solid;
`;

const map = {
    dimensions: [15, 15],
    walls: {
        "2x3": 1,
        "2x4": 1,
        "8x7": 1,
        "4x12": 1,
        "10x2": 1,
        "11x2": 1,
        "12x2": 1
    },
    spawnPlace: [10, 7]
};

const Map = () => {
    return (
        <MapTile dimensions={map.dimensions}>
            <Player map={map} />
            {Object.keys(map.walls).map(wall => {
                const wallPosition = wall.split("x");

                return (
                    <Brick
                        key={wall}
                        position={[wallPosition[0], wallPosition[1]]}
                    />
                );
            })}
        </MapTile>
    );
};

export default Map;
