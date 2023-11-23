import axios from "axios";
import { useDispatch } from "react-redux";
import { assignRetailerSliceActions } from "../store/assignRetailer-slice";
import { useEffect, useState } from "react";

export default function GetAccounts(){
 const dispatch = useDispatch();

  const [accounts, setAccounts] = useState([]);

  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetchAccounts();
    setLoad[true];
  },[]);
  const fetchAccounts = () => {
    
    try {
    axios.get('http://localhost:8080/api/accounts')
      .then((res) =>  {
        console.log('response is list Accounts: ',res.data)
        if(typeof res.data !== 'string'){
            setAccounts(res.data);
            dispatch(assignRetailerSliceActions.setRetailerAccounts(res.data));
        }
        setLoad[false];
      })
        .catch((err) => console.log('error is : ', err))
    }
    catch (err){
      console.log(err);
    }
  }
}