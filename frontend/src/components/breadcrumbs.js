// Breadcrumbs.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import subpath from './subpath';
import config from './config';

const Breadcrumbs = () => {

  const location = useLocation();

  const func = (e) => {
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
  }

  const [userRole, setUserRole] = useState('viewer')

  useEffect(() => {
    // we get the users info here
    const token = localStorage.getItem('token')
    if (!token) {
      window.location.href = `${subpath}`
    }
    else {
      const getUser = async () => {
        try {
          const res = await fetch(`${config.backendUrl}/api/user`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
          const data = await res.json()
          console.log(data, "user data")
          setUserRole(data.role)
          console.log(userRole, "user role")
          // setUserData(data)
        } catch (error) {
          console.log(error)
        }
      }
      getUser()
    }
  }, [])

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

  const logout = () => {
    localStorage.removeItem('token')
    window.location.href = `${subpath}/`
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
        {userRole === 'admin' ?
          <span style={{
            // extreme right
            marginRight: '5vw',
            textDecoration: 'none',
            color: '#cdc3c3',
          }}
            onClick={goToRequestsPage}
          >
            Requests Page
          </span> : null
        }
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
          marginRight: '5vw',
          textDecoration: 'none',
          color: '#cdc3c3',
        }}
          onClick={goToProfilePage}
        >
          Profile Page
        </span>
        <span style={{
          // extreme right
          marginRight: '10vw',
          textDecoration: 'none',
          color: '#cdc3c3',
        }}
          onClick={logout}
        >
          Logout
        </span>
      </div>
    </div>
  );
};

export default Breadcrumbs;
