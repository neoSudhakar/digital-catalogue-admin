import { useState } from "react";

export default function useInput(validateFn){
    const [inputVal, setInputVal] = useState("");
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

    function handleChange(event){
        setInputVal(event.target.value);
        setIsTouched(false);
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