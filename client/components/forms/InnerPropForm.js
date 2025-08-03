import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import {Formik} from 'formik';
import  * as Yup from 'yup';
import { Button, Row } from "shards-react";
import { toast } from 'react-toastify';
import NominationButton from '../buttons/NominateButton';
import { Loader } from 'rimble-ui';
import InitialContributeModal from '../modals/InitialContibModal';
import Web3 from "web3";
import Accordion from 'react-bootstrap/Accordion';

  

const InnerPropForm = ({ drizzle, drizzleState, prevOrderStatus, props, propAddress, tokenId, assetPrice, userManaBalance, expiresAt, orderId, orderStatus, storedOrderId }) => {
  let web3 = new Web3(Web3.givenProvider);
  const [currentProp, setCurrentProp] = useState(null);
  const listPrice = web3.utils.fromWei(`${assetPrice}`,'ether');

  //Test network address
  const nftAddress = '0x804516C4c64E3D2a78ef5eAc0E6a57A0b6bB96B3';
           
  useEffect(() => {
    setCurrentProp(propAddress);
  }, [propAddress])

  const nominateAsset = async (values) => {
    const { salePrice } = values;

    const reSalePrice = web3.utils.toWei(`${salePrice}`,'ether');
  
    const account = drizzleState.accounts['0'];
    const memberBool = await drizzle.contracts.UserStorage.methods.addresses(account).call();
   
    if(memberBool) {
      const user = await drizzle.contracts.UserStorage.methods.profiles(account).call();
      const { userId } = user;
      const contract = await drizzle.contracts.ProposalController;
    try {
      contract.methods["createProposal"].cacheSend(orderId, userId, expiresAt, assetPrice, reSalePrice, tokenId, nftAddress );
 
    } catch (err) {
        return toast.error(`Sorry, we couldn't create asset nomination: ${err}`,{ position: toast.POSITION.TOP_RIGHT })
    }
  }
    else {
      return toast.warning( `Join the Consortium and nominate this asset`, { position: toast.POSITION.TOP_RIGHT });
  }
}

let yup = require('yup');
const schema = yup.object({
  // text: yup.string()
  // .max(100, 'To many characters')
  // .required('Required'),
  salePrice: yup.number()
  .typeError("Must be a number")
  .moreThan(listPrice.toString(), 'Must be more than current price.')
  .required('Required'),
  termsOfService: yup.bool().oneOf([true], "You must accept the terms and conditions")
});

if(currentProp === null) {
  return (
    <div className="align-items-center">   
      {currentProp} InnerPropForm 65  
      <Loader className="mx-auto" color="#007bff" size="40px" />
    </div>
  )
}

//if(currentProp === '0x0000000000000000000000000000000000000000' || prevOrderStatus === 'cancelled' ) {
if(currentProp === '0x0000000000000000000000000000000000000000' && orderStatus != 'sold') {
  return (   
    <>
      <Row>
      <Accordion  defaultActiveKey="1">
            <div className="pr-2">
            <Accordion.Toggle as={Button} size="md" variant="link" eventKey="0" outline theme="light">
            <div>DNAP Details</div>
            </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <div className="mb-1">
                  <small className="text-muted"> In the 1st year the asset will go on sale at the resale price. If it is not sold in the 1st year it will go on sale for the purchase price. If it is not sold after 2 years the asset will be awarded to one of the owners through a weighted random number generation.</small>
                </div>
              </Accordion.Collapse>
            </div> 
          </Accordion>
      </Row>

      <Formik
        initialValues={{
        salePrice: '',
        termsOfService:false,
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
        nominateAsset(values);
        addReview(values);
        }}
      >
        {({   
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
        }) => (
    
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Row className="mt-3 justify-content-center">
          <Form.Group controlId="validationFormik02">
            <Form.Control
              size="md"
              type="text" 
              name="salePrice"
              placeholder="Resale Price"
              value={values.salePrice}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.salePrice && !!errors.salePrice}
              isValid={values.salePrice}
            />
            <Form.Control.Feedback type="invalid">  
            {errors.salePrice}
            </Form.Control.Feedback>
          </Form.Group>
          </Form.Row>
          <Form.Row className="justify-content-center">
            <Form.Group>
              <Form.Check
                required
                name="termsOfService"
                label="Agree to terms and conditions"
                onChange={handleChange}
                isInvalid={!!errors.termsOfService}
                feedback={errors.termsOfService}
                id="validationFormik0"
              />
            </Form.Group>
          </Form.Row>
          <Modal.Footer>
            <NominationButton props={props} tokenId={tokenId} />
          </Modal.Footer>
        </Form>
        )}
      </Formik>
    </>
  );   
}        
 if(currentProp !== 'undefined'){
    return (
        <div>
          <InitialContributeModal 
            propAddress={currentProp} 
            userManaBalance={userManaBalance}
            assetPrice={assetPrice} 
            drizzleState={drizzleState} 
            drizzle={drizzle} 
            tokenId={tokenId} 
            currentExpiresAt={expiresAt}
            orderStatus={orderStatus}
            orderId={orderId}
            prevOrderStatus={prevOrderStatus}
            storedOrderId={storedOrderId}
          />
        </div>
    )
  }
  else{
    return(
      <></>
    )
  }
} 

const mapStateToProps = (state) => ({
  propAddress: state.appReducers.propAddress
})
     
export default connect(mapStateToProps, null)(InnerPropForm);