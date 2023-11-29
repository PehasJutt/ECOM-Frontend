import dayjs from 'dayjs';


const userOrdersTableHeader = [{
  title: 'Order # ',
  colSpan:null,
  className:null
},{
  title: 'Name ',
  colSpan:null,
  className:null
},{
  title: 'Products ',
  colSpan:null,
  className:null
},{
  title: 'Status ',
  colSpan:null,
  className:null
},{
  title: 'Amount ',
  colSpan:null,
  className:null
},{
  title: 'Date ',
  colSpan:null,
  className:null
}];

const ObjectToRow = (orders) => {
  const processedRows = orders.map((order) => {
    return (
      [
        {
          isIcon: false,
          icon: null,
          isDiv: false,
          divData: null,
          colSpan: null,
          handleClick: null,
          className: 'fontMedium',
          title: order._id
        },
        {
          isIcon: false,
          icon: null,
          isDiv: false,
          divData: null,
          colSpan: null,
          handleClick: null,
          className: 'fontMedium',
          title: order.deliveryInfo.name
        },
        {
          isIcon: false,
          icon: null,
          isDiv: false,
          divData: null,
          colSpan: null,
          handleClick: null,
          className: 'fontMedium',
          title: order.cartItems.length
        },
        {
          isIcon: false,
          icon: null,
          isDiv: false,
          divData: null,
          colSpan: null,
          handleClick: null,
          className: 'fontMedium',
          title: order.isDelivered ? 'Delivered' : 'Pending'
        },
        {
          isIcon: false,
          icon: null,
          isDiv: false,
          divData: null,
          colSpan: null,
          handleClick: null,
          className: 'fontMedium',
          title: order.total
        },
        {
          isIcon: false,
          icon: null,
          isDiv: false,
          divData: null,
          colSpan: null,
          handleClick: null,
          className: 'fontMedium',
          title: dayjs(order.createdOn).format('DD MMMM YYYY')
        }
      ]
    );
  });

  return processedRows;
};

export {
  userOrdersTableHeader,
  ObjectToRow
};
  