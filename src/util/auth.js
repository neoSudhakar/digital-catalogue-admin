export function authTokenLoader(){
    const token=localStorage.getItem("TOKEN");
    return token;
}