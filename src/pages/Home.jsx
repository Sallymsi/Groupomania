import React from 'react';
import Header from '../components/Header'
import Signin from '../components/Signin'


function Home() {
  if (sessionStorage.getItem("token") !== null) {
    window.location.href = `/register`;
  }

  return (
    <div>
      <Header />
      <Signin />
    </div>
  );
}

export default Home;
