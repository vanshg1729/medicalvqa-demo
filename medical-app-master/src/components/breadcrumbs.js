// Breadcrumbs.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const func = (e) => {
    console.log("e.target.innerText+", e.target.innerText, "+hi")
    if (e.target.innerText.toLowerCase().includes("home")) {
      console.log("navigate to home")
      window.location.href = "/home"
    }
    // if the inner te
    else if (e.target.innerText.toLowerCase().includes("module")) {
      window.location.href = "/module"
    }
    else if (e.target.innerText.toLowerCase().includes("chatbot")) {
      window.location.href = "/module/chatbot"
    }
    else if (e.target.innerText.toLowerCase().includes("tags")) {
      window.location.href = "/tags"
    }
  }


  const pathnames = location.pathname.split('/').filter((x) => x);
  const goToTagsPage = () => {
    console.log("go to tags page")
    window.location.href = "/tags"
  }
  pathnames.unshift("Home ")

  const locations = [
    { name: "Home", path: "/home" },
    { name: "module", path: "/module" },
    { name: "chatbot", path: "/module/chatbot" },
  ]
  console.log("pathnames", pathnames)
  return (
    <div style={{
      fontSize: '25px',
      padding: '20px',
      paddingLeft: '40px',
      backgroundColor: 'rgb(20 26 26 / 49%)',
      zIndex: '1000',
      position: 'fixed',
      width: '100%',
      display: 'flex',
      // extreme left adnd right
      justifyContent: 'space-between',
    }}>
      {/* {pathnames.length == 0 ? 
      <Link to="/">Home</Link> : null} */}
      <div>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          console.log("name: ", name)
          return (
            <span onClick={func} style={{
              // removing underline
              textDecoration: 'none',
              color: 'grey',
            }}>
              {name == 'home' ? " " : name + " / "}
            </span>
          );
        })}
      </div>
      <div style={{
        // extreme right
        marginRight: '10vw',
        textDecoration: 'none',
        color: 'grey',
      }}
        onClick={goToTagsPage}
      >
        {/* here we create a tags page link so if the user clicks on it we go to the tags page */}
        Tags page
      </div>
    </div>
  );
};

export default Breadcrumbs;
