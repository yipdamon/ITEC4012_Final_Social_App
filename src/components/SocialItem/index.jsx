import './styles.css';
import SocialsOrderContext from '../../context/SocialsOrderContext';
import { useContext } from 'react';

export const SocialItem = (props) => {

    const {text, user} = props;

    const globalState = useContext(SocialsOrderContext);

    return (
        <div className="social">
            <p className="social-text"> {text} </p>
            <p className="social-user"> {user} </p>
        </div>
    )
}