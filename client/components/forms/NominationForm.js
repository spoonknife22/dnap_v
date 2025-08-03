import React from "react";
import Web3 from "web3";
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import NominationButton from '../buttons/NominateButton';

const Input = ({ title, value, onChange, type, placeholder, maxLength }) => (   
  <div>
    <label className="mt-4">
      {title}   
    </label>
    <input className="form-control form-control-sm" value={value} onChange={onChange} type={type} placeholder={placeholder} maxLength={maxLength} /> 
  </div>
) 

class NominationForm extends React.Component {
  constructor(props){   
    super(props);
    this.state = { 
    text: "",
    reSalePrice: "",
    //currentProp: false 
  };
}


updateField = (fieldName, e) => {
  const newState = {}
  newState[fieldName] = e.target.value
  this.setState(newState)
}

nominateAsset = async (e) => {
  e.preventDefault() 

  // Some quick validation checks
  for (let key in this.state) {    
    if (!this.state[key]) {
      return toast.warning(`You must fill in your ${key}!`,{ position: toast.POSITION.TOP_RIGHT })
    }
  }
    const { text, reSalePrice } = this.state;    
    const { drizzle, drizzleState, tokenId } = this.props;
    const account = drizzleState.accounts[0];
    const memberBool = await drizzle.contracts.UserStorage.methods.addresses(account).call();
    const listPrice = this.props.assetPrice;
   
    if(memberBool) {
      const user = await drizzle.contracts.UserStorage.methods.profiles(account).call();
      const { userId } = user;
      const contract = drizzle.contracts.ProposalController;
    try {
        contract.methods["createProposal"].cacheSend(userId, listPrice, reSalePrice, text, tokenId,{gas:100000} );
    } catch (err) {
        return toast.error(`Sorry, we couldn't create asset nomination: ${err}`,{ position: toast.POSITION.TOP_RIGHT })
    }
  }
    else {
      return toast.warning( `Join the Consortium and nominate this asset`, { position: toast.POSITION.TOP_RIGHT });
  }
}
  render() {
    return (
      <div>
        <form onSubmit={this.nominateAsset}>
          <div className="contribute-form-dialog">
            <Input 
              title="Pitch"
              maxLength="55"   
              placeholder="Why this asset" 
              onChange={e => this.updateField("text", e)} 
            />
            <Input 
              title="Resale Price"
              placeholder="MANA" 
              onChange={e => this.updateField("reSalePrice", e)} 
            />
          </div> 
          <Modal.Footer>
            <NominationButton drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} nominateAsset={this.nominateAsset} tokenId={this.props.tokenId} />
          </Modal.Footer>
        </form>
        <style jsx>
          {`
            .contribute-form-dialog {font-family: Poppins; font-size:1rem;}
          `}                
        </style>
      </div>
    ) 
  }
  
}

export default NominationForm; 

