import React, {useEffect, useState, useRef } from 'react';
import YB from '../images/YTlogo.png';
import gitHub from '../images/gitHub.png';
import IG from '../images/IG.png';
import mainMusic from '../audios/MainMusic.mp3';

const Home = () => {

  const refere = useRef();

  const mute = () => {
      return refere.mute = true
      //  return console.log(refere.mute, "fa")
  }

  const social = [
    {
     url:'https://www.youtube.com/channel/UCSJQMZALjc4pqR5FTnsn8TA',
     img: YB,
    },
    {
      url:'https://www.instagram.com/criaturaimaginaria/',
      img: IG,
     },
     {
      url:'https://github.com/criaturaimaginaria',
      img: gitHub,
     },
  ]
  return (
    <div>
        <div className='TitleMain'>
          <svg viewBox="-550 0 1280 200">
            {/* <text  x="-10%" y="50%">₿ Partituras</text> */}
          </svg>
        </div>


       {/* <div className='FloatingMute'>
          <div className='timeHide2'></div>
          <div className='timeHide'></div>
         <div className='AudioPlayerContainer'>
           <audio ref={refere} src={mainMusic}  controls autoPlay/>
        </div>
       </div> */}
       
      <audio ref={refere} src={mainMusic}  autoPlay/>

      <div className='partituraContainer'>
        <div className='partituraContent1'>
   
        </div>
        <div className='partituraContent2'>
          <div className='partituraContent2_text'>
              <div className="title">
                <span>₿ Partituras</span>
              </div>
              
              <p> Welcome to my store!𝆕 </p>
              <div className='pageDescription'>
                  <span>Here you will mainly find scores for mandolin  
                    and other arrangements and compositions made by me (♫),
                    and you can pay for all of them 
                    with <span style={{color: '#e3ad31', display:'inline-block'}}> ₿</span>itcoin! 
                </span>
              </div>

              <div className='socialMedia'>
                  {social.map((items, key) => (
                      <div key={key}>
                          <a href={items.url} target="_BLANK">
                            <img className='socialLogos' src={items.img} /> 
                          </a>
                      </div>
                  ))}
              </div>
          </div>

          <div className='partituraContent2_img'></div>
          
        </div>
      </div>
          
    </div>
  )
}

export default Home
