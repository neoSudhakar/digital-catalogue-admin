import { QueryClient } from "@tanstack/react-query";

export const queryClientObj = new QueryClient();

export async function fetchAllDesigns(){
    const response = await fetch('http://localhost:8080/api/designs');
    
    if(!response.ok){
        console.log("response status: " + response.status);
        const error = new Error("Failed to load all designs");
        error.code = response.status;
        const resData = await response.json();
        console.log("res data of all designs FAILED: ", resData);
        error.info = resData;
        throw error;
    }

    const resData = await response.json();
    console.log("res data of all designs: ", resData);
    return resData;
}

export async function fetchCatalogueDesigns({accountId, signal}){
    const response = await fetch(`http://localhost:8080/api/design-account/${accountId}/designs`, {signal: signal});

    if(!response.ok){
        console.log("response status: " + response.status);
        const error = new Error("Failed to load catalogue designs");
        error.code = response.status;
        const resData = await response.json();
        console.log("res data of all designs FAILED: ", resData);
        error.info = resData;
        throw error;
    }

    const resData = await response.json();
    console.log("res data of all designs: ", resData);
    return resData;
}

export async function fetchAssignedRetailers({cardItemId, signal}){
    const response = await fetch(`http://localhost:8080/api/design-account/${cardItemId}/accounts`, {signal: signal});

    if(!response.ok){
        console.log("response status: " + response.status);
        const error = new Error("Failed to load assigned retailers");
        error.code = response.status;
        const resData = await response.json();
        console.log("res data of assigned retailers for particular design FAILED: ", resData);
        error.info = resData;
        throw error;
    }

    const resData = await response.json();
    console.log("res data of assigned retailers for particular design: ", resData);
    return resData;
  }

  
  export async function updateDesignFields({cardItemId, updatedData}){
    const response = await fetch(`http://localhost:8080/api/designs/${cardItemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",  
      },
      body: JSON.stringify(updatedData),
    });

    if(!response.ok){
        console.log("response status: " + response.status);
        const error = new Error("Failed to  update design fields");
        error.code = response.status;
        const resData = await response.json();
        console.log("res data of Failed to  update design fields: ", resData);
        error.info = resData;
        throw error;
    }

    const resData = await response.json();
    console.log("res data of update design fields ", resData);
    return resData;
  }


  export async function addDesignSet({cardItemId, addedData}){
    const response = await fetch(`http://localhost:8080/api/designs/${cardItemId}/details`,
        {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(addedData),
        });

    if(!response.ok){
        console.log("response status: " + response.status);
        const error = new Error("Failed to add design set");
        error.code = response.status;
        const resData = await response.json();
        console.log("res data of Failed to add design set: ", resData);
        error.info = resData;
        throw error;
    }

    const resData = await response.json();
    console.log("res data of add design set: ", resData);
    return resData;
  }


  export async function updateDesignSet({cardItemId, updatedData, detailsId}){
     const response = await fetch(`http://localhost:8080/api/designs/${cardItemId}/details/${detailsId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if(!response.ok){
        console.log("response status: " + response.status);
        const error = new Error("Failed to update design set");
        error.code = response.status;
        const resData = await response.json();
        console.log("res data of Failed to update design set: ", resData);
        error.info = resData;
        throw error;
    }

    const resData = await response.json();
    console.log("res data of update design set: ", resData);
    return resData;
  }


  export async function assignRetailer({cardItemId, formattedData, edit, prevRetailerId}){
    let url = `http://localhost:8080/api/design-account`;
    let method = "POST";

    if(edit){
        url = `http://localhost:8080/api/design-account/accounts/${prevRetailerId}/designs/${cardItemId}`;
        method = "PUT";
    }

    const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",  
        },
        body: JSON.stringify(formattedData),
      });

    if(!response.ok){
        console.log("response status: " + response.status);
        const error = new Error("Failed to add design set");
        error.code = response.status;
        const resData = await response.json();
        console.log("res data of assigned retailers for particular design FAILED: ", resData);
        error.info = resData;
        throw error;
    }

    const resData = await response.json();
    console.log("res data of add design set: ", resData);
    return resData;
  }


  export async function removeRetailer(retailerId){
    const response = await fetch(
      `http://localhost:8080/api/design-account/${retailerId}`,
      {
        method: "DELETE",
      }
    );

    if(!response.ok){
        console.log("response status: " + response.status);
        const error = new Error("Failed to remove assigned retailer");
        error.code = response.status;
        const resData = await response.json();
        console.log("res data of Failed to remove assigned retailer: ", resData);
        error.info = resData;
        throw error;
    }

    const resData = await response.json();
    console.log("res data remove assigned retailer: ", resData);
    return resData;
  }


  export async function accountLogin(retailerId){
    const response = await fetch(
      `http://localhost:8080/api/login`,
      {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      }
    );

    if(!response.ok){
        console.log("response status: " + response.status);
        const error = new Error("Failed to remove assigned retailer");
        error.code = response.status;
        const resData = await response.json();
        console.log("res data of Failed to remove assigned retailer: ", resData);
        error.info = resData;
        throw error;
    }

    const resData = await response.json();
    console.log("res data remove assigned retailer: ", resData);
    return resData;
  }

  export async function postOrder(data){
    const response = await fetch(
      `http://localhost:8080/api/orders`,
      {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if(!response.ok){
        console.log("response status: " + response.status);
        const error = new Error("Failed to post order");
        error.code = response.status;
        const resData = await response.json();
        console.log("res data of Failed to post order: ", resData);
        error.info = resData;
        throw error;
    }

    const resData = await response.json();
    console.log("res data post order: ", resData);
    return resData;
  }
  
