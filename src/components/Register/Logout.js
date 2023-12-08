import { redirect } from "react-router-dom";

export function action(){
    localStorage.removeItem("TOKEN");
    // localStorage.removeItem("ACCOUNT");
    // localStorage.removeItem("CART_ID");
    // localStorage.removeItem("USER_ID");
    return redirect("/auth?mode=login");
}