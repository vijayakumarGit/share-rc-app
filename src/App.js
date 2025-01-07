import logo from './logo.svg';

import { BrowserRouter, Routes, Route, createBrowserRouter, createRoutesFromElements, useLocation, browserHistory, shouldRevalidate, RouterProvider } from 'react-router-dom'
import Home from './Components/Home/Home'
import './App.css';
import About from './About';
import Test from './Test';
import styled from 'styled-components'
import React,{ useEffect, useRef, useState, } from 'react';
import LandingPage from './Components/LandingPage/LandingPage';
import LandingPage1 from './Components/LandingPage/LandingPage1';
import { Learning } from './Components/Learning/Learning';
import { Backdrop, CircularProgress } from '@mui/material';
import WatchList from './Components/WatchList/WatchList';


function HomeLoader() {
  console.log('Home Loader')
  return 'isLoading PASS'
}
export const LoaderContext = React.createContext({
  open: false,
  toggleLoader: () => {},
});
export const ModalContext = React.createContext({
  open: false,
  openModal: () => {},
});
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/home" element={<Home />} loader={HomeLoader} />
      <Route path='/about' element={<About />} loader={HomeLoader} />
      <Route path='/' element={<Learning />} loader={HomeLoader} />
      <Route path='/losers' element={<Learning />} loader={HomeLoader} />
      <Route path='/gainers' element={<Learning />} loader={HomeLoader} />
      <Route path='/active' element={<Learning />} loader={HomeLoader} />
      <Route path='/landing1' element={<LandingPage />} loader={HomeLoader} />
      <Route path='/watch-list' element={<Learning />} loader={HomeLoader} />
    </>
  )
)

function App() {
  const [loader,showLoder]=useState(false);
  const [modal,setModal]=useState(false);
  const modalValues=useRef(null)
  const handleOpenModal=(params)=>{
    console.log(modalValues.current)
    modalValues.current=params
    // modalValues.current.onCancel=params.onCancel
    setModal(true)
  }
  return (
    <LoaderContext.Provider value={{toggleLoader:(val)=>{showLoder(val)}}}>
      <ModalContext.Provider value={{openModal:handleOpenModal}}>
      {modal && <div>
                This is Modal
                <button onClick={()=>{modalValues?.current?.onProcess();setModal(false)}}>Process</button>
                <button onClick={()=>{modalValues?.current?.onCancel();setModal(false)}}>Cancel</button>
            </div>}
    <Container>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <RouterProvider router={router} />
    </Container>
    </ModalContext.Provider>
    </LoaderContext.Provider>
  );
}

export const Container = styled.div`

`

export default App;