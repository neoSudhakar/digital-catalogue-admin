import { Select } from 'antd';

const SelectComponent = ({options, value, placeholder, name, onChangeFn, onBlurFn, id}) => {
  const onChange = (value) => {
    console.log(`selected ${value}`);
    onChangeFn(value);

  };
  const onSearch = (value) => {
    console.log('search:', value);
  };
  
  // Filter `option.label` match the user type `input`
  const filterOption = (input, option,) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  
  return <Select
    style={{
        // border:"1px solid rgb(112, 112, 129)",
        borderRadius:"0.25rem",
        backgroundColor: "white",
    }}
    // bordered={false}
    name={name}
    id={id}
    showSearch
    placeholder={placeholder}
    optionFilterProp="children"
    onChange={onChange}
    onBlur={()=>onBlurFn()}
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
  };
export default SelectComponent;