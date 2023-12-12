import { redirect } from "react-router-dom";

export function getUserId(){
    const userId=JSON.parse(localStorage.getItem("USER_ID"));

    if(!userId){
        return null;
    }
    return userId;
}

export function getAccountLoader(){
    const account=JSON.parse(localStorage.getItem("ACCOUNT"));

    if(!account){
        return null;
    }
    return account;
}

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

export function checkRetailerAuthLoader(){
    const token= authTokenLoader();
    const account = getAccountLoader();
    console.log(account.accountType);

    if(!token){
        console.log("no auth token");
        return redirect("/auth?mode=login");
    }
    else if(account.accountType === "Manufacturer" || account.accountType === "system"){
        console.log("Manufacturer don't have auth");
        return redirect("/");
    }

    return null;
}

export function checkManufacturerAuthLoader(){
    const token= authTokenLoader();
    const account = getAccountLoader();
    console.log(account.accountType);

    if(!token || !account){
        console.log("no auth token");
        return redirect("/auth?mode=login");
    }
    else if(account.accountType === "Retailer" || account.accountType === "system"){
        console.log("Retailer don't have auth");
        return redirect("/");
    }
    else{
        return null;
    }

}

export function checkSystemAuthLoader(){
    const token= authTokenLoader();
    const account = getAccountLoader();
    console.log(account.accountType);

    if(!token || !account){
        console.log("no auth token");
        return redirect("/auth?mode=login");
    }
    else if(account.accountType === "Retailer" || account.accountType === "Manufacturer"){
        console.log("Retailer and Manufacturer don't have auth");
        return redirect("/");
    }
    else{
        return null;
    }

}