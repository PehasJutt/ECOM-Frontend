import React ,{useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Button, Table, Spinner} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { 
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct
  // searchProdsByName
} from '../../reducers/product';
import Layout from '../Layout/Layout';
import AddEditProdCanvas from '../SubComponents/CustomCanvas/add-edit-prod/add-edit-prod';
import CustomModal from '../SubComponents/CustomModal/CustomModal';
import BulkImportModel from '../SubComponents/BulkImportModel/BulkImportModel';
import ImportProgress from '../SubComponents/ImportProgress/ImportProgress';
import SearchBar from '../SubComponents/SearchBar/SearchBar';
import TableHead from '../SubComponents/Table/custom-table/custom-table-head';
import TableRow from '../SubComponents/Table/custom-table/custom-table-row';
import pencil from '../../assets/pencil.svg';
import trash from '../../assets/trash.svg';
import dubbleArrow from '../../assets/arrow_up_down.svg';
import success from '../../assets/success.svg';

import './Products.css';

function Products() {

  const [showImportModal, setShowImportModal] = useState (false);
  const [showImportProgress, setShowImportProgress] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [curPg, setCurPg] = useState (1);
  const [message, setMessage] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [offset, setOffset] = useState(1);
  const [products,setProducts] = useState([]);
  const [queryString, setQueryString] = useState([]);
  const [prodFilters, setProdFilters] = useState([]);
  const [fileName, setFileName] = useState(null);
  const rcvdProds = useSelector(state=>state.products);
  const user = useSelector(state=>state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userType = user?.type ? user.type : localStorage.getItem('type');

  useEffect(()=>{
    if (rcvdProds.CUDres)
      setShowModal(true);
    setProducts(rcvdProds.data);
  },[rcvdProds]);

  useEffect(()=>{
    dispatch(fetchProducts({
      skip:(curPg - 1) * 10 , 
      limit:10 
    }));
  },[curPg, refresh]);

  useEffect(() => {
    if(prodFilters?.length && prodFilters[0].value) {
      dispatch (fetchProducts({
        filterArr: prodFilters
      }));
    }
    else setRefresh(!refresh);
  }, [prodFilters]);

  useEffect(() => {
    const searchFilter = {
      field: 'description'
    };
    if (queryString.length > 0) searchFilter.value = queryString;
    else searchFilter.value = null;
      
    const filtersArray  = [...prodFilters];
    const index  = filtersArray.findIndex( filter => filter.field === searchFilter.field);
    if( index !== -1 ) filtersArray[index] = searchFilter;
    else filtersArray.push(searchFilter);
    setProdFilters(filtersArray);
    
  }, [queryString]);

  const handleAccessClick = () => {
    navigate('/');
  };

  const handleAddClick = () => {
    setShowCanvas(true);
  };

  const handleCanvasHide = ()=>{
    setShowCanvas(false);
  };

  const handlePrev = () => {
    if (offset > 1)
      setOffset(offset - 1);

  };

  const handleNext = () => {
    if (offset + 2 < rcvdProds.total / 10)
      setOffset(offset + 1);
  };

  const handlePgBtn = (num) => {
    setCurPg(num);
  };

  const addProd = (formData) => {
    const token = localStorage.getItem('token');
    dispatch(addProduct({token, formData}));
    setRefresh(!refresh);
    setShowCanvas(false);
    setMessage('Awesome, the product has been added successfully.');
  };

  const deleteProd = (data) => {
    const token = localStorage.getItem('token');
    const id = data.id;
    dispatch(deleteProduct({token, id}));
    setRefresh(!refresh);
    setMessage('The product has been deleted successfully.');
  };

  const updateProd = (formData) => {
    const token = localStorage.getItem('token');
    console.log(formData);
    const payload = {token, formData};
    dispatch(updateProduct(payload));
    setRefresh(!refresh);
    setMessage('Great, the product has been updated successfully.');

  };

  const handleImportModalHide = () => {
    setShowImportModal(false);

  };

  const handleImportModalSave = () => {
    setRefresh(!refresh);
    setShowImportProgress(true);
    setShowImportModal(false);
  };

  const handleModalHide = () => {
    setShowModal(false);
  };

  const handleImportProgressClose = () => {
    setShowImportProgress(false);
  };

  return (
    <div>
      { userType === 'admin' ? 
        <Layout isAdmin={true}>

          <div className='w-100' style={{overflow:'scroll'}}>
            {showCanvas && <AddEditProdCanvas 
              show={showCanvas} 
              handleHide={handleCanvasHide}
              title={'Add Product'}
              btnText={'Save'}
              action={addProd}
              placeholder={null}
            />}

            {<CustomModal
              show={showModal} 
              handleHide={handleModalHide} 
              title={'Successfully'} 
              modalIcon={success} 
              message={message} 
              oneBtn={true}
              action={()=>setRefresh(!refresh)}
            />}

            {<BulkImportModel show={showImportModal} handleHide={handleImportModalHide} action={handleImportModalSave} setFileName={setFileName}/>}

            {showImportProgress && <ImportProgress action={handleImportProgressClose} fileName = {fileName}/>}

            <div className='productsHeader'>
              <div className='header_lt'><h4 className='heading'>Products</h4></div>
              <div className='header_rt'>
                <SearchBar placeholder={'Search by Name'} onSearchChange={setQueryString}/>
                <Button 
                  variant='primary'
                  className='importProds' 
                  onClick={() => setShowImportModal(true)}
                >
                  Import Products
                </Button>
                <Button  variant='primary' onClick={handleAddClick}>Add New</Button>
              </div>
            </div>
            <div className='Product_Table_Warpper'>
              {rcvdProds.loading && <Spinner
                as='span'
                animation='border'
                size='lg'
                variant='primary'
                role='status'
                aria-hidden='true'
                className='spinner'
              />}

              {!products ? <div>No Data Found</div> :
                rcvdProds.error && 
              <div>Something bad happened...</div>}

              { !rcvdProds.loading && products?.length ?
                <Table hover >
                  <TableHead 
                    icon={dubbleArrow} 
                    title={'Title '}
                    size={'Size '}
                    color={'Color '}
                    price={'Price '}
                    stock={'Stock '}
                    actions={'Actions'} 
                  />
                  <tbody>

                    {products?.length ? products.map(product =>
                      <TableRow
                        image={product.thumbnail || product.images[0]}
                        imageArray = {product.images}
                        title={product.title}
                        desc= {product.description}
                        size={'XS,S,M,L,XL'}
                        color={'Red,Green,Orange,Black'}
                        price={product.price}
                        stock={product.stock}
                        edit={pencil}
                        remove={trash}
                        editAction={updateProd}
                        removeAction={deleteProd}
                        id= {product._id}
                        key={product._id}
                      />
                    ) 
                      : <span>No data found</span>

                    } 
                
                  </tbody>
                </Table>
                : <span>No data found</span>
              }
              <div className='pages'>
                <div className='pagebtn' onClick={handlePrev}>
                  <span>Prev</span>
                </div>
                <div className='pagebtn' onClick={()=>handlePgBtn(offset)}>
                  <span>{offset}</span>
                </div>
                <div className='pagebtn' onClick={()=>handlePgBtn(offset + 1)}>
                  <span>{offset + 1}</span>
                </div>
                <div className='pagebtn' onClick={()=>handlePgBtn(offset + 2)}>
                  <span>{offset + 2}</span>
                </div>
                <div className='pagebtn' onClick={handleNext}>
                  <span>Next</span>
                </div>
              </div>
            </div>

          </div>
       
        </Layout>
        : <div className='DeniedMsg'>
          <h1>Access Denied</h1>
          <Button className='DeniedBtn' onClick={handleAccessClick}>Click to go Home</Button>
        </div>
      }
    </div>

  );
}

export default Products;