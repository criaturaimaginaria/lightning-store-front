import React, {useEffect, useState} from 'react';
// import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Link, Routes, } from "react-router-dom";
import Home from "./pages/Home";
import Partituras from "./pages/Partituras";
import ItemDetails from "./components/ItemDetails";
import './App.css';
import './styles/Nav.css';
import './styles/Home.css';
import './styles/Catalog.css';
import './styles/ItemDetails.css';
import './styles/PayForm.css';
import click1 from './audios/click1.wav';
import click2 from './audios/click2.wav';
import click3 from './audios/click3.wav';
import click4 from './audios/click4.wav';
import click5 from './audios/click5.wav';
import click6 from './audios/click6.wav';
import click7 from './audios/click7.wav';
import click8 from './audios/click8.wav';

function App() {
  const [effectState, setEffectState] = useState(false);
  const [initialState, setInitialState] = useState();

  let  sounds = [click1, click2,click3,click4,click5,click6,click7,click8];

 const effect = () => {
  setEffectState(!effectState)
  setInitialState(true)
  // console.log(sounds[Math.floor(Math.random()*sounds.length)], "random --- ")
  let randomAudio = sounds[Math.floor(Math.random()*sounds.length)]
  let audio = new Audio(randomAudio)
  audio.play(click2)
 }



  return (
    <div className="App">
      <div className='Nav'>
        <div className='NavLogoContainer'>
            <p onClick={effect}>₿ Partituras</p>
            <div className={`${effectState  ? 'da' : (initialState ? 'dp' : '')}`}></div>
        </div>
        <div className='navLinksContainer'>
         <Link to="/" > 
        Home
        </Link>
        <Link to="/Partituras" > 
        Partituras
        </Link>
        </div>
      </div>

        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/Partituras' exact element={<Partituras />} />
          <Route path='/shop/:id' element={<ItemDetails />}/>
        </Routes>

    </div>
  );
}

export default App;
