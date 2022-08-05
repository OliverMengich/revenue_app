import React from "react";
export default React.createContext({
    //administrator Authentification context
    token: null,
    administratorId: null,
    login: (token,administratorId,tokenExpiration)=>{},
    logout: ()=>{},
    //user authentification context
    usertoken: null,
    userId: null,
    userlogin: (usertoken, userId,tokenExpiration)=>{},
    userlogout: ()=>{}
})