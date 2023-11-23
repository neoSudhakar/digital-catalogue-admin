import { useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/ui-slice";

export default function useCheck(state, handleCloseFilters){
    const dispatch=useDispatch();
    const [field, setField] = useState(state);

    function handleFieldCheckChange(event) {
        const { name, id, checked } = event.target;
    
        setField((prev) => {
          return {
            ...prev,
            [name]: checked,
          };
        });

      dispatch(uiActions.closeFilters());
      dispatch(uiActions.selectFilter({label:name, id, event:event.target, setFn:setField.bind(this)}));
      if(handleCloseFilters){
        handleCloseFilters();
      }
    }

      return {
        field,
        handleFieldCheckChange,
      }
}