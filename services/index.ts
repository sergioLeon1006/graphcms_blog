import { request,gql } from 'graphql-request';

const graphqlAPI = ('https://api-us-east-1.hygraph.com/v2/cl60te8o8440901t7hw2vfxln/master');   

export const getPost = async () =>{
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
`;  
  const result:any = await request(graphqlAPI, query);
  return result.postsConnection.edges;
}

export const getRecentPosts= async () => {
  const query = gql`
    query GetPostDetails(){
    posts(
      orderBy: createdAt_ASC
      last:3
      ){
          title
          featuredImage{
            url
          }
          createdAt
          slug
      }
    }
  `;
  const result:any = await request(graphqlAPI, query);
  return result.posts;
}


export const getSimilarPost = async (categories:[String], slug:String) => {
  const query = gql`
    query GetPostDetails($:slug:String!,$categories:[String!]) {
    posts(
     where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
      last:3
      ){
          title
          featuredImage{
            url
          }
          createdAt
          slug
      }
    }
  `;
   const result:any = await request(graphqlAPI, query);
   return result.posts;
}


export const getCategories = async () => {
  const query = gql`
    query GetCategories{
      categories{
        name
        slug
      }
    }
  `;
  const result:any = await request(graphqlAPI, query);
  return result.categories;
}