import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import CustomModal from '../CustomModal/CustomModal';
import BulkImportErrorCanvas from '../CustomCanvas/bulk-import-error/bulk-import-error';
import close from '../../../assets/close.svg';
import warning from '../../../assets/warning.svg';
import './ImportProgress.css';

const ImportProgress = (props) => {
  const uploadResults = useSelector(state=>state.products.bulkUploadResult);  
  const { fileName, action } = props;
  let succPrcnt = 100;
  if (uploadResults?.successfullUploads && uploadResults?.successfullUploads && uploadResults?.failedUploads) {
    succPrcnt = 100 * (uploadResults?.successfullUploads / (uploadResults?.successfullUploads + uploadResults?.failedUploads));
  }
  const condClass = succPrcnt === 100 ? 'totalRad' : succPrcnt === 0 ? 'totalRad' : '';
  const message = 'Are you sure you want to hide this permanently?';

  const [showModal, setShowModal] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    console.log('uploadResults', uploadResults);
  }, [uploadResults]);

  const handleProgClose = () => {
    setShowModal(true);
  };

  const handleModalHide = () => {
    setShowModal(false);
  };


  return (
    <>

      { <BulkImportErrorCanvas 
        show={showCanvas} 
        handleHide={()=> setShowCanvas(false)}
        title={'Uploaded File Errors'}
        btnText={'Close'}
        errArray = {uploadResults?.errorArr ? uploadResults?.errorArr : [] }/> }

      {<CustomModal
        show={showModal} 
        handleHide={handleModalHide} 
        title={'Remove Message'} 
        modalIcon={warning} 
        message={message} 
        oneBtn={false}
        action={action}/>}

      <div className='ImportProgressWrapper w-100'>

        <div className='progHeader'>
          <div className='progTitle'>Uploaded File Status</div>
          <div className='ProgHeader_rt'>
            <img src={close} className='progIcon' onClick={handleProgClose}/>
          </div>
        </div>

        <div className='progStats'>

          <div>
            <div className='statTitle'>
              <span>File Name:</span>
            </div>
            <div className='stat'>
              <span>{fileName}</span>
            </div>
          </div>

          <div>
            <div className='statTitle'>
              <span>Status:</span>
            </div>
            <div className='progBarWapper'>
              <div className='stat'>
                <span>Completed</span>
              </div>
              <div className='progBar'>
                <div style={{width:`${succPrcnt}%`}} className={`progSucc ${condClass}`}  />
                <div style={{width:`calc(100% - ${succPrcnt}%)`}} className={`progErr ${condClass}`} />
              </div>
            </div>
          
          </div>

          <div>
            <div className='statTitle'>
              <span>Total Products:</span>
            </div>
            <div className='stat'>
              <span>{uploadResults?.successfullUploads + uploadResults?.failedUploads}</span>
            </div>
          </div>

          <div>
            <div className='statTitle'>
              <span>Successful:</span>
            </div>
            <div className='stat' style={{color:'#19C240'}}>
              <span>{uploadResults?.successfullUploads}</span>
            </div>
          </div>

          <div>
            <div className='statTitle'>
              <span>Errors:</span>
            </div>
            <div className='stat' style={{color:'#D9081C'}}>
              <span>{uploadResults?.failedUploads}</span>
            </div>
          </div>

          <div className='progBtn'>
            <Button variant='outline-primary' onClick={()=>setShowCanvas(true)}>
              <span>View Errors</span>
            </Button> 
          </div>  

        </div>
      </div>
    </>
  );
};

ImportProgress.propTypes = {
  action: PropTypes.func
};

export default ImportProgress;