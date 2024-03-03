// import React, { useEffect } from 'react';
// import { useLocation,Outlet } from 'react-router-dom';
// import { SubNavEC } from '../index';
// import {  EChome } from '../../Pages';

// const Ecommerce = () => {
//   return (
//     <div>
//       {useLocation().pathname === '/ecommerce/home' ? (
//         <EChome />
//       ) : (
//         <SubNavEC />
//       )}
//       <Outlet />
//     </div>
//   );
// };

// export default Ecommerce;

import React from 'react';
import {SubNavEC} from '../index';
import { Outlet} from 'react-router-dom';
const Ecommerce = () => {

  return (
  
    <div>
      <SubNavEC />
      <Outlet />
    </div>
  );
};

export default Ecommerce;
