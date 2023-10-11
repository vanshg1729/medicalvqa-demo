import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppStateProvider } from "./AppState";

import Homepage from "./components/homepage";
import Modulepage from './components/modulepage';
 

const App = () => {
  return (
    <div className="App">
    <AppStateProvider>
      {/* <ResponsiveAppBar></ResponsiveAppBar> */}
      <Routes>  
        <Route path="/medical-vqa/module" element={<Homepage />}></Route> {/* it is reverse in our case */}
        <Route path="/medical-vqa" element={<Modulepage />}></Route>
      </Routes>
    </AppStateProvider>


    </div>
  );
};

export default App;
