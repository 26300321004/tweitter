import React from 'react'
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { Link } from 'react-router-dom';

const RightSidebar = ({ otherUsers }) => {

  return (
    <div className='w-[25%]'>
      <div className='flex items-center p-2 bg-slate-700 rounded-full outline-none w-full'>
        <CiSearch className='text-green-600' size="20px" />
        <input type="text" className='bg-transparent text-gray-200 outline-none px-2' placeholder='Search' />
      </div>
      <div className='p-4 bg-[#282828] rounded-2xl my-4'>
        <h1 className='font-bold text-lg text-blue-100'>Who to follow</h1>
        {
          otherUsers?.map((user) => {
            return (
              <div key={user?._id} className='flex items-center justify-between my-3'>
                <div className='flex'>
                  <div>
                    <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRax8pVox5neKv5zPLnRd9b9UWEhBYzaDR9-w&s" size="40" round={true} />
                  </div>
                  <div className='ml-2'>
                    <h1 className='font-bold text-gray-300'>{user?.name}</h1>
                    <p className='text-sm text-zinc-300'>{`@${user?.username}`}</p>
                  </div>
                </div>
                <div>
                  <Link to={`/profile/${user?._id}`}>
                    <button className='px-4 py-1 bg-[#59dacd] text-[#212222] rounded-full'>Profile</button>
                  </Link>
                </div>
              </div>
            )
          })
        }



      </div>
    </div>
  )
}

export default RightSidebar