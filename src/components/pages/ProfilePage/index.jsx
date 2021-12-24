import { useContext, useEffect, useState } from 'react';
import { SocialItem } from "../../SocialItem";
import SocialsOrderContext from '../../../context/SocialsOrderContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useHistory } from "react-router";
import "./styles.css";

export const ProfilePage = (props) => {

    const [socials, setSocials] = useState([]);
    const [filteredSocials, setFilteredSocials] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchString, setSearchString] = useState('');

    const globalState = useContext(SocialsOrderContext);

    const history = useHistory();

    const auth = getAuth();
    const user = auth.currentUser;

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

    useEffect (
      () => {
        filterPosts();
      }, [searchString]
    )

  const filterPosts = () => {
    
    const socialsFiltered = socials.filter(
      (social) => {
        const user = social.user.stringValue.toLowerCase();
        const isMatch = social.indexOf(user.trim().toLowerCase());

        console.log (user);
      } 
    )
    setFilteredSocials(socialsFiltered);

  }

  const getSocials = async() => {
    try {
      const response = await fetch('https://firestore.googleapis.com/v1/projects/itec4012-final-a164f/databases/(default)/documents/socials/');
      const data = await response.json();
      //console.log(data);
      const formattedData = data.documents.map( (item) => {
        return item.fields
      });
  
      //console.log (formattedData);
      setFilteredSocials(formattedData)
      globalState.initializeSocials(formattedData);
      setLoading(false);
  
    } catch(err){
      console.log (err)
      setLoading(false);
    }
  }

    if (user !== null){
      const email = user.email;
      return (
        <div className="socials-page">
            <h1 className="socials-title"> {email} </h1>
            <div className="socials-container">
            {
              filteredSocials.map((social) => (
                <SocialItem image={social.image.stringValue} text={social.text.stringValue} user={social.user.stringValue} ></SocialItem>
              ))
            }

            {
              !loading && filteredSocials.length === 0 && <p>No posts by {email}!</p>
            }

            {
              loading && <p>Loading Data...</p>
            }
            </div>
        </div>
      )
    } else {
      return <p>Please login first!</p>
    }
}