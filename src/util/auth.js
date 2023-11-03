import { redirect } from "react-router-dom";

export function authTokenLoader(){
    const token=localStorage.getItem("TOKEN");
    if(!token){
        return null;
    }
    return token;
}

export function checkAuthLoader(){
    const token= authTokenLoader();

    if(!token){
        return redirect("/auth?mode=login");
    }

    return null;
}