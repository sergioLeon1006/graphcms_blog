import Head from 'next/head'
import { PostCart,Categories,PostWidget } from '../components'
import { getPost } from '../services';

export default function Home({post}:any){
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Future software</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {post.map((_p:any,index:number)=>(<PostCart post={_p} key={index}></PostCart>))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget ></PostWidget>
            <Categories></Categories>
          </div>
        </div>
      </div>
    </div>
  )
}
export async function getStaticProps() {
  const post = (await getPost());
  return {
    props: { post },
  };
}
