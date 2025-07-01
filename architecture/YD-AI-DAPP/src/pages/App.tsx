import { useState } from 'react';

const App = () => {
  const [data, setData] = useState({ info: 'aaa' });
  console.log('App component rendered');
  return (
    <>
      <h1
        className='text-4xl text-[#09F]'
        onClick={() => {
          setData({ info: 'aaa' });
        }}
      >
        {data.info}
      </h1>
    </>
  )
};
App.whyDidYouRender = true; // 导出之前开启引用
export default App;