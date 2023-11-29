import React from 'react';

function getFirstFiveWords(inputString) {
  const words = inputString?.split(' ');
  const firstTenWords = words?.slice(0, 5);
  const result = firstTenWords?.join(' ');

  return result;
}
  

const adminOrderDetailTableHeader = [
  {
    title: 'Products ',
    colSpan:null,
    className:null
  },
  {
    title: 'Price ',
    colSpan:null,
    className:null
  },
  {
    title: 'Units ',
    colSpan:null,
    className:null
  },
  {
    title: 'Amount ',
    colSpan:null,
    className:null
  }
];

const ObjectToRow = (order) => {
  const processedRows = order.cartItems.map((prod) => {
    return (
      [
        {
          isIcon: false,
          icon: null,
          isDiv: true,
          divData: 
            <div className='DashHelper_DivWrapper'>
              <img src={prod?.prodId?.thumbnail} alt='img' className='TitleImage' /> 
              <div className='DashHelper_DataWrapper'>
                <span>{`${prod?.prodId?.title} - ${ getFirstFiveWords(prod?.prodId?.description)}...`}</span>
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
          divData: <b>${prod?.price}</b>,
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
          title: `${prod?.qty}`
        },
        {
          isIcon: false,
          icon: null,
          isDiv: true,
          divData: <b>{`$${prod?.qty * prod?.price}`}</b>,
          colSpan: null,
          handleClick: null,
          className: 'fontMedium',
          title: null
        }
      ]
    );
  });

  return processedRows;
};

export {
  adminOrderDetailTableHeader,
  ObjectToRow
};
  