import { useState } from "react";
import Confetti from "./Confetti";

function Card({id, name, count, UpdateCnt}){

    const [val, setVal] = useState(count);

    function ChangeCnt(id, diff){
        console.log("I am here :)");
        if(val+diff >= 0){
            const newVal = val+diff;
            setVal(newVal);
            UpdateCnt(id, diff);
        }
    }

    if (val!==0 && val% 10===0) {
        return (
            <div>
                <div className='card'>

                    <div className='workout-name'>
                        {name}:
                    </div>

                    <div className='Counter'>
                        <div onClick={() => ChangeCnt(id,1)} className="Inc">
                            <i className="fa-solid fa-plus"></i>
                        </div>

                        <div className='ShowVal'>{val}</div>

                        <div onClick={() => ChangeCnt(id,-1)} className="Dec">
                            <i className="fa-solid fa-minus"></i>
                        </div>
                    </div>


                </div>
                <Confetti></Confetti>

            </div>
        );
    }

    return (
        <div className='card'>

            <div className='workout-name'>
                {name}:
            </div>

            <div className='Counter'>
                <div onClick={() => ChangeCnt(id,1)} className="Inc">
                    <i className="fa-solid fa-plus"></i>
                </div>

                <div className='ShowVal'>{val}</div>

                <div onClick={() => ChangeCnt(id,-1)} className="Dec">
                    <i className="fa-solid fa-minus"></i>
                </div>
            </div>

        </div>
    );

}

export default Card;