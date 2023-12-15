import React, { useEffect, useState } from 'react';
import { Select, Tag } from 'antd';

const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color="cyan"
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
        }}
      >
        {label}
      </Tag>
    );
  };


const MultipleSelect = ({options, onSetSelectedValues}) => {

    function handleSelectChange(valuesArr, optionsArr){
        console.log("selected values", valuesArr)
        onSetSelectedValues(valuesArr);
    }

    return (
        <Select
            mode="multiple"
            tagRender={tagRender}
            style={{
                width: '15rem',
            }}
            options={options}
            placeholder="Search to Select"
            onChange={handleSelectChange}
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
        />
    );
};
export default MultipleSelect;