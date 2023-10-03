import { Select } from 'antd';

// const onChange = (value) => {
//   console.log(`selected ${value}`);
// };
const onSearch = (value) => {
  console.log('search:', value);
};

// Filter `option.label` match the user type `input`
const filterOption = (input, option,) =>
(option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const SelectComponent = ({options, value, placeholder, name, onChange}) => (
  
  <Select
    style={{
        border:"1px solid rgb(112, 112, 129)",
        borderRadius:"0.25rem",
    }}
    bordered={false}
    name={name}
    showSearch
    placeholder={placeholder}
    optionFilterProp="children"
    onChange={()=>onChange()}
    onSearch={onSearch}
    value={value}
    filterOption={filterOption}
    options={options}
    // options={[
    //   {
    //     value: 'jack',
    //     label: 'Jack',
    //   },
    //   {
    //     value: 'lucy',
    //     label: 'Lucy',
    //   },
    //   {
    //     value: 'tom',
    //     label: 'Tom',
    //   },
    // ]}
  />
);
export default SelectComponent;