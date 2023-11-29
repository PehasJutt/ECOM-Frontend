import React ,{ useEffect, useState, useRef } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import CopyToClipboard from 'react-copy-to-clipboard';
import { notification } from 'antd';

import { 
  fetchProducts,
  getSharedProduct,
  productDetails
} from '../../reducers/product';
import { AddToCart } from '../../reducers/cart';
import Layout from '../Layout/Layout';
import SearchBar from '../SubComponents/SearchBar/SearchBar';
import FilterDropdown from '../SubComponents/FilterDropdown/FilterDropdown';
import ProductListing from '../SubComponents/ProductListing/ProductListing';
import rightArrow from '../../assets/rightArrow.svg';
import arrowLeft from '../../assets/leftArrow.svg';
import shareIcon from '../../assets/share.png';
import './Home.css';

function Home() {

  const [prodQty, setProdQty] = useState(1);
  const rcvdProds = useSelector(state=>state.products);  
  const [detailObj, setDetailObj] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [queryString, setQueryString] = useState(null);
  const [textToCopy, setTextToCopy] = useState('');
  const [limit, setLimit] = useState(8);
  const [prodFilters, setProdFilters] = useState([]);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const loaderRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loadMore = async () => {
    if (rcvdProds.netCount > rcvdProds.total){
      dispatch (fetchProducts({
        limit,
        filterArr: prodFilters,
        select: 'thumbnail description price stock'
      }));
      // console.log('loadMore', limit);
    }
  };

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      setLimit((num) => num + 4);
      loadMore();
    }
  }, options);

  useEffect(() => {
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    } 

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
    
  }, [loadMore]);

  useEffect (() => {
    console.log('initial called');
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id) dispatch (getSharedProduct({id}));
    else { 
      dispatch (fetchProducts({
        limit: 8,
        filterArr: prodFilters,
        select: 'thumbnail description price stock'
      }));
    }
  },[]);

  useEffect(() => {
    if (rcvdProds?.data?.length) {
      dispatch (productDetails({
        id: rcvdProds.data[0]._id
      }));
      
    } else {
      setDetailObj(null);
    }
    if(limit > 8) {
      document.getElementById(`product-${limit - 10}`)?.scrollIntoView();
    }
  }, [rcvdProds.data]);

  useEffect(() => {
    if (rcvdProds?.prodDetail) {
      setDetailObj(rcvdProds.prodDetail);
      setSelectedImage(null);
      setTextToCopy(`http://localhost:3000/?id=${rcvdProds.prodDetail._id}`);
      setColor(null);
      setSize(null);
    } else {
      setDetailObj(null);
    }
  }, [rcvdProds.prodDetail]);

  useEffect(() => {
    if (queryString!==null){
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
    }
  }, [queryString]);

  useEffect(() => {
    if(prodFilters.length) {
      console.log('filter dispatch');
      dispatch (fetchProducts({
        limit: 4,
        filterArr: prodFilters,
        select: 'thumbnail description price stock'
      }));
    }
  }, [prodFilters]);

  useEffect(() => {
    if(detailObj.stock && color && size) setIsDisabled(false);
    else setIsDisabled(true);
  }, [color, size]);

  const SelectProduct = (prod) => {
    dispatch (productDetails({
      id: prod._id
    }));
  };

  const handleSort = (type) => {
    const sortFilter = {
      field: 'sort',
      value: type      
    };
    const filtersArray  = [...prodFilters];
    const index  = filtersArray.findIndex( filter => filter.field === sortFilter.field);
    if( index !== -1 ) filtersArray[index] = sortFilter;
    else filtersArray.push(sortFilter);
    setProdFilters(filtersArray);
  };

  const handleSizeFilter = (size) => {
    const sizeFilter = {
      field: 'size',
      value: size      
    };
    const filtersArray  = [...prodFilters];
    const index  = filtersArray.findIndex( filter => filter.field === sizeFilter.field);
    if( index !== -1 ) filtersArray[index] = sizeFilter;
    else filtersArray.push(sizeFilter);
    setProdFilters(filtersArray);
  };

  const handlePriceFilter = (min,max) => {
    const priceFilter = {
      field: 'price'
    };
    if (min || max) priceFilter.value = {min, max};
    else priceFilter.value = null;
   
    const filtersArray  = [...prodFilters];
    const index  = filtersArray.findIndex( filter => filter.field === priceFilter.field);
    if( index !== -1 ) filtersArray[index] = priceFilter;
    else filtersArray.push(priceFilter);
    setProdFilters(filtersArray);
  };

  const handleColorFilter = (color) => {
    const colorFilter = {
      field: 'color',
      value: color
    };
    const filtersArray  = [...prodFilters];
    const index  = filtersArray.findIndex( filter => filter.field === colorFilter.field);
    if( index !== -1 ) filtersArray[index] = colorFilter;
    else filtersArray.push(colorFilter);
    setProdFilters(filtersArray);
  };

  const handleProdInc = () => {
    if (prodQty < detailObj.stock) {
      setProdQty(prodQty + 1);
    } else {
      notification.warning({
        message: 'Cannot Add More',
        description: 'Sorry, We have limited stock for this Product',
        duration: 2
      });
    }
  };

  const handleProdDec = () => {
    if ( prodQty > 1)
      setProdQty(prodQty - 1);
  };

  const handleAddToCart = () => {
    if (localStorage.getItem('token')) {
      dispatch(AddToCart({
        prod: detailObj,
        qty: prodQty,
        color,
        size,
        isSelected: false
      }));
      navigate('/ordersummary');
    } else 
      navigate('/login');
  };

  const handleCopy = () => {
    notification.success({
      message: 'Copied To Clipboard',
      description: 'You can spread the link now...!',
      duration: 2
    });
  };

  const priceOptions = [
    {data: 'Default', onClick: ()=>{handlePriceFilter();} },
    {data: '$0 - $20', onClick: ()=>{handlePriceFilter(0,20);} },
    {data: '$20 - $40', onClick: ()=>{handlePriceFilter(20,40);} },
    {data: '$40 - $60', onClick: ()=>{handlePriceFilter(40,60);} },
    {data: '$60 - $80', onClick: ()=>{handlePriceFilter(60,80);} },
    {data: '$80 - $100', onClick: ()=>{handlePriceFilter(800,100);} }
  ];
  const colorOptions = [
    {data: 'Default', onClick: ()=>{handleColorFilter();} },
    {data: 'Black', onClick: ()=>{handleColorFilter('black');} },
    {data: 'Red', onClick: ()=>{handleColorFilter('red');} },
    {data: 'Green', onClick: ()=>{handleColorFilter('green');} },
    {data: 'Orange', onClick: ()=>{handleColorFilter('orange');} },
    {data: 'Blue', onClick: ()=>{handleColorFilter('blue');} }
  ];
  const SizeOptions = [
    {data: 'Default', onClick: ()=>{handleSizeFilter();} },
    {data: 'XS', onClick: ()=>{handleSizeFilter('XS');} },
    {data: 'S', onClick: ()=>{handleSizeFilter('S');} },
    {data: 'M', onClick: ()=>{handleSizeFilter('M');} },
    {data: 'L', onClick: ()=>{handleSizeFilter('L');} },
    {data: 'XL', onClick: ()=>{handleSizeFilter('XL');} }
  ];
  const SortingOptions = [
    {data: 'Default', onClick: ()=>{handleSort();} },
    {data: 'Price Low to High', onClick: ()=>{handleSort(1);} },
    {data: 'Price High to Low', onClick: ()=>{handleSort(2);} },
    {data: 'Newest Products', onClick: ()=>{handleSort(3);}}
  ];

  const handleCaroselClick = (imgSrc) => {
    setSelectedImage(imgSrc);
  };

  return (

    <div>
     
      <Layout isAdmin={false}>

        <div className='HomepageHeader'>
          <h4 className='HomepageHeading'>Heading</h4>
          <div className='HomepageFilter'> 
            <span className='FilterTitle'>Filters:</span>
            <FilterDropdown 
              titleMargin={'27px'} 
              title={'Price'}
              menuWidth={'101px'} 
              dropdownOptions={priceOptions} 
              lineSeparated={true}/>
            <FilterDropdown titleMargin={'27px'} 
              title={'Color'} menuWidth={'103px'}
              dropdownOptions={colorOptions} 
              lineSeparated={true}
            />
            <FilterDropdown titleMargin={'27px'} title={'Size'} menuWidth={'95px'} dropdownOptions={SizeOptions} lineSeparated={true}/>
            <span className='FilterTitle'>Sorting:</span>
            <FilterDropdown titleMargin={'54px'} title={'Default Sorting'} menuWidth={'200px'} dropdownOptions={SortingOptions} lineSeparated={true}/>
            <SearchBar
              onSearchChange={setQueryString}
              width={'248px'}
              placeholder={'Search by name'}
            />
          </div>
        </div>

        <div className='HomepageMainSection'>

          <div className='HomeSection_lt'>
            <div className='HomeSection_CardWrapper'>
              {rcvdProds.loading && <Spinner
                as='span'
                animation='border'
                size='lg'
                variant='primary'
                role='status'
                aria-hidden='true'
                className='Spinner'
              />}
              { rcvdProds?.data && !rcvdProds.rejected ? 
                !rcvdProds.loading && rcvdProds.data.length ?
                  <>
                    {rcvdProds.data.map((product, index) => 
                      <ProductListing prodData={product} key={product._id} prodSelector={SelectProduct} id={`product-${index}`}/> 
                    )}
                    {rcvdProds.total >= 4 && rcvdProds.netCount > rcvdProds.total &&  <div ref={loaderRef}>{'Loading...'}</div>}
                  </>
                  : <span>No data found</span>
                : <span>Something bad happened</span>
              }
            </div>
          </div>

          <div className='HomeSection_rt'>

            {!rcvdProds.rejected  ? 
              detailObj ?
                <>
                  <div className='ProdDetailWrapper'>
                    <div className='DetailImageWrapper'>
                      <div className='ProdMainImageWrapper' >
                        <img src={selectedImage || detailObj.thumbnail} className='prodMainImage' />
                      </div>
                      <div className='HomePageCaroselWrapper'>
                        <img src={arrowLeft} className='ProdDetCaroselArrow'/>
                        { detailObj?.images?.length &&  detailObj.images[0] && 
                  <div className='ProdCaroselImageWrapper' onClick={() => handleCaroselClick(detailObj.images[0])}>
                    <img 
                      src = { detailObj?.images?.length ?  detailObj.images[0] :  detailObj.thumbnail } 
                      className='ProdCaroselImage'
                    />   
                  </div>  }             
                        { detailObj?.images?.length &&  detailObj.images[1] && 
                  <div className='ProdCaroselImageWrapper' onClick={() => handleCaroselClick(detailObj.images[1])}>
                    <img 
                      src = { detailObj?.images?.length ?  detailObj.images[1] :  detailObj.thumbnail } 
                      className='ProdCaroselImage'
                    />   
                  </div>  }  
                        { detailObj?.images?.length &&  detailObj.images[2] && 
                  <div className='ProdCaroselImageWrapper' onClick={() => handleCaroselClick(detailObj.images[2])}>
                    <img 
                      src = { detailObj?.images?.length ?  detailObj.images[2] :  detailObj.thumbnail } 
                      className='ProdCaroselImage'
                    />   
                  </div>  }  
                        { detailObj?.images?.length &&  detailObj.images[3] && 
                  <div className='ProdCaroselImageWrapper' onClick={() => handleCaroselClick(detailObj.images[3])}>
                    <img 
                      src = { detailObj?.images?.length ?  detailObj.images[3] :  detailObj.thumbnail } 
                      className='ProdCaroselImage'
                    />   
                  </div>  }  

                        <img src={rightArrow} className='ProdDetCaroselArrow'/>
                      </div>
                    </div>
                    <div className='ProdDetailSect_rt'>
                      <span className='ProdDetailDesc'>{detailObj.description}</span>
                      <span className='ProdDetailTitle'>Color:</span>
                      <div className='ProdDetailColors'>
                        <div
                          className={color?.code === '#155724' ? 'ProdDetailColorWrapper selectedItem' : 'ProdDetailColorWrapper'}
                          onClick={() => setColor({name: 'Dark Green', code: '#155724'})}
                        >
                          <div className='ProdDetailColor' style={{background:'#155724'}} />
                        </div>
                        <div
                          className={color?.code === '#AAA' ? 'ProdDetailColorWrapper selectedItem' : 'ProdDetailColorWrapper'}
                          onClick={() => setColor({name: 'Absolute Grey', code: '#AAA'})}
                        >
                          <div
                            className='ProdDetailColor' style={{background:'#AAA'}} />
                        </div>
                        <div
                          className={color?.code === '#1B1E21' ? 'ProdDetailColorWrapper selectedItem' : 'ProdDetailColorWrapper'}
                          onClick={() => setColor({name: 'Pitch Black', code: '#1B1E21'})}
                        >
                          <div className='ProdDetailColor' style={{background:'#1B1E21'}} />
                        </div>
                        <div
                          className={color?.code === '#231579' ? 'ProdDetailColorWrapper selectedItem' : 'ProdDetailColorWrapper'}
                          onClick={() => setColor({name: 'Deep Purple', code: '#231579'})}
                        >
                          <div className='ProdDetailColor' style={{background:'#231579'}} />
                        </div>
                        <div
                          className={color?.code === '#740F0F' ? 'ProdDetailColorWrapper selectedItem' : 'ProdDetailColorWrapper'}
                          onClick={()=>setColor({name: 'Maroon Red', code: '#740F0F'})}
                        >
                          <div className='ProdDetailColor' style={{background:'#740F0F'}} />
                        </div>
                      </div>

                      <span className='ProdDetailTitle'>Sizes:</span>
                      <div className='ProdDetailSizes'>
                        <div 
                          className={size === 'XS' ? 'ProdDetailSize selectedItem' : 'ProdDetailSize'}
                          onClick={()=>setSize('XS')}>XS</div>
                        <div 
                          className={size === 'X' ? 'ProdDetailSize selectedItem' : 'ProdDetailSize'}

                          onClick={()=>setSize('X')}>X</div>
                        <div 
                          className={size === 'M' ? 'ProdDetailSize selectedItem' : 'ProdDetailSize'}

                          onClick={()=>setSize('M')}>M</div>
                        <div 
                          className={size === 'L' ? 'ProdDetailSize selectedItem' : 'ProdDetailSize'}

                          onClick={()=>setSize('L')}>L</div>
                        <div 
                          className={size === 'XL' ? 'ProdDetailSize selectedItem' : 'ProdDetailSize'}

                          onClick={()=>setSize('XL')}>XL</div>
                        <div 
                          className={size === '2XL' ? 'ProdDetailSize selectedItem' : 'ProdDetailSize'}

                          onClick={()=>setSize('2XL')}>2XL</div>
                        <div 
                          className={size === '3XL' ? 'ProdDetailSize selectedItem' : 'ProdDetailSize'}

                          onClick={()=>setSize('3XL')}>3XL</div>
                      </div>

                      <div className='ProdDetialPriceWrapper'>
                        <span className='ProdDetailTitle'>Price:</span> 
                        <span className='ProdDetailPrice'>${detailObj.price}</span>
                      </div>

                    </div>
                  </div>

                  <hr className='HomePageHR'/>

                  <div className='ProdDetailLowerSection'>
                    <div>
                      <span className='ProdDetailTitle'>Quantity: </span>
                      <div className='ProdQtyWrapper'>
                        <div className='ProdQtyMark'onClick={handleProdDec}>-</div>
                        <div className='ProdQty'>{detailObj?.stock > 0 ? prodQty : 0}</div>
                        <div className='ProdQtyMark' onClick={handleProdInc}>+</div>
                      </div>
                    </div>
                    <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
                      <img src={shareIcon} className='shareIcon' />
                    </CopyToClipboard>
                  </div>

                  <Button variant='primary' className='w-100' disabled={isDisabled} onClick={handleAddToCart}>Add to Cart</Button>
                </>
                : <span>No data found</span>
              : <span> Something bad happened</span>
            }
          </div>
         
        </div>
      </Layout>
    </div>

  );
}

export default Home;
