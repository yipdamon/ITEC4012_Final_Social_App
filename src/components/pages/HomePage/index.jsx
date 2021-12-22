import "./styles.css";
import { useEffect, useState, useContext} from "react";
import SocialsOrderContext from "../../../context/SocialsOrderContext";
import { SocialItem } from "../../SocialItem";

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useHistory } from "react-router";


export const HomePage = () => {

  const [socials, setSocials] = useState([]);
  const [loading, setLoading] = useState(true);

  const globalState = useContext(SocialsOrderContext);

  const history = useHistory();

  // Check if current user is logged into firebase
  useEffect(
    () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          history.push('/login');
        }
      })
    }, []
  );

  useEffect(
    () => {
      getSocials();
    }, []
  );

const getSocials = async() => {
  try {
    const response = await fetch('https://firestore.googleapis.com/v1/projects/itec4012-final-a164f/databases/(default)/documents/socials/');
    const data = await response.json();
    //console.log(data);
    const formattedData = data.documents.map( (item) => {
      return item.fields
    });

    //console.log (formattedData);
    setSocials(formattedData);
    globalState.initializeSocials(formattedData);
    setLoading(false);

  } catch(err){
    console.log (err)
    setLoading(false);
  }
}

  return (
    <div className="socials-page">
      <h1 className="socials-title"> Posts </h1>
      <div className="socials-container">
      {
        socials.map((social) => (
          <SocialItem text={social.text.stringValue} user={social.user.stringValue} ></SocialItem>
        ))
      }

      {
        loading && <p>Loading Data..</p>
      }
      </div>
    </div>
  );
};
