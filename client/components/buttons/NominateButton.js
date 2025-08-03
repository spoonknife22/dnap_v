import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Button } from "shards-react";
import { Loader } from 'rimble-ui';

const NominationButton = ({ transactionProcessing }) => {     

  if(!transactionProcessing)  {  

  return (
          <Button className="btn btn-block btn-success" type="submit" theme="success" >
            <p className=" contribute-form-btn mb-0">Nominate</p> 

          <style jsx>
            {`  
              .contribute-form-btn {font-family: Poppins;letter-spacing:3.5px;font-size:1.1rem;}
            `}                
          </style>
          </Button>
      )   
  } 
  if(transactionProcessing)  {
    return (   
            <div className="mx-auto">   
              <Loader color="#007bff" size="40px" />
            </div>
        )   
  }
}

const mapStateToProps = (state) => ({
  transactionProcessing: state.appReducers.transactionProcessing,
})


export default connect(mapStateToProps, null)(NominationButton);
