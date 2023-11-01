export const loggedInPerson1 = {
    isManufacturer: true,
    isRetailer: false,
}

export const loggedInPerson2 = {
    isManufacturer: false,
    isRetailer: true,
    retailerId: "r1",
}

export function checkLoggedInPerson1(){
    if(!loggedInPerson1.isManufacturer){
        return null;
    }
    return null;
}

export function checkLoggedInPerson2(){
    if(!loggedInPerson2.isRetailer){
        return null;
    }
    return null;
}

