import React from 'react'
import CreatePost from './CreatePost'
import Tweet from './Tweet'
import { useSelector } from 'react-redux'

const Feed = () => {
  const  {tweets} = useSelector(store=>store.tweet);

  return (
    <div className='w-[50%] border border-[#545454]'>
      <div>
        <CreatePost/>
        {
          tweets?.map((tweet)=> <Tweet key={tweet?._id} tweet={tweet}/>)
        }
      
      </div>
    </div>
  )
}

export default Feed
