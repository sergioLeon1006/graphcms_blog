import React from 'react';
// import {getPost,getPostDetail} from '../../services';
import {PostDetails,Categories,PostWidget,Author,Comments,CommentsForm} from '../../components'

export const PostDetail = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="col-span-1 lg:col-span-8">
                <PostDetails></PostDetails>
                <Author></Author>
                <CommentsForm></CommentsForm>
                <Comments></Comments>
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

export default PostDetail;