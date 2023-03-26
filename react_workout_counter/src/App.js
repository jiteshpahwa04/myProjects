import './App.css';
import { useState } from 'react';
import Workouts from './component/Workouts';
import Data from './Data';

function App() {

  const [data, setData] = useState(Data);

  function UpdateCnt(id, val){
    console.log("I am here :)");
    var newData = [...data];
    var index = newData.findIndex( (x) => x.id===id );
    console.log("The index to be updated is: ", index);
    newData[index].count += val;
    console.log("Updated value is: ", newData[index].count);
    setData(newData);
  }

  return (
    <div className='wrapper'>
      <h1 className='title'>Workouts ?</h1>
      <Workouts data={data} UpdateCnt={UpdateCnt}></Workouts>
    </div>
  );
}

export default App;
