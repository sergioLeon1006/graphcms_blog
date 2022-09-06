  /** *************************************************************
  * Any file inside the folder pages/api is mapped to /api/* and  *
  * will be treated as an API endpoint instead of a page.         *
  *************************************************************** */

import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = (process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT || 'https://api-us-east-1.hygraph.com/v2/cl60te8o8440901t7hw2vfxln/master');
const token = (process.env.GRAPHCM_TOKEN || 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NjI0MDUxMjQsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEuaHlncmFwaC5jb20vdjIvY2w2MHRlOG84NDQwOTAxdDdodzJ2Znhsbi9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiYWFiYTVkOTQtMjBkYS00ZWI3LWIzOTAtMTQ4Yjg2ZjEwNjY5IiwianRpIjoiY2w3cDUzN2FpNDBqdjAxdWtjbTljZHNnciJ9.KAkj8SRI7t32dL6kK0xzpsrMRdKlMG6YR2OzLMTSk55fxQaL3gGCAvOaZcwPAz4NCjrsEob251m_Rw_8kPYr83_7ijYYmeiQ_Qx71hZ7s8FUN2Myg1lRPwKBUY6-F0-XrslTMr-dumtxIhYqLocS_46NjpZdItkXb_fVDALj2dUP7GSQvtXCiKglzFuiihLWN5Wa4-hqOoBDxJPdvYCr-xQYaBbKUPUYCCw1g7o6l90XZ9Pw_28Wq8OSoaowjcq82UvOJSkBeZXaF6w6sXBZGXiW4dAvOiN5SbtmKySS03IBTUHB8enxGw_d8W7_8RGc6Q7hwlg3i_7ZPqFZE7MPbKGZ6D91ojN606lndgAF_xkv2o1fkBGZpvWn0d9IbYYQPAvPNWl9e_u2XmmC4vfeHcQmOyisNUpuf9qIubTalQgkbAoUvN7xgv36WIz2AC9sKdc1gJI3nsflU9kVJim-mHMF_FJxQYfZuiYELcrStNnOiKIjwWKJmY6nXg9dCoHznhG1qHPkVU99cF5sdryL7JRJJOg9rR27EpeHhPivz0iccYAtHUU15e5tL7-08fnFtB3tUklvZT21goRSRO1lXDN0Um2wf2SckeJ5Q-MmhtC3TqJzuPtjtbYy2_AS01V9T5YZwnjG4W6sT7JNX-5IM-qKXiCA_Uz86bnvuh-jLaE')

export default async function comment(req :any , res:any) {
  const  graphQLClient = new GraphQLClient(graphqlAPI,{
    headers: {
      authorization: `Bearer ${token}`
    }
  });
 const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
  `;
  const result:any = await graphQLClient.request(query,req.body);
  return res.status(200).send(result);
}