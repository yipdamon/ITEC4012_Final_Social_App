import './styles.css';
import SocialsOrderContext from '../../context/SocialsOrderContext';
import { useContext } from 'react';

export const SocialItem = (props) => {

    const {image, text, user} = props;

    const globalState = useContext(SocialsOrderContext);

    return (
        <div className="social">
            <img className="social-photo" src={image} alt={text + user + "photo"} />
            <div className='social-text'>
                <p className="social-user"> @{user} </p>
                <p className="social-text"> {text} </p>
            </div>
        </div>
    )
}