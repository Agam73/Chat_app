import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { LuMessageCircleMore } from "react-icons/lu";
import { useSelector } from 'react-redux';
import Loader from '../common/loader';
import moment from 'moment';
import { LuSend } from "react-icons/lu";
import { useSocket } from '../../context/Socketcontext';


const Messages_container = ({chatUserId}) => {
  const {token} = useSelector((state) => state.auth);
  const socket = useSocket();
  const userDetails = useSelector((state) => state.user.userDetails); 
  const [Loading, setLoading] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messageRef = useRef();
  const [msgLoading, setmsgLoading] = useState(false);
  const getAllMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-all-messages/${chatUserId}`,
        {
          headers:{
            Authorization: `Bearer ${token}`,
          }
        });
        if(!response){
          throw new Error("Error during fetching messages")
        }
        
        
        setAllMessages(response?.data?.allMessages);
        setLoading(false);

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      setLoading(false);
      
    }
    finally{
      setLoading(false);
    }
  }

  const sendMessage = async(e)=>{
    e.preventDefault(); 
    if(!message) return;
    const data = {
      receiverId:chatUserId,
      message
    }
    try {
      setmsgLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/send-Message`,data,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      if(!response.data.success){
        throw new Error("Error occured while sending the message");
        
      }
      setmsgLoading(false);
      setAllMessages(prev => [...prev,response?.data?.newMessage])
      setMessage("");
      
      
    } catch (error) {
      console.log(error);
      setmsgLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");

    }
  }
  useEffect(()=>{
    if(!chatUserId) return;

    getAllMessages();
    
  }, [chatUserId]);

  const scrollToBottom = () =>{
    messageRef.current?.scrollIntoView({
      behavio : "smooth"
    })
  }

  useEffect(()=>{
    scrollToBottom();
  },[allMessages])
  
  const handleMessage = useCallback((data)=>{
    if(data?.senderId === chatUserId){
      setAllMessages(prev => [...prev, data]);
    }
  },[chatUserId]);

  useEffect(()=>{
    if (!socket) return;

    socket.on("new-message",handleMessage);
    return ()=>{
      socket.off("new-message", handleMessage);
    };
    
  },[socket, handleMessage]);

  if(!chatUserId) {
    return (<div className='h-full w-full flex flex-col justify-center items-center gap-1'>
      <LuMessageCircleMore size={50} className='text-indigo-400/70'/>
      <p className='text-gray-300 text-[18px]'>Start chatting...🫠</p>
    </div>)}
  return (
    <div className="h-full pt-2">
      {Loading ? (
        <div className="flex justify-center h-full items-center ">
          <Loader />
        </div>
      ) : (
        <div className="h-[90%] overflow-auto">
          {allMessages.length < 1 ? (
            <div className="justify-center h-full items-center flex text-xl">
              {" "}
              No Conversation yet...😒😒
            </div>
          ) : (
            <div>
              {allMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.receiverId === chatUserId
                      ? "justify-end"
                      : "justify-start"
                  } mb-2`}
                >
                  <div className="max-w-[70%]">
                    <div
                      className={`rounded-xl px-4 py-2 mx-3 ${
                        message.receiverId === chatUserId
                          ? "bg-[#5B4BDB] text-white"
                          : "bg-[#35306D] text-white"
                      }`}
                    >
                      <p>{message.message}</p>
                    </div>

                    <p
                      className={`mt-1 text-xs px-2 text-gray-400 ${
                        message.senderId === userDetails._id
                        ? "text-left"
                        : "text-right"
                      }`}
                    >
                      {moment(message.createdAt).format("h:mm A")}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messageRef}></div>
            </div>
          )}
        </div>
      )}
      <div className="h-[10%] bg-[#120b42] border border-indigo-900/40 rounded-lg">
        <form onSubmit={sendMessage} className='h-full w-full flex items-center gap-3 px-4 py-2'>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 h-11 rounded-full bg-[#1b1457] text-white placeholder:text-gray-400 px-5 outline-none 
            border border-indigo-700/30 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          />

          <button
            className="h-11 w-11 rounded-full bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all pt-1 pr-1 
          flex items-center justify-center"
            disabled={msgLoading}
          >
            <LuSend
              size={25}
              className={`${msgLoading ? "animate-spin" : ""}`}
            />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Messages_container