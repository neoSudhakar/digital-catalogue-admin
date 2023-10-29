const [designList, setDesignList] = useState([]);

    const [load, setLoad] = useState(false);

  useEffect(() => {
    console.log('in use effect')
    getVeiwDesign();
    setLoad[true];
  },  []);

  
  const getVeiwDesign = () => {
    
    try {
    axios.get('http://18.204.204.183:8080/api/designs')
      .then((res) =>  {
        console.log('response is list Designs: ',res.data)
        setDesignList(res.data);
        setLoad[false];
      })
        .catch((err) => console.log('error is : ', err))
    }
    catch (err){
      console.log(err);
    }
  }

  const config = {
    apiProd: "http://18.204.204.183:8080/api"
  };
  export default config;