import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { items } from "../functions/itemsData";

const Catalog = () => {
  const catalog = items

  return (
    <div>
        <div>
          Catalog
        </div>
        
        <div className='itemsContainer'>
          {catalog.map((items, key) => (
            <Link className='item' key={key} to={`/shop/${key}`} state={items.id.toString()}> 
              <div className='itemContent'>
                <p>{items.name} </p>
                <p> <span>{items.composer} </span></p>
              </div>
              <div className='detail'>
                <div className='detailChild'></div>
              </div>
            </Link>  
          ))}
        </div>

    </div>
  )
}

export default Catalog