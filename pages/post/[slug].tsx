import React from 'react';
import {getPost,getPostDetails} from '../../services';
import {PostDetails,Categories,PostWidget,Author,Comments,CommentsForm} from '../../components'

export const PostDetail = ({post}:any) => {
    
  return (
    <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="col-span-1 lg:col-span-8">
                <PostDetails post={post}></PostDetails>
                <Author author={post.author}></Author>
                <CommentsForm slug={post.slug}></CommentsForm>
                <Comments slug={post.slug}></Comments>
            </div>
            <div className="lg:col-span-4 col-span-1">
                <div className="lg:sticky relative top-8">
                    <PostWidget slug={post.slug} categories={post.categories.map((category:any) => category.slug)}></PostWidget>
                    <Categories></Categories>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostDetail;

export async function getStaticProps({params}:any) {
    const data = await getPostDetails(params.slug);
    return {
        props: { post:data },
    };
}

export async function getStaticPaths(){
    const posts:any = await getPost();
    return{
        paths: posts.map(({node:{slug:string}}:any) =>({params:{slug:string}})),
        fallback: false,
    }
}