// import "./styles.css";

// export const ProfilePage = () => {
//   return (
//     <div className="profile-page">
//       My Profile
//     </div>
//   );
// };


import {useParams} from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Button } from '../../Button';

import "./styles.css";
import SocialsOrderContext from '../../../context/SocialsOrderContext';
import { getAuth } from 'firebase/auth';

export const ProfilePage = (props) => {

    const globalState = useContext(SocialsOrderContext);

    const auth = getAuth();
    const user = auth.currentUser;

    if (user !== null){
      const email = user.email;
      return (
        <div className="socials-page">
            <h1 className="socials-title"> {email} </h1>
        </div>
      )
    } else {
      return <p>Please login first!</p>

    }
}