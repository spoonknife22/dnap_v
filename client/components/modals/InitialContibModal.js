import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContributeInnerModal from './ContributeInnerModal.js';
import ProposalStorageAbi from '../../artifacts/contracts/ProposalStorage.json';

   
class InitialContributeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newAbi:null,
      approvedAmmount:null
    }
  }

 async componentDidMount() {   
    const { getPropAbi, getAssetData, assetPrice, currentExpiresAt } = this.props;
    getPropAbi(ProposalStorageAbi.abi);
    getAssetData(assetPrice, currentExpiresAt);
  }
  
  render() {
    return (
      <ContributeInnerModal
        props = {this.props}
      /> 
    )
  }
}   

const mapDispatchToProps = (dispatch) => ({
  getPropAbi: (ProposalStorageAbi) =>  dispatch({ type: "GOT_PROP_ABI", proposalStorageAbi:ProposalStorageAbi }),
  getAssetData: (assetPrice, currentExpiresAt) =>  dispatch({ type: "GOT_ASSET_DATA", assetPrice:assetPrice, currentExpiresAt:currentExpiresAt })
});

export default connect(null, mapDispatchToProps)(InitialContributeModal);