import React from 'react'
import {getPostsCategory, getPost} from '../../services';
import {PostCart,Categories,PostWidget,Loader} from '../../components'
import { useRouter } from 'next/router';

export const Category = ({post}:any) => {
  const router = useRouter();
  
  if (router.isFallback) {
    return <Loader></Loader>
  }

  return (
    <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="col-span-1 lg:col-span-8">
            {post.map((_p:any,index:number)=>(<PostCart post={_p} key={index}></PostCart>))}
            </div>
            <div className="lg:col-span-4 col-span-1">
                <div className="lg:sticky relative top-8">
                    <PostWidget></PostWidget>
                    <Categories></Categories>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Category;


export async function getStaticProps({params}:any) {
  const data = await getPostsCategory(params.slug);
  return {
      props: { post:data },
  };
}

export async function getStaticPaths(){
  const posts:any = await getPost();
  return{
      paths: posts.map(({node:{slug:string}}:any) =>({params:{slug:string}})),
      fallback: true,
  }
}