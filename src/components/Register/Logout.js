import { redirect } from "react-router-dom";

export function action(){
    localStorage.removeItem("TOKEN");
    return redirect("/auth?mode=login");
}