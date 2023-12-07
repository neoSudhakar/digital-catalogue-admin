import React from 'react'
import classes from "./Chart.module.css"
import styles from "./Tile.module.css"
import FilterIcon from '../../../icons/filter-icon'

export default function Chart({title, chartComponent, filterCount, companyName , onClick}) {
    let filterText = "No Filters";

    if(filterCount && filterCount === 1 ){
        filterText = `${filterCount} Filter`;
    }
    if(filterCount && filterCount > 1){
        filterText = `${filterCount} Filters`;
    }
  return (
    <section className={classes["chart-container"]} onClick={onClick}>
        <h4>{title}</h4>
        <div className={classes["chart"]}>
            {chartComponent}
        </div>
        <div className={classes["filter"]}>
            <FilterIcon/>
            <span>{filterText}</span>
            <span style={{fontWeight: "500"}}>. {companyName}</span>
        </div>
    </section>
  )
}
