import React from 'react'
import Image from 'next/image';

function Author({author}:any) {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
      <div className="absolute left-0  right-0 -top-14">
        <Image unoptimized src={author.photo.url} alt={author.name} height="100px" width="100px" className="aling-middle rounded-full"/>
      </div>
      <h3 className="text-white my-auto  text-xl font-bold">{author.name}</h3>
      <p className="text-white my-auto text-lg">
        {author.bio}          
      </p>
    
    </div>
  )
}

export default Author