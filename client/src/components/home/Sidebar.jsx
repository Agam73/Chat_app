import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, Search } from "lucide-react";
import { removeToken } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setUserDetails } from "../../redux/slices/user";
import axios from "axios";
import Loader from "../common/Loader";

const Sidebar = ({setChatUserId, chatUserId}) => {
  const userDetails = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [allUsers, setallUsers] = useState([]);
  const [OriginalAllUsers, setOriginalAllUsers] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const {allOnlineUsers} = useSelector((state) => state.Socketio);


  const logOuthandler = () => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) {
      return;
    }
    dispatch(removeToken());
    dispatch(setUserDetails(null));
    toast.success("Logged Out Successfully");
    navigate("/login");
  };

  const handleProfilePic = async (e) => {
    const file = e.target.files[0];
    if(!file) return;

    const formData = new FormData();
    formData.append("profilePic",file);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/change-profile-pic`, formData,{
        headers:{
          Authorization:`Bearer ${token}`,
        },
      })
      
      dispatch(setUserDetails(response.data.user));

      toast.success("Profile Picture changed successfully");

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/getAllUsers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.data.success) {
        throw new Error("Error during fetching of users");
      }
      setallUsers(response.data.Allusers);
      setOriginalAllUsers(response.data.Allusers);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const SearchHandler = (e) =>{
    const value = e.target.value.toLowerCase();
    if(!value){
      setallUsers(OriginalAllUsers);
      return;
    }
    
    const searchUsers = OriginalAllUsers.filter((user)=>{
      const fullName = `${user?.firstName} ${user?.lastName}`.toLowerCase();
      return fullName.includes(value);
    })
    setallUsers(searchUsers);
  }

  

  return (
    <div className="h-full px-0 pt-2">
      {/* Users List */}
      <div className="h-[90%] bg-[#0b052e] rounded-md px-4">
        {/* Users will go here */}

        <div className="h-[20%]">
          <h1 className="text-4xl font-bold flex items-center py-2 justify-center">
            <span>Chat</span>

            <span className="inline-flex items-center justify-center w-[1ch]">
              <span className="animate-logo text-violet-500">S</span>
            </span>

            <span>phere</span>
          </h1>

          <div className="w-full flex items-center bg-gray-800 border border-gray-700 rounded-full px-3 py-2 mt-2">
            <Search size={18} className="text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full bg-transparent outline-none text-white placeholder-gray-400"
              onChange={SearchHandler}
            />
          </div>
        </div>
        {/* All users */}
        <div className="h-[80%] overflow-y-auto" >
          {Loading ? (
            <div className="flex justify-center h-full mt-32">
              <Loader />
            </div>
          ) : (
            <div>
              {allUsers.length < 1 ? (
                <div className="text-gray-400 text-xl text-center mt-20 font-semibold">
                  Users not found...
                </div>
              ) : (
                <div className="flex flex-col ">
                  {allUsers.map((user, index) => {
                    return (
                      <div key={index} onClick={()=>{
                        setChatUserId(user?._id)
                      }}
                      className={`flex items-center gap-4 hover:bg-gray-950 p-2 rounded-full
                      cursor-pointer transition-all duration-300 ${chatUserId == user?._id ? "bg-gray-950" : ""}`}>
                        <div className="relative">
                          <img
                          src={user?.profilePic?.url}
                          alt={`${user?.firstName}Image`}
                          className="h-12 w-12 rounded-full object-cover"/>

                          {
                          allOnlineUsers.includes(user?._id) &&
                          <div className="h-3 w-3 bg-green-500 rounded-full 
                          absolute bottom-0 right-0"></div>
                          }
                         </div>

                        <div>
                          <p>
                            <span>{user?.firstName}</span>{" "}
                            <span>{user?.lastName}</span>
                          </p>
                          {
                            allOnlineUsers.includes(user?._id) ? <p className="text-green-500 font-semibold">Online</p>
                            : <p className="text-red-500 font-semibold">Offline</p>
                          }
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Profile Section */}
      <div className="h-[10%] w-full pt-2 bg-slate-950 flex items-center justify-between px-3  border-t rounded-lg
       border-slate-800">
        {/* Profile Info */}
        <div className="flex items-center gap-3">
          <img
            src={userDetails?.profilePic?.url}
            alt="Profile"
            className="h-12 w-12 rounded-full object-cover"
            onClick={() => fileInputRef.current.click()}
            style={{cursor:"pointer"}}
          />
          <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleProfilePic} />

          <div>
            <p className="text-sm font-medium text-gray-100">
              {userDetails?.firstName}
            </p>

            <p className="text-xs text-gray-400">Online</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          className="px-3 py-2 rounded-lg text-gray-300 hover:bg-violet-500/15 hover:text-violet-300 
          transition-all duration-200"
          onClick={logOuthandler}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
