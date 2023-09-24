import React, { createContext, useState } from 'react';

export const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [options, setOptions] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [image, setImage] = useState('');

  return (
    <AppStateContext.Provider value={{ query,setQuery,result,setResult,options,setOptions,imageData,setImageData,image,setImage }}>
      {children}
    </AppStateContext.Provider>
  );
};