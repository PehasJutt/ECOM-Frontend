import React from 'react';
import dayjs from 'dayjs';

import doubleArrow from '../../assets/arrow_up_down.svg';


const TopSellTableHeader = [
  {
    title: 'Products ',
    colSpan:null,
    className:null,
    icon: doubleArrow
  },
  {
    title: 'Stock ',
    colSpan:null,
    className:null,
    icon: doubleArrow
  },
  {
    title: 'Units ',
    colSpan:null,
    className:null,
    icon: doubleArrow
  },
  {
    title: 'Amount ',
    colSpan:null,
    className:null,
    icon: doubleArrow
  },
  {
    title: 'Date ',
    colSpan:null,
    className:null,
    icon: doubleArrow
  }
];

const TopSellTableRows = (data) => {
  const processedRows = data.map((prod) => {
    return (
      [
        {
          isIcon: false,
          icon: null,
          isDiv: true,
          divData: 
            <div className='DashHelper_DivWrapper'>
              <img src={prod.product.thumbnail} className='TitleImage' /> 
              <div className='DashHelper_DataWrapper'>
                <div>{prod.product.title}</div>
              </div>
            </div>,
          colSpan: null,
          handleClick: null,
          className: 'fontMedium',
          title: null
        },
        {
          isIcon: false,
          icon: null,
          isDiv: true,
          divData: <b>{prod.product.stock}</b>,
          colSpan: null,
          handleClick: null,
          className: 'fontMedium',
          title: null
        },
        {
          isIcon: false,
          icon: null,
          isDiv: true,
          divData: <><b>{prod.qty}</b> (Sold)</>,
          colSpan: null,
          handleClick: null,
          className: 'fontMedium',
          title: null
        },
        {
          isIcon: false,
          icon: null,
          isDiv: false,
          divData: null,
          colSpan: null,
          handleClick: null,
          className: 'fontMedium',
          title: `$${prod.qty * prod.product.price}`
        },
        {
          isIcon: false,
          icon: null,
          isDiv: false,
          divData: null,
          colSpan: null,
          handleClick: null,
          className: 'fontMedium',
          title: dayjs(prod.product.createdOn).format('DD MMMM YYYY')
        }
          
      ]
    );
  });

  return processedRows;
};

export {
  TopSellTableHeader,
  TopSellTableRows
};
  