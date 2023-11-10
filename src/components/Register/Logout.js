import { redirect } from "react-router-dom";

export function action(){
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("ACCOUNT");
    return redirect("/auth?mode=login");
}