import React, { useEffect, useState } from 'react';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import io from "socket.io-client";
import { setAllOnlineUsers } from './redux/slices/socket';
import { SocketProvider } from './context/Socketcontext';

const App = () => {
  const [socket, setSocket] = useState(null);
  const {token} = useSelector((state) => state.auth);
  const {userDetails} = useSelector((state) => state.user);

  const dispatch = useDispatch();
  
  const router = createBrowserRouter([
    {
      path:'/',element : token ? <Home/> : <SignUp />
    },
    {
      path:'/login', element : token ? <Home/> : <><Login /></>
    },
    {
      path:'/home',element: token ? <><Home/></> : <Navigate to = {"/login"}/>
    }
  ]);


useEffect(() => {
  if(!token || !userDetails?._id){
    return;
  }
  
  const newsocket = io(`${import.meta.env.VITE_SOCKET_URL}`,{
    query:{
      userId : userDetails?._id,
    }
  },);

  setSocket(newsocket);

  newsocket.on("all-online-users",(data)=>{
    dispatch(setAllOnlineUsers(data))
  })
  return () => {
    newsocket.off("all-online-users");
    newsocket.disconnect();
  }
}, [token]);

  return (
    <SocketProvider value={socket}>
    <div className='min-h-screen w-screen bg-linear-to-br from-gray-950
     to-gray-900 flex items-center justify-center text-white py-10'>
      <RouterProvider router={ router }/>
      <Toaster/>
    </div>
    </SocketProvider>
  )
}

export default App