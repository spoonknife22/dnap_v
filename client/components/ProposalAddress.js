import React from 'react';
const ProposalForm = ({ drizzle, drizzleState, props, propAddress, getCurrentProp, tokenId, assetPrice, userManaBalance }) => {
  const [currentProp, setCurrentProp] = useState(null);
  const [tokenIdState, setTokenId] = useState(null);
  // <ProposalAddress drizzle={drizzle} drizzleState={drizzleState} tokenIdState={tokenId} />

const fetchProposalAddress = async () => {
  setTokenId(tokenId);

  if(!tokenIdState){
    {console.log(propAddress, '!tokenIdState')}
    <div className="mx-auto align-items-center">   
      <Loader color="#007bff" size="40px" />
    </div>
  }
  if(tokenIdState){
  const proposalAddress = await drizzle.contracts.ProposalController.methods.getPropTokenIdMap(`${tokenIdState}`).call(); 
  getCurrentProp(proposalAddress);
  }
  };
useEffect(() => {
  fetchProposalAddress();
}, [tokenIdState]);

<InnerPropForm
assetPrice={parcel.publication.price}  
props={props}
drizzle={drizzle}
drizzleState={drizzleState}
tokenId={tokenId}
userManaBalance={userManaBalance}
/>



}

const mapStateToProps = (state) => ({
  propAddress: state.appReducers.propAddress,
})

const mapDispatchToProps = (dispatch) => ({
  getCurrentProp: (proposalAddress) =>  dispatch({ type: "GOT_PROP_ADDRESS", proposalAddress:proposalAddress })
});
      
      
export default connect(mapStateToProps, mapDispatchToProps)(ProposalForm);