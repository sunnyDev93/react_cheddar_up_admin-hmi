import React, {useState} from 'react';
import {InputNumber, Select} from 'antd';

const {Option} = Select;

const NumberSalesFilter = props => {
  const items = [
    {
      key: 'equals',
      name: 'is equal to',
    },
    {
      key: 'between',
      name: 'is between to',
    },
    {
      key: 'gt',
      name: 'is greater than',
    },
    {
      key: 'lt',
      name: 'is less than',
    },
  ];
  const [saleFilterType, setSaleFilterType] = useState();
  const [singleValue, setSingleValue] = useState(0);
  const [smallValue, setSmallValue] = useState(0);
  const [largeValue, setlargeValue] = useState(0);

  const selectChangeValue = key => {
    setSaleFilterType(key);
    props.handleChangeValue(singleValue, props.item.key, key);
  };

  const handleChangeValue = value => {
    setSingleValue(value);
    props.handleChangeValue(value, props.item.key, saleFilterType);
  };

  const handleChangeValueBetweenL = value => {
    setSmallValue(value);
    const betweenValue = [value, largeValue];
    props.handleChangeValue(betweenValue, props.item.key, saleFilterType);
  };

  const handleChangeValueBetweenH = value => {
    setlargeValue(value);
    const betweenValue = [smallValue, value];
    props.handleChangeValue(betweenValue, props.item.key, saleFilterType);
  };
  return (
    <div>
      <Select
        className="gray-secondary"
        size="large"
        style={{
          width: '235px',
          verticalAlign: 'middle',
          marginLeft: '25px',
          marginBottom: '10px',
        }}
        placeholder="Select operator"
        optionFilterProp="children"
        onChange={value => selectChangeValue(value, items.key)}
      >
        {items.map(option => (
          <Option key={option.key} value={option.key}>
            {option.name}
          </Option>
        ))}
      </Select>
      {saleFilterType !== 'between' && !!saleFilterType && (
        <InputNumber
          className="gray-secondary"
          size="large"
          defaultValue={0}
          min={0}
          onChange={value => handleChangeValue(value)}
          formatter={value =>
            props?.item?.key === 'EnhancedUsers.paymentsTotal' ||
            props?.item?.key === 'Tabs.paymentsTotal'
              ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : value
          }
          style={{
            verticalAlign: 'middle',
            marginLeft: '25px',
            marginBottom: '10px',
            width: '100px',
          }}
        />
      )}
      {saleFilterType === 'between' && (
        <div>
          <InputNumber
            className="gray-secondary"
            size="large"
            defaultValue={0}
            min={0}
            onChange={value => handleChangeValueBetweenL(value)}
            formatter={value =>
              props?.item?.key === 'EnhancedUsers.paymentsTotal' ||
              props?.item?.key === 'Tabs.paymentsTotal'
                ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : value
            }
            style={{
              verticalAlign: 'middle',
              marginLeft: '25px',
              marginBottom: '10px',
              width: '100px',
            }}
          />
          <InputNumber
            className="gray-secondary"
            size="large"
            defaultValue={0}
            min={0}
            onChange={value => handleChangeValueBetweenH(value)}
            formatter={value =>
              props?.item?.key === 'EnhancedUsers.paymentsTotal' ||
              props?.item?.key === 'Tabs.paymentsTotal'
                ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : value
            }
            style={{
              verticalAlign: 'middle',
              marginLeft: '25px',
              marginBottom: '10px',
              width: '100px',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default NumberSalesFilter;
