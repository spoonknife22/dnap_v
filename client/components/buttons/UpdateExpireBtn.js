import React from 'react';
import { connect } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import { Button, Row, Form } from "shards-react";
import Moment from "react-moment";

const UpdateExpire =  ({ drizzle, drizzleState, expiresAt, currentExpiresAt, propAddress }) => { 

const update = async () => {
  const account = await drizzleState.accounts[0];
  const contract = await drizzle.contracts[`${propAddress}`];
  
  try {
    if(currentExpiresAt){
      contract.methods["updateExpiration"].cacheSend(currentExpiresAt, {from:`${account}`});
    }
    } catch (err) {
      console.error("Err:", err)
    }

  }

  
if(!expiresAt) {  
  return <></>;
}

else if(expiresAt == 0) {
  return <></>;
}

else if(expiresAt) {
  return <></>;
}
else if(expiresAt != 0 && expiresAt != currentExpiresAt)  {
  return (
      <Accordion defaultActiveKey="1">
        <Row className=" mt-2 mb-1 justify-content-center">
          <div>
            <Accordion.Toggle as={Button} className="px-2.5 py-1.5" variant="link" eventKey="0" theme="warning" outline >
            <div className="expire-text" >Update Expiration:</div>
              <Row className="mt-1 justify-content-center">
                <div className="mr-1 text-right card-text">Old Date:</div>
                <div className="text-left card-text">
                  {(typeof(Number(expiresAt)) == 'number')?
                    <Moment format="h:mma M/DD/YY">
                      {Number(expiresAt)}
                    </Moment>       
                  :
                    'no end date'
                  }
                </div> 
              </Row>  
              <Row className="mt-1 justify-content-center">
                <div className="mr-1 text-right card-text">New Date:</div>
                <div className="text-left card-text">
                  {(typeof(Number(currentExpiresAt)) == 'number')?
                    <Moment format="h:mma M/DD/YY">
                      {Number(currentExpiresAt)}
                    </Moment>       
                  :
                    'no end date'
                  }
                </div> 
              </Row>  
            </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Row className="justify-content-center text-left">
                  <Form onSubmit={update}>
                    <Button outline theme="success" size="sm" className="mt-2 mx-auto"
                      key="submit"
                      type="button"
                      onClick={update} 
                      style={{ fontSize: 12 }}
                    >
                      Update Expiration
                    </Button>
                  </Form>
                </Row>
              </Accordion.Collapse>
          </div> 
        </Row>
        <style jsx> {` 
            .expire-text {font-size:.95rem;color:#000;font-weight:400;font-family: Poppins;}
          `}    
        </style>
      </Accordion>
    )
}
else {
  return <></>;
}

}


const mapStateToProps = (state) => ({
  expiresAt:state.appReducers.expiresAt,
  currentExpiresAt:state.appReducers.currentExpiresAt
})

export default connect(mapStateToProps, null)(UpdateExpire);




