import { Button } from '@mui/material';
import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import UserInput from './Components/UserInput/UserInput';
import { showNotification } from './Notification';

function App() {
  const [enterApp, setenterApp] = useState(false)
  const [showHome, setshowHome] = useState(true)

  const handleClickMe = () => {
    setshowHome(false)
    setenterApp(true);
    showNotification("Success", "success", "1000")
  }

  return (
    <div className="App">
      <Navbar/>
      
      {
        showHome && 
        <div id='home'>
        <h1> Click here to Enter App </h1>
        <Button variant='contained' onClick={handleClickMe}> Click Me.! </Button>
      </div>
      }

      {
        enterApp && <UserInput/>
      }


    </div>
  );
}

export default App;
