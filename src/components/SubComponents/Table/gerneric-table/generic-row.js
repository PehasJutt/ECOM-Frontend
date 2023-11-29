import React from 'react';
import PropTypes from 'prop-types';
// import { CreateDashboardObject } from './Objectify';

const GenericRow = (props) => {
  const {rowsData, rowDataColor, handleRowClick} = props;

  return (
    <>
      {rowsData.map((row, rowIndex) => {
        return (
          <tr key={rowIndex}
            onClick={handleRowClick ?
              ()=>{
                const processedData = row.map(colData => colData.title);
                handleRowClick(processedData);
              }
              : undefined}
            style={handleRowClick && {cursor:'pointer'}}>
            {row.map((data, dataIndex) => {
              return (
                <td key={dataIndex} colSpan={data.colSpan || 1} style={{color: rowDataColor}}>
                  {data.isIcon ?
                    <img src={data.icon} className='icon' onClick={data.handleClick ? data.handleClick : undefined}/>  :
                    data.isDiv ?
                      <div className={data.className || ''}>{data.divData}</div> :
                      <span className={data.className || ''}>
                        {data.title}
                      </span> 
                  }
                </td>
              );
            })}
          </tr>
        );
      })}
    </>
  );
};

GenericRow.propTypes = {
  rowsData: PropTypes.array,
  rowDataColor: PropTypes.string,
  handleRowClick: PropTypes.func
};

export default GenericRow;