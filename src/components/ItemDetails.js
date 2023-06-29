import React from 'react';
import { useLocation } from 'react-router-dom'
import PayForm from "../components/PayForm";
import Sample from '../images/sample.png';
import { items } from "../functions/itemsData";

const ItemDetails = (props) => {
const location = useLocation()

  return (
    <div className='itemDetailContainer'>
      <div className='itemsDetails'>
        <div className='itemsDetails_ch1'>
            <img className='preview' src={items[location?.state]?.img} /> 
        </div>
        <div className='itemsDetails_ch2'>
            <p>{items[location?.state].name}</p>
            <p> <span>Composer:</span>  {items[location?.state].composer}</p>
            <p> <span>Description:</span>  {items[location?.state].description}</p>
            <p><span>Pages: </span>  {items[location?.state].pages}</p>
            <p><span>Instrument/s: </span>  {items[location?.state].instruments}</p>
        </div>
      </div>

      <div className='PayFormContainer'>
        <PayForm 
          title={items[location?.state].name}
          amount={items[location?.state].priceUSD}
          message={items[location?.state].description}
          id={location?.state}
        />
      </div>
        
 
    </div>
  )
}

export default ItemDetails