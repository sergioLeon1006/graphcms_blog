import React,{useState,useEffect} from 'react'
import moment from 'moment';
import Link from 'next/link';

import {getRecentPosts,getSimilarPosts} from '../services';

const PostWidget = ({categories,slug}:any) => {
  const [relatedPost, setrelatedPost] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories,slug)
         .then((result:any) => setrelatedPost(result));
    }else{
      getRecentPosts()
        .then((result:any) => setrelatedPost(result));
    }
  },[slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">{slug ? 'Related posts' : 'Recent Post'}</h3>
      {relatedPost.map((post:any)=> (
        <div key={post.title} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <img alt={post.title} height="60px" width="60px" src={post.featuredImage.url} className="aling-middle rounded-full" />
          </div>
          <div className="felx-grow ml-4">
            <p className="text-grey-500 font-xs text-pink-600">{moment(post.createdAt).format('MM DD, YYYY')}</p>
            <Link href={`/post/${post.slug}`} key={post.title} className="text-md cursor:pointer text-pink-600">{post.title}</Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget