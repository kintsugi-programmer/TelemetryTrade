import React from 'react';
import Image from 'next/image';

const Loading = () => {
  return (<div className="relative flex flex-col items-center justify-center h-screen" >
    <Image src='/Images/Logo.png' width='200' height='200' alt='logo'/> <div className='py-5 font-bold text-xl '>Good Things Take Time <br />- Our Team 💜</div>
    </div>
  );
};

export default Loading;