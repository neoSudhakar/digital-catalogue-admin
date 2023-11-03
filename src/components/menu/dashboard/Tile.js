import React from 'react'
import classes from "./Tile.module.css"
import FilterIcon from '../../../icons/filter-icon'

export default function Tile({title, count, filterCount}) {
  
    let filterText = "No Filters";

    if(filterCount && filterCount === 1 ){
        filterText = `${filterCount} Filter`;
    }
    if(filterCount && filterCount > 1){
        filterText = `${filterCount} Filters`;
    }
  
  return (
    <div className={classes["each-tile"]}>
        <span className={classes["title"]}>{title}</span>
        <span className={classes["count"]}>{count}</span>
        <div className={classes["filter"]}>
            <FilterIcon/>
            <span>{filterText}</span>
        </div>
    </div>
  )
}
