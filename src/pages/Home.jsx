import React from 'react';
import '../styles/sass/main.scss'
import Header from '../components/Header'
import Signin from '../components/Signin'


function Home() {
  if (sessionStorage.getItem("token") !== null) {
    window.location.href = `/homepage`;
  }

  return (
    <div className='homeFond'>
      <Header />
      <Signin />
    </div>
  );
}

export default Home;
