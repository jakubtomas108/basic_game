import React from "react";
import styled from "styled-components";

import Map from "../Map";

const GameWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

// Just as I like it
const Game = () => {
    return (
        <GameWrapper>
            <Map />
        </GameWrapper>
    );
};

export default Game;
