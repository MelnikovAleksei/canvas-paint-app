import React from 'react';

const getWidth = () => {
  return window.innerWidth;
};

const getHeight = () => {
  return window.innerHeight;
};

function useCurrentSize() {
  const [size, setSize] = React.useState({
    width: getWidth(),
    height: getHeight(),
  });

  React.useEffect(() => {

    let timeOutId = null;

    const handleResize = () => { //debounce function
      clearTimeout(timeOutId);

      timeOutId = setTimeout(() => {
        setSize({
          width: getWidth(),
          height: getHeight(),
        });
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return size;
}

export default useCurrentSize;