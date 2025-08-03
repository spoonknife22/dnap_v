import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import {Formik} from 'formik';
import  * as Yup from 'yup';
import { Col } from "shards-react";
import { toast } from 'react-toastify';
import NominationButton from '../buttons/NominateButton';
import { Loader } from 'rimble-ui';
import InitialContributeModal from '../modals/InitialContibModal';
import Web3 from "web3";
      
  

const PropNominationForm = ({ drizzle, drizzleState, props, propAddress, tokenId, assetPrice, userManaBalance, expiresAt, orderId, orderStatus, storedOrderId }) => {
  let web3 = new Web3(Web3.givenProvider);
  const [currentProp, setCurrentProp] = useState(null);
  const listPrice = web3.utils.fromWei(`${assetPrice}`,'ether');
  console.log(orderId, storedOrderId)
  //Test network address
  const nftAddress = '0x804516C4c64E3D2a78ef5eAc0E6a57A0b6bB96B3';
           
  useEffect(() => {
    setCurrentProp(propAddress);
  }, [propAddress])

  const nominateAsset = async (values) => {
    const { text, salePrice } = values;

    const reSalePrice = web3.utils.toWei(`${salePrice}`,'ether');
  
    const account = drizzleState.accounts['0'];
    const memberBool = await drizzle.contracts.UserStorage.methods.addresses(account).call();
   
    if(memberBool) {
      const user = await drizzle.contracts.UserStorage.methods.profiles(account).call();
      const { userId } = user;
      const contract = await drizzle.contracts.ProposalController;
    try {
      contract.methods["createProposal"].cacheSend(orderId, userId, expiresAt, assetPrice, reSalePrice, text, tokenId, nftAddress );
 
    } catch (err) {
        return toast.error(`Sorry, we couldn't create asset nomination: ${err}`,{ position: toast.POSITION.TOP_RIGHT })
    }
  }
    else {
      return toast.warning( `You must gain "Access" to nominate this asset`, { position: toast.POSITION.TOP_RIGHT });
  }
}

let yup = require('yup');
const schema = yup.object({
  text: yup.string()
  .max(100, 'To many characters')
  .required('Required'),
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

// if(currentProp === '0x0000000000000000000000000000000000000000' || orderId !== storedOrderId) {
if(currentProp === '0x0000000000000000000000000000000000000000') {
  return (   
    <> {console.log(orderId, storedOrderId)}
      <Formik
        initialValues={{
        text: '',
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
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationFormik01">
                <Form.Label>Pitch</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea" 
                  rows={3}
                  name="text"
                  placeholder='100 Character Max'
                  value={values.text}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={values.text}
                  isInvalid={touched.text && !!errors.text}
                  />
                <Form.Control.Feedback type="invalid">
                  {errors.text}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormik02">
                <Form.Label>Resale Price</Form.Label>
                <Form.Control
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
            storedOrderId={storedOrderId}
          />
        </div>
    )
  }
  else{
    return(
      <div>InnerPropFor 167</div>
    )
  }
} 

const mapStateToProps = (state) => ({
  propAddress: state.appReducers.propAddress
})
     
export default connect(mapStateToProps, null)(PropNominationForm);