import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppStateProvider } from "./AppState";

import Homepage from "./components/homepage";
import Modulepage from './components/modulepage';
import AddContentModal from './components/addContentModal';
import Tags from './components/tags';
import Chat from './components/Chatbot';

const App = () => {

  // const [selectedImage.current, setSelectedImage] = useState("")
  const selectedImage = useRef("");

  return (
    <div className="App">
    <AppStateProvider>
      {/* <ResponsiveAppBar></ResponsiveAppBar> */}
      <Routes>
        <Route path="/profile/module" element={<Homepage selectedImage={selectedImage} />}></Route> {/* it is reverse in our case */}
        <Route path="/profile/module/chatbot" element={<Chat selectedImage={selectedImage} />}></Route> {/* it is reverse in our case */}
        <Route path="/profile/module/addContent" element={<AddContentModal />}></Route> {/* it is reverse in our case ""/addContent" */}
        <Route path="/profile/module/tags" element={<Tags />}></Route> {/* it is reverse in our case */}
        <Route path="/" element={<Modulepage />}></Route>
      </Routes>
    </AppStateProvider>


    </div>
  );
};

export default App;
