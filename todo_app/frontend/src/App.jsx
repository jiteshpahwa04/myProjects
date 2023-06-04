import './App.css';
import Navbar from './components/Navbar';
import Tasks from './pages/Tasks';

function App() {
  return (
    <div className='w-100vw flex flex-col justify-center gap-10 p-5'>

        <div>
          <Navbar className="bg-black"/>
        </div>

        <div>
          <Tasks />
        </div>

    </div>
  );
}

export default App;
