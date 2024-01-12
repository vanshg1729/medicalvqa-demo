import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppStateProvider } from "./AppState";

import Homepage from "./components/homepage";
import Modulepage from './components/modulepage';
import AddContentModal from './components/addContentModal';
import Tags from './components/tags';
import Chat from './components/Chatbot';
import SignInSide from './components/SignInSide';
// import Login from './components/login';
// import SignUp from './components/SignUp';
import SignUpSide from './components/SignUpSide';
import Create from './components/create';
import Edit from './components/edit';
import RequestList from './components/RequestList';

const App = () => {

  // const [selectedImage.current, setSelectedImage] = useState("")
  const selectedImage = useRef("");

  return (
    <div className="App">
    <AppStateProvider>
      {/* <ResponsiveAppBar></ResponsiveAppBar> */}
      <Routes>
        <Route path='/' element={<SignInSide />}></Route>
        <Route path='/signup' element={<SignUpSide />}></Route>
        {/* <Route path='/random1' element={<Login />}></Route>
        <Route path='/random2' element={<SignUp />}></Route> */}
        <Route path="/:moduleName" element={<Homepage selectedImage={selectedImage} />}></Route> {/* it is reverse in our case */}
        <Route path="/:module/chatbot" element={<Chat selectedImage={selectedImage} />}></Route> {/* it is reverse in our case */}
        <Route path="/:module/edit" element={<Edit />}></Route>
        <Route path="/module/addContent" element={<AddContentModal />}></Route> {/* it is reverse in our case ""/addContent" */}
        <Route path="/tags" element={<Tags />}></Route> {/* it is reverse in our case */}
        <Route path="/home" element={<Modulepage />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/requests" element={<RequestList />}></Route>
      </Routes>
    </AppStateProvider>


    </div>
  );
};

export default App;
