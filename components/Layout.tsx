import React from 'react';
import {Header} from './';

function Layout({children}:any) {
  return (
    <>
        <Header></Header>
        {children}
    </>
  )
}

export default Layout