import React from 'react';
import { connect } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import { Button, Row, Form } from "shards-react";
import Web3 from "web3";

const UpdatePrice =  ({ drizzle, drizzleState, assetPrice, listPrice, propAddress }) => { 

const update = async () => {
  const account = await drizzleState.accounts[0];
  const contract = await drizzle.contracts[`${propAddress}`];
  
  try {
      contract.methods["updatePrice"].cacheSend(assetPrice, {from:`${account}`});
    } catch (err) {
      console.error("Err:", err)
    }
  }

  
if(!listPrice) {  
  return <></>;
}

else if(listPrice)  {
  return <></>;
}
else if(listPrice != assetPrice && listPrice != 0) {
    return (
      <Accordion defaultActiveKey="1">
        <Row className=" mt-2 mb-1 justify-content-center">
          <div>
            <Accordion.Toggle as={Button} className="px-2.5 py-1.5" variant="link" eventKey="0" theme="warning" outline >
            <div className="amount-text" >Update Price:</div>
            <div className="amount-text" >Current Price: <span className="amount-number">{Web3.utils.fromWei(`${assetPrice}`,'ether')}</span> MANA</div>
            <div className="amount-text" >Original Price: <span className="original-amount-number">{Web3.utils.fromWei(`${listPrice}`,'ether')}</span> MANA</div>
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
                      Update Price
                    </Button>
                  </Form>
                </Row>
              </Accordion.Collapse>
          </div> 
        </Row>
        <style jsx> {` 
            .amount-text {font-size:.8rem;color:#000;font-family: Poppins;}
            .amount-number {font-size:.8rem;color:#66a3ff;font-family: Poppins}
            .original-amount-number{font-size:.8rem;color:#c4183c;font-family: Poppins}
          `}    
        </style>
      </Accordion>
    )
  }
  else{
    return <></>;
  }

}


const mapStateToProps = (state) => ({
  listPrice:state.appReducers.listPrice,
  assetPrice:state.appReducers.assetPrice
})

export default connect(mapStateToProps, null)(UpdatePrice);



