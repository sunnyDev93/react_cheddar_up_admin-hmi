import React, {useState} from 'react';
import NumberSalesFilter from './NumberSalesFilter';
import PropTypes from 'prop-types';
import {
  InputNumber,
  DatePicker,
  Switch,
  Button,
  Input,
  Checkbox,
  Select,
} from 'antd';

const {RangePicker} = DatePicker;
const {Option} = Select;

const Filter = props => {
  const {filterItems, onSubmit} = props;
  const filterStatus =
    filterItems.length > 0
      ? filterItems.map(item => ({
          key: item?.key,
          option: item?.checked,
          value: item.type === 'switch' ? false : null,
          type: item.type,
          method: item?.method,
        }))
      : [];

  const [status, setStatus] = useState(filterStatus);
  const isActive = item => {
    const selected = status.find(itm => itm.key === item.key);
    return selected?.option;
  };

  const onFilterCheckChange = (e, key) => {
    const newStatus = [...status];
    const index = newStatus.findIndex(itm => itm.key === key);
    newStatus[index].option = e.target.checked;
    if (!e.target.checked) {
      newStatus[index].value = null;
    }

    setStatus(newStatus);
  };

  const handleChangeValue = (value, key, equal) => {
    const newStatus = [...status];
    const index = newStatus.findIndex(itm => itm.key === key);
    newStatus[index].value = value;
    if (equal) newStatus[index].method = equal;
    setStatus(newStatus);
  };

  const handleCleanFilter = () => {
    const newStatus = [...status].map(item => ({
      ...item,
      option: false,
      value: null,
      type: item.type,
    }));

    setStatus(newStatus);
  };

  const handleSubmit = () => {
    onSubmit(status);
  };

  return (
    <>
      <div className="filter">
        <div className="btn-container d-flex justify-between">
          <Button
            style={{
              fontSize: '14px',
              borderColor: '#D8DCE6',
              color: '#414142',
              width: '71px',
            }}
            className="avenir-medium text-capitalize br"
            onClick={handleCleanFilter}
          >
            Clear
          </Button>
          <div style={{textAlign: 'justify'}}>Filters</div>
          <Button
            style={{
              fontSize: '14px',
              backgroundColor: '#257A91',
              borderColor: '#D8DCE6',
              color: '#fff',
              width: '71px',
            }}
            className="avenir-medium text-capitalize br"
            onClick={handleSubmit}
          >
            Done
          </Button>
        </div>
        <div className="input-container">
          <div className="checkbox-container">
            {filterItems.length > 0 &&
              filterItems.map((item, idx) => {
                return (
                  <div key={`${item.key}_${idx}`}>
                    <Checkbox
                      style={{
                        fontSize: '14px',
                        color: '#414142',
                        marginBottom: '10px',
                        width: '235px',
                      }}
                      checked={isActive(item)}
                      onChange={e => onFilterCheckChange(e, item.key)}
                    >
                      {item.name}
                    </Checkbox>
                    {isActive(item) && (
                      <>
                        {item.type === 'string' && (
                          <Input
                            className="gray-secondary"
                            size="large"
                            placeholder={item.placeholder}
                            onChange={e =>
                              handleChangeValue(e.target.value, item.key)
                            }
                            style={{
                              verticalAlign: 'middle',
                              marginLeft: '25px',
                              marginBottom: '10px',
                              width: '235px',
                            }}
                          />
                        )}
                        {item.type === 'number' && (
                          <NumberSalesFilter
                            item={item}
                            handleChangeValue={handleChangeValue}
                          />
                        )}

                        {item.type === 'switch' && (
                          <Switch
                            className="gray-secondary"
                            size="large"
                            onChange={checked =>
                              handleChangeValue(checked, item.key)
                            }
                            checkedChildren={item?.checkedLabel}
                            unCheckedChildren={item?.unCheckedLabel}
                            style={{
                              verticalAlign: 'middle',
                              marginLeft: '25px',
                              marginBottom: '10px',
                            }}
                          />
                        )}
                        {item.type === 'select' && (
                          <Select
                            className="gray-secondary"
                            size="large"
                            style={{
                              width: '235px',
                              verticalAlign: 'middle',
                              marginLeft: '25px',
                              marginBottom: '10px',
                            }}
                            placeholder={item.placeholder}
                            optionFilterProp="children"
                            onChange={value =>
                              handleChangeValue(value, item.key)
                            }
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {item?.options &&
                              item.options.length > 0 &&
                              item.options.map(option => (
                                <Option key={option.key} value={option.key}>
                                  {option.label}
                                </Option>
                              ))}
                          </Select>
                        )}
                        {item.type === 'date-range' && (
                          <RangePicker
                            className="gray-secondary"
                            format="YYYY-MM-DD"
                            onChange={value =>
                              handleChangeValue(value, item.key)
                            }
                            style={{
                              verticalAlign: 'middle',
                              marginLeft: '25px',
                              marginBottom: '10px',
                            }}
                          />
                        )}
                      </>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <style jsx="true">{`
        .filter {
          background-color: #fff;
          width: 291px;
          box-shadow: 0px 3px 6px;
          padding: 17px 15px 20px 10px;
        }
        .btn-container {
          padding-bottom: 10px;
          align-items: baseline;
        }
        .input-container {
          padding-top: 10px;
        }
        .checkbox-container {
          display: flex;
          flex-direction: column;
        }
        .ant-picker-month-btn {
          pointer-events: none !important;
        }
        .ant-picker-year-btn {
          pointer-events: none !important;
        }
      `}</style>
    </>
  );
};

export default Filter;

Filter.propTypes = {
  filterItems: PropTypes.array,
  onSubmit: PropTypes.func,
};

Filter.defaultProps = {
  filterItems: [],
  onSubmit: () => {},
};
