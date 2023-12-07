import React from 'react'
import classes from "./Tile.module.css"
import FilterIcon from '../../../icons/filter-icon'
import { useSelector } from 'react-redux';

export default function Tile({title, count, filterCount, onClick}) {
    const isDashboardOpen = useSelector(state => state.ui.isDashboardOpen)
  
    let filterText = "No Filters";

    if(filterCount && filterCount === 1 ){
        filterText = `${filterCount} Filter`;
    }
    if(filterCount && filterCount > 1){
        filterText = `${filterCount} Filters`;
    }
  
  return (
    <div className={`${classes["each-tile"]} ${!isDashboardOpen ? classes["full"] : ""}`} onClick={onClick}>
        <span className={classes["title"]}>{title}</span>
        <span className={classes["count"]}>{count}</span>
        <div className={classes["filter"]}>
            <FilterIcon/>
            <span>{filterText}</span>
        </div>
    </div>
  )
}
