import React, { useState, useEffect } from 'react';

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the scroll position is greater than the viewport height
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div class='w-full'>
      {isVisible && (
         <a   href='#title'   className="fixed  bottom-[0px]  rounded-sm w-full  flex items-center justify-center gap-4 text-[16px] font-semibold p-2 bg-cyan-500 uppercase tracking-wide text-white  transition duration-150 ease-in-out hover:translate-y-1 hover:bg-cyan-400">
         <span>👈</span>
          <span className='text-[18px] font-bold'>أنقر هنا لتأكيد الطلبية</span>
        </a>
      )}
    </div>
  );
};

export default ScrollButton;
