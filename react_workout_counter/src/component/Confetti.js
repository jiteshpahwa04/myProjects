import React from "react";
import ReactConfetti from 'react-confetti';
import { useEffect, useState } from 'react';

function Confetti(){

    const [winDimension, setWinDimension] = useState({width: window.innerWidth, height: window.innerHeight});

    return (
        <div>   
            <ReactConfetti 
                width={winDimension.width}
                height={winDimension.height}
                numberOfPieces={2000}
                recycle={false}
                tweenDuration={20000}
            />
        </div>
    );
}

export default Confetti;