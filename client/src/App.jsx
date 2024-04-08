import { useState } from 'react'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {createBrowserRouter , RouterProvider } from 'react-router-dom';

import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn ? <Home /> : <Login  setIsLoggedIn = {setIsLoggedIn}/>,
    },
    {
      path: "/login",
      element: isLoggedIn ? <Home /> : <Login  setIsLoggedIn = {setIsLoggedIn}/>,
    },
    {
      path: "/register",
      element: isLoggedIn ? <Home />  : <Signup  setIsLoggedIn = {setIsLoggedIn}/>,
    },
  ]);


  return (
    <RouterProvider router={router} />
  )
}

export default App
