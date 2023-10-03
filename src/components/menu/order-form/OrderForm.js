
export default function OrderForm(){

   const uploadJSONFiles = (event) =>{
        event.preventDefault();
        let formData = new FormData(); 
        let jsonBodyData = {
            "mainGroup" : "Group3",
            "category" : "Category3",
            "product" : "Product3",
            "style" : "Style3",
            "model" : "Model3",
            "size" : "1",
            "version" : 1,
            "description" : "Test design",
            "worker" : "Sample",
            "pieces" : 10,
            "grossWeight" : 10.5 ,
            "stoneWeight" : 2.5,
            "netWeight" : 13.5,
            "componentWeight" : 13.2,
            "ghatWt" : 5.8,
            "remarks" : "None",
            "designDetails" : [
                    {
                    "shape" : "Circle",
                    "color" : "Gold",
                    "clarity" : "Pure",
                    "type" : "Bangle",
                    "stoneGroup" : "Ruby",
                    "pieces" : 2,
                    "stoneWeight" : 10.5,
                    "unitOfMeasurement" : "Carot"
                    }
                ]
            };
        for(let key of Object.keys(event.target.files)) {
          if (key !== 'length') {
            formData.append('images', event.target.files[key]);
          }
        }
        formData.append('design',
          new Blob([JSON.stringify(jsonBodyData)], { 
            type: 'application/json'
          }));
        fetch('http://localhost:8080/api/designs', { 
          method: 'POST',
          body: formData
        }).then(response => response.json())
        .then(result => console.log('Files successfully uploaded!'))
        .catch(error => console.log('error occurred!')); 
      }



    return (
    <>
    <h1>OrderForm
    </h1>
    <div className="uk-margin-medium-top">
      <label>Upload Files</label>
      <input type="file"
        onChange={(event) => uploadJSONFiles(event)} 
        multiple/>
   </div>
    </>
    )
}