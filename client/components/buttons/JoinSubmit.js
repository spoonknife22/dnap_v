import React from "react";
import { Button } from "shards-react";
import { Loader } from 'rimble-ui';

const JoinSubmitBtn = ({ drizzle, createUser }) => {
 
  let state = drizzle.store.getState();
  let transactProcessing = state.appReducers.transactionProcessing;

  if(!transactProcessing)  { 

  return (
          <Button className="btn btn-block btn-success join-form-btn" key="submit" type="button" onClick={createUser} style={{ fontSize: 16 }} > 
            ACCESS DNAP
          </Button>  
        )  
  }   
  if(transactProcessing)  { 
  return (
          <div className="mx-auto">   
            <Loader className="mx-auto" color="#007bff" size="40px" />
          </div>
 
      )   
  }

 
}
export default JoinSubmitBtn;  