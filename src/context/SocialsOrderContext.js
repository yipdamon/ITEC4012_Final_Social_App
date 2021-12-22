import React, {useState} from 'react';

const SocialsOrderContext = React.createContext({
    socials: [],
    order: [],
    initializeSocials: () => {},
    addSocialToOrder: () => {},
    removeSocialFromOrder: () => {},
});

export const SocialsOrderContextProvider = (props) => {
    const [order, setOrder] = useState([]);
    const [socials, setSocials] = useState([]);

    const initializeSocials = (socialsFromApi) => {
        setSocials(socialsFromApi);
    }

    const addSocialToOrder = (social) => {
        let newOrder = order; 
        newOrder.push (social);
        setOrder(order);
    }

    const removeSocialFromOrder = (socialId) => {
        let prevOrder = order;
        const found = order.findIndex( (social ) => {
            return (social.id === socialId); 
        })
        if (found !== -1) {
            prevOrder.splice(found, 1); // delete one
            setOrder([...prevOrder]);
        } else {
            console.log ("error delete");
        }
    }
    
    return (<SocialsOrderContext.Provider
     value={{order: order, addSocialToOrder: addSocialToOrder, removeSocialFromOrder: removeSocialFromOrder, socials: socials, initializeSocials: initializeSocials }}
    >
        {props.children}
    </SocialsOrderContext.Provider>)

} 

export default SocialsOrderContext;