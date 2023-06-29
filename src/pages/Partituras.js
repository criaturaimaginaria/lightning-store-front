import React from 'react'
import PayForm from "../components/PayForm";
import Catalog from "../components/Catalog";

import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

// import Home from "./pages/Home";

const Partituras = () => {
  return (
    <div className='catalogContainer'>
      <Catalog />
    </div>
   
  )
}

export default Partituras
