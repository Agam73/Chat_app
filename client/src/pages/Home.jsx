import Sidebar from '../components/home/Sidebar';
import Messages_container from '../components/home/Messages_container';
import React, { useState } from 'react'

const Home = () => {

  const [chatUserId, setChatUserId] = useState(null);
   
  return (
    <div className='h-[89vh] w-[95vw] flex flex-row '>
      <div className='h-full w-[22%] bg-[#0b052e] rounded-l-md'>
        <Sidebar setChatUserId={setChatUserId}   chatUserId = {chatUserId}/>
      </div>
      <div className='h-full w-[78%] bg-[#120b42] rounded-r-md'>
        <Messages_container chatUserId = {chatUserId}/>
      </div>
    </div>
  )
}

export default Home;