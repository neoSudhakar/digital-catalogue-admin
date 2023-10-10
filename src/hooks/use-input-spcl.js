import { useState } from "react";

export default function useInputSpcl(validateFn, initialVal){
    const [inputVal, setInputVal] = useState(initialVal);
    const [isTouched, setIsTouched]= useState(false);

    const isValid= validateFn(inputVal);
    const hasErr= isTouched && !isValid;

    function touchFn(){
        setIsTouched(true);
    }

    function resetFn(){
        setIsTouched(false);
        setInputVal(initialVal);
    }

    function handleBlur(){
        setIsTouched(true);
    }

    function handleChange(event){
        setIsTouched(true);
        setInputVal(event.target.value);
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