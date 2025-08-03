import React from 'react';
import { connect } from 'react-redux';
import { Button, Row, Form, Container, Col } from "shards-react";
import Web3 from "web3";
import Moment from "react-moment";

const UpdateForm =  ({ drizzle, drizzleState, assetPrice, listPrice, propAddress, orderId, prevOrderStatus, expiresAt, currentExpiresAt, storedOrderId  }) => { 


 const update = async () => {
  const account = await drizzleState.accounts[0];
  const contract = await drizzle.contracts[`${propAddress}`];
  try {
      contract.methods["updateContract"].cacheSend(assetPrice, currentExpiresAt, orderId, {from:`${account}`});
    } catch (err) {
      console.error("Err:", err)
    }
  }

  
if(!prevOrderStatus && !listPrice && !expiresAt) {  
  return <></>;
}

// if(prevOrderStatus && listPrice && expiresAt)  {
//   return <>k</>;
// }
else if(prevOrderStatus === 'cancelled' && storedOrderId !== orderId) {
  //else if(!prevOrderStatus) {
    return (
      <div className="funds-info-container">{console.log(prevOrderStatus, storedOrderId, orderId)}
        <Container className="funds-info-container mt-2 p-1">
          <Row className="mt-2 mb-1 justify-content-center">
            <div className="">
              <h5 className="text-dark text-center display-5 mb-3">Update Required</h5>
                {prevOrderStatus === 'cancelled' ?
                  <div className="border border-warning rounded px-3 my-2"> 
                    <Row className="update-form-row mt-1 mb-1">
                      <Col className="col-md-auto px-1">
                        <div className="update-form-row update-text order-id-text">New Order Id:</div>
                      </Col>
                      <Col className="col-sm-2 px-1">
                        <div className="update-form-row update-text text-primary order-id-text d-inline-block text-truncate">{orderId}</div>
                      </Col>
                    </Row>
                    <Row className="update-form-row mt-1">
                      <Col className="col-md-auto px-1">
                        <div className="update-form-row update-text order-id-text">Old Order Id:</div>
                      </Col>
                      <Col className="col-sm-2 px-1">
                        <div className="update-form-row update-text text-danger order-id-text d-inline-block text-truncate">{storedOrderId}</div>
                      </Col>
                    </Row>
                  </div>
                :
                  <></>
                }

                {listPrice != assetPrice && listPrice != 0 ?
                  <div className="border border-warning rounded px-3 my-2"> 
                    <Row className="mt-1 mb-1">
                      <Col className="col-md-auto px-1">
                        <div className="update-text text-dark text-primary amount-text">New Price:</div>
                      </Col>
                      <Col className="col-lg-auto px-1">
                        <div className="update-text text-primary to-high">{Web3.utils.fromWei(`${assetPrice}`,'ether')}<span className="update-text">&nbsp;MANA</span></div>
                      </Col>
                    </Row>
                    <Row className="mt-1 mb-1">
                      <Col className="col-md-auto px-1">
                        <div className="update-text order-id-text d-inline-block">Old Price:</div>
                      </Col>
                      <Col className="col-lg-auto px-1">
                        <div className="update-text text-danger">{Web3.utils.fromWei(`${listPrice}`,'ether')}<span className="update-text">&nbsp;MANA</span></div>
                      </Col>
                    </Row>
                  </div>
                :
                  <>
                  </>
              }
 
              {expiresAt != 0 && expiresAt != currentExpiresAt ?
                <div className="border border-warning rounded px-3 my-2"> 
                  <Row className="mt-1">
                    <Col className="col-xl px-1">
                      <div className="update-text text-dark text-primary mr-1 card-text">New Date:&nbsp;&nbsp;
                        <span className="text-primary update-text expire-text card-text text-left">
                          {(typeof(Number(currentExpiresAt)) == 'number')?
                            <Moment format="h:mma M/DD/YY">
                              {Number(currentExpiresAt)}
                            </Moment>       
                          :
                            'no end date'
                          }
                        </span> 
                      </div>
                    </Col>  
                  </Row>  
                  <Row className="mt-1">
                    <Col className="col-xl px-1">
                      <div className="update-text text-dark text-danger mr-1 card-text">Old Date:&nbsp;&nbsp;
                        <span className="update-text text-danger expire-text card-text">
                          {(typeof(Number(expiresAt)) == 'number')?
                            <Moment format="h:mma M/DD/YY">
                              {Number(expiresAt)}
                            </Moment>  
                      
                          :
                            'no end date'
                          }
                        </span> 
                      </div>
                    </Col>   
                  </Row>  
                </div>
              :
                <>
                </>        
              }
                  <Row className="justify-content-center">
                    <Form onSubmit={update}>
                      <Button outline theme="success" size="sm" className="mt-2 mx-auto"
                        key="submit"
                        type="button"
                        onClick={update} 
                        style={{ fontSize: 12 }}
                      >
                        Update Contract
                      </Button>
                    </Form>
                  </Row>
  
            </div> 
          </Row>
          <style jsx> {` 
              .update-form-row{line-height:1;}
              .update-text{font-family: Poppins;}
              .order-id-text{max-width:200px;color:#000;}
              .to-high(margin-top:.3rem;)
              .expire-text {color:#000;}
            `}    
          </style>
        {/* </Accordion> */}
        </Container>
      </div>
    )
  }
  else{
    return <></>;
  }


}
  

const mapStateToProps = (state) => ({
  listPrice:state.appReducers.listPrice,
  assetPrice:state.appReducers.assetPrice,
  expiresAt:state.appReducers.expiresAt,
  currentExpiresAt:state.appReducers.currentExpiresAt,
  storedOrderId:state.appReducers.storedOrderId
})

export default connect(mapStateToProps, null)(UpdateForm);
  
  