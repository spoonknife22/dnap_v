import React from "react";
import Web3 from "web3";
import { toast } from 'react-toastify';
import JoinSubmitBtn from '../buttons/JoinSubmit';


const Input = ({ title, value, onChange }) => (
  <div>
    <label>
      {title}   
    </label>
    <input className="form-control form-control-sm" value={value} onChange={onChange} />
  </div>   
) 

class JoinForm extends React.Component {
  state = { username:"", };


updateField = (fieldName, e) => {
  const newState = {}
  newState[fieldName] = e.target.value;
  this.setState(newState)
}

createUser = async (e) => {
  e.preventDefault() 

  for (let key in this.state) {
    if (!this.state[key]) {
      return toast.warning( `You must fill in your ${key}!`, { position: toast.POSITION.TOP_RIGHT });
    }
  }
    const { username } = this.state;
    const { drizzle } = this.props;
    const userNameCheck = Web3.utils.fromAscii(username)
    const userNameBool = await drizzle.contracts.UserStorage.methods.usernameBool(userNameCheck).call()

    if(!userNameBool)  {
    const contract = drizzle.contracts.UserController;
    const uName = Web3.utils.fromAscii(username);
   
    try {
    contract.methods["createUser"].cacheSend(uName);
  } catch (err) {
    console.error("Err:", err)
  }
}
    else {
      return toast.warning( `Username ${username} is already in use`, { position: toast.POSITION.TOP_RIGHT });
    }
}

  render() {
    return (
      <div>
        <form onSubmit={this.createUser}>
          <div className='join-form-dialog modal-body'>
          <p>Gain access to the Decentralized NFT Acquisition Protocol and take advantage of this pooled investment strategy</p>
          <Input 
            title="Desired Username" 
            onChange={e => this.updateField("username", e)} 
          />  
          </div> 
          <div className="modal-footer">
            <JoinSubmitBtn  onClose={this.props.onClose} drizzle={this.props.drizzle}  createUser={this.createUser} />
          </div>
        </form>
    
        <style jsx>
          {`  .join-form-btn {font-family: Poppins;letter-spacing:5.5px;}
              .join-form-dialog {font-family: Poppins; font-size:1rem;}
          `}                
        </style>
      </div>
    )
  }
  
}


export default JoinForm; 