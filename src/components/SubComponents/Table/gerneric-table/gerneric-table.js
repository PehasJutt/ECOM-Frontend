import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import GenericHeader from './generic-header';
import GenericRow from './generic-row';
import './gerneric-table.css';

const GenericTable = (props) => {
  const {header,rowsData,rowDataColor,handleRowClick} = props;

  return (
    <>
      <Table>
        <GenericHeader header={header}/>
        <tbody >
          <GenericRow rowsData={rowsData} rowDataColor={rowDataColor} handleRowClick={handleRowClick}/>
        </tbody>
      </Table>
    </>
  );
};

GenericTable.propTypes = {
  header: PropTypes.array,
  rowsData: PropTypes.array,
  rowDataColor: PropTypes.string,
  handleRowClick: PropTypes.func
};

export default GenericTable;