// Breadcrumbs.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => " " + x + " ");
  pathnames.unshift("Home ")

  // locations = [
  //   {name: "Home", path: "/"},
  //   {name: 
  // ]
  
  return (
    <div style={{
      fontSize: '25px',
      padding: '10px',
      backgroundColor: 'rgb(61, 72, 73)',
    }}>
      {/* {pathnames.length == 0 ? 
      <Link to="/">Home</Link> : null} */}
      
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        console.log("name: ", name)
        return isLast ? (
          <span key={name}>{" " + name}</span>
        ) : (
          <Link key={name} to={routeTo} style={{
            // removing underline
            textDecoration: 'none',
            color: 'grey',
          }}>
            {name}
          </Link>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
