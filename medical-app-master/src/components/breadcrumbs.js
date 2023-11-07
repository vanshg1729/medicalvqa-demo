// Breadcrumbs.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  return (
    <div>
      {pathnames.length == 0 ? 
      <Link to="/">Home</Link> : null}
      
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        console.log("name: ", name)
        return isLast ? (
          <span key={name}>{name}</span>
        ) : (
          <Link key={name} to={routeTo}>
            {name}
          </Link>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
