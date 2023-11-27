import { useState } from "react";

export default function useFilter(){
    const [isExpanded, setIsExpanded]= useState(false);

    function handleToggle(){
        setIsExpanded((prev)=>!prev);
    }
    function handleSetIsExpanded(bool){
        setIsExpanded(bool);
    }

    return {
        isExpanded,
        handleToggle,
        handleSetIsExpanded,
    }
}