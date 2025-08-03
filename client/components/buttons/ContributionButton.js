import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Button } from "shards-react";
import { Loader } from 'rimble-ui';

const ContributeButton = ({ transactionProcessing }) => {     

  // let state = drizzle.store.getState();
  // let transactProcessing = state.transactionProcessing;
 
  // useEffect(  () => {

  //   if(transactProcessing){ 
  //     setShow(true);
  //   }
  //   else{
  //   setShow(false);
  //   }
  // }, [transactProcessing]);   

  if(!transactionProcessing)  {  
    
  return (
          <Button className="btn btn-block btn-success contribute-form-btn" key="submit" type="button" onClick={nominateAsset}  theme="success" >
            <p className="mb-0">Contribute</p>
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

const mapDispatchToProps = (dispatch) => ({
  nominationProcess: () =>  dispatch({ type: "NOM_TX_PROCESSING" })
});


export default connect(mapStateToProps, mapDispatchToProps)(ContributeButton);
//export default NominationButton;