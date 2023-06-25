


import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResponsiveAppBar from './components/Navbar';

import Home from "./components/Home";
import VQA from "./components/VQA";
import Search from "./components/Search";
import Visualization from "./components/Visualization";
import Annotation from "./components/Annotation";
import { AppStateProvider } from "./AppState";
 

const App = () => {

  // const [options, setOptions] = useState([]);
  // useEffect(() => {
  //   fetchAuto()
  // }, []);


  // const fetchAuto = () => {
  //   fetch('http://127.0.0.1:5000/autocomplete')
  //   .then(response => response.json())
  //   .then(data => setOptions(data.questions))
  //   .catch(error => console.error(error));
  // };


  return (
    <div className="App">
    <AppStateProvider>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="VQA" element={<VQA />}></Route>
        <Route path="Search" element={<Search/>}></Route>
        <Route path="Visualization" element={<Visualization />}></Route>
        <Route path="Annotation" element={<Annotation />}></Route>
      </Routes>
    </AppStateProvider>


    </div>
  );
};

export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Search from './components/Search';

// const App = () => {
//   return (
//     <div className="App">
//       <Navbar />
//       <Routes>
//         <Route exact path="/search">
//           <Search />
//         </Route>
//       </Routes>
//     </div>
//   );
// };

// export default App;







// import React from 'react';
// import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom';
// import styled from 'styled-components';
// // import Search from './components/Search'

// const Navbar = styled.nav`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background-color: #2c3e50;
//   color: #fff;
//   padding: 10px;
// `;

// const NavbarLink = styled(NavLink)`
//   margin-right: 20px;
//   color: #fff;
//   text-decoration: none;
//   &.active {
//     color: #f1c40f;
//   }
// `;

// const AppContainer = styled.div`
//   max-width: 800px;
//   margin: 0 auto;
//   padding: 20px;
// `;

// const Home = () => <h1>Welcome to the Homepage</h1>;
// const VQA = () => <h1>Visual Question Answering</h1>;
// const Search = () => <h1>Search</h1>;
// const Visualization = () => <h1>Visualization</h1>;
// const Annotation = () => <h1>Annotation</h1>;

// const App = () => {
//   return (
//     <Router>
//       <Navbar>
//         <div>
//           <NavbarLink exact to="/">Home</NavbarLink>
//           <NavbarLink to="/vqa">VQA</NavbarLink>
//           <NavbarLink to="/search">Search</NavbarLink>
//           <NavbarLink to="/visualization">Visualization</NavbarLink>
//           <NavbarLink to="/annotation">Annotation</NavbarLink>
//         </div>
//       </Navbar>
//       <AppContainer>
//         <Routes>
//           <Route exact path="/" component={Home} />
//           <Route path="/vqa" component={VQA} />
//           <Route path="/search" component={Search} />
//           <Route path="/visualization" component={Visualization} />
//           <Route path="/annotation" component={Annotation} />
//         </Routes>
//       </AppContainer>
//     </Router>
//   );
// };

// export default App;
