// import { useImmer } from '@hooks/useImmer';
// // import { useState } from 'react';

// const App = () => {
//   const [data, setData] = useImmer({ info: 'yd' });
//   console.log('App component rendered');
//   return (
//     <>
//       <h1
//         className='text-4xl text-[#09F]'
//         onClick={() => {
//           setData(draft => {
//             draft.info = 'yd - React 18';
//             console.log('setData called');
//           });
//         }}
//       >
//         {data.info}
//       </h1>
//     </>
//   )
// };
// App.whyDidYouRender = true; // 导出之前开启引用
// export default App;

import { useRoutes } from 'react-router-dom';
import routes from '@/routes/index';

const App = () => {
  const routing = useRoutes(routes);
  return <>{routing}</>;
};
export default App;