// Breadcrumbs.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import subpath from './subpath';

const Breadcrumbs = () => {

  const location = useLocation();

  const func = (e) => {
    // console.log("e.target.innerText+", e.target.innerText, "+hi")
    // if (e.target.innerText.toLowerCase().includes("home")) {
    //   // console.log("navigate to home")
    //   window.location.href = "/home"
    // }
    // // if the inner te
    // else if (e.target.innerText.toLowerCase().includes("module")) {
    //   window.location.href = "/module"
    // }
    // else if (e.target.innerText.toLowerCase().includes("chatbot")) {
    //   window.location.href = "/module/chatbot"
    // }
    // else if (e.target.innerText.toLowerCase().includes("tags")) {
    //   window.location.href = "/tags"
    // }
    const url = e.target.innerText
    const num = e.target.id

    if (num == 0) {
      window.location.href = `${subpath}/home`
    } else if (num == 1) {
      // # not taking the last character as it is a space
      const url = e.target.innerText.slice(0, -2)
      window.location.href = `${subpath}/${url}`
    } else if (num == 2) {
      const url = e.target.innerText.slice(0, -2)
      console.log(url, "url")
      // return
      window.location.href = `${subpath}${location.pathname}`
    }


    // 

  }


  const pathnames = location.pathname.split('/').filter((x) => x);
  // console.log(pathnames, "pathnames")
  const goToTagsPage = () => {
    // console.log("go to tags page")
    window.location.href = `${subpath}/tags`
  }

  const goToRequestsPage = () => {
    // console.log("go to tags page")
    window.location.href = `${subpath}/requests`
  }

  const goToProfilePage = () => {
    // console.log("go to tags page")
    window.location.href = `${subpath}/profile`
  }
  
  
  pathnames.unshift("Home ")

  const urlEncodedString = "First%20Trimester";
  // console.log("Decoded url ", decodeURIComponent(urlEncodedString))
  // console.log("pathnames", pathnames)
  return (
    <div style={{
      fontSize: '25px',
      padding: '1.4rem',
      paddingLeft: '4.5rem',
      backgroundColor: 'rgb(20 26 26 / 49%)',
      zIndex: '1000',
      position: 'fixed',
      width: '100%',
      display: 'flex',
      // extreme left adnd right
      justifyContent: 'space-between',
    }}>
      <div>
        {pathnames.map((name, index) => {
          return (
            <span id={index} onClick={func} key={name} style={{
              textDecoration: 'none',
              color: '#cdc3c3',
            }}>
              {name == 'home' ? " " : decodeURIComponent(name) + " / "}
            </span>
          );
        })}
      </div>
      <div>
        <span style={{
          // extreme right
          marginRight: '5vw',
          textDecoration: 'none',
          color: '#cdc3c3',
        }}
          onClick={goToRequestsPage}
        >
          Requests Page
        </span>
        <span style={{
          // extreme right
          marginRight: '5vw',
          textDecoration: 'none',
          color: '#cdc3c3',
        }}
          onClick={goToTagsPage}
        >
          Tags page
        </span>
        <span style={{
          // extreme right
          marginRight: '10vw',
          textDecoration: 'none',
          color: '#cdc3c3',
        }}
          onClick={goToProfilePage}
        >
          Profile Page
        </span>
      </div>
    </div>
  );
};

export default Breadcrumbs;
