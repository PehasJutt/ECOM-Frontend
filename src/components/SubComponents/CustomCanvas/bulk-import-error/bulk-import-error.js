import React from 'react';
import PropTypes from 'prop-types';
import {Button, Offcanvas, Table} from 'react-bootstrap';

import backBtn from '../../../../assets/arrow_left.svg';
import SimpleTableHead from '../../Table/SimpleTable/SimpleTableHead';
import SimpleTableRow from '../../Table/SimpleTable/SimpleTableRow';
import './bulk-import-error.css';

const BulkImportErrorCanvas = (props) => {

  const { show, handleHide,title, btnText, errArray }  = props;

  const headers = ['Row #', 'Error Message'];
  const tableRows = errArray?.map(err => {
    return(
      [`${err.row}` , `${err.message}`]
    );
  });

  return (
    <>
      <Offcanvas show={show} onHide={handleHide} backdrop='static' placement='end' className='Canvas' >

        <Offcanvas.Header className='canvasHeader'>
          <img src={backBtn} className='backBtn' onClick={handleHide}/>
          <Offcanvas.Title className='canvasTitle'><h4>{title}</h4></Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className='SimpleCanvasBody'>
          <hr/>
          <div className ='SimpleCanvasBodyWrapper'>
            <Table>
              <SimpleTableHead headers={headers}/>
              <tbody>
                {tableRows.map(row => <SimpleTableRow rowData={row} key={row}/>)}
              </tbody>
            </Table>
          </div>
          <Button className='SimpleCanvasBtn' onClick={handleHide}>{btnText}</Button>
        </Offcanvas.Body>

      </Offcanvas>
    </>
  );
};

BulkImportErrorCanvas.propTypes = {
  show: PropTypes.bool,
  handleHide: PropTypes.func,
  title: PropTypes.string,
  btnText: PropTypes.string
};

export default BulkImportErrorCanvas;
