import React, { useState } from 'react'

const Home = () => {

  const [test, setTest] = useState(0);

  console.log('home')
  return (
    <>
      <div>Home ({test})</div>
      <button onClick={() => setTest(test+1)}>Mais</button>
      </>
  )
}

export default Home