import React from "react";
import styled from "styled-components";

import Map from "../Map";

const GameWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const Game = () => {
    return (
        <GameWrapper>
            <Map />
        </GameWrapper>
    );
};

export default Game;
