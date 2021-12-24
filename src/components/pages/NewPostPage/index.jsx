import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import "./styles.css";
import { useState } from "react";

export const NewPostPage = () => {

    const { register, handleSubmit } = useForm();
    const history = useHistory();

    const submitSocial = async (formVals) => {
        const formattedData = {
            fields: {
                image: {
                    stringValue: formVals.image
                },
                user: {
                    stringValue: formVals.user
                },
                text: {
                    stringValue: formVals.text
                },
            }
        }
    
        console.log(formVals, formattedData);
            try {
                const response = await fetch('https://firestore.googleapis.com/v1/projects/itec4012-final-a164f/databases/(default)/documents/socials/',
                {
                    headers: {'Content-Type': 'application/json'},
                    method: "POST",
                    body: JSON.stringify(formattedData)
                })
                history.push('/');
            } catch (error) {
                    console.log("Error", error);
            }
    };

    return (
        <div className="socials-page">
            <form className="form-layout" onSubmit={handleSubmit(submitSocial)}>
                <h2>New post: </h2>
                <br />

                <label htmlFor="image"> Image Url </label>
                <input
                    {...register("image")}
                    name="image"
                    required
                />

                <label htmlFor="user"> Username </label>
                <input 
                {...register("user")} 
                name="user" 
                required/>
                
                <label htmlFor="text"> Message </label>
                <input 
                    {...register("text")}
                    name="text"
                    required type="text" />
            
            <input type="submit" value="Submit Post" />
            <br />
            </form>
        </div>
    );
};