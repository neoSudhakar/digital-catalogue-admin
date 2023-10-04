import { useState } from "react";

export default function useSelect(validateFn){
    const [inputVal, setInputVal] = useState();
    const [isTouched, setIsTouched]= useState(false);

    const isValid= validateFn(inputVal);
    const hasErr= isTouched && !isValid;

    function touchFn(){
        setIsTouched(true);
    }

    function resetFn(){
        setIsTouched(false);
        setInputVal("");
    }

    function handleBlur(){
        setIsTouched(true);
    }

    function handleChange(value){
        setIsTouched(true);
        setInputVal(value);
    }

    return {
        inputVal,
        isValid,
        hasErr,
        touchFn,
        resetFn,
        handleBlur,
        handleChange,
    };
}