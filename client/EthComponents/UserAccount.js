import React from 'react';
import { ContractForm, AccountData, ContractData } from "@drizzle/react-components";
import Web3 from "web3";

class UserAccount extends React.Component {
 state = { dataKey: null };

componentDidMount() {
   const { drizzle, drizzleState } = this.props;
   const contract = drizzle.contracts.UserStorage;
   const account = drizzleState.accounts[0];
  
                                                        
  const dataKey = contract.methods['profiles'].cacheCall(account);
  this.setState({ dataKey });

 }
  

 render() {
  
   const { UserStorage } = this.props.drizzleState.contracts;
   const displayData = UserStorage.profiles[this.state.dataKey];
   const use =  displayData && displayData.value[1];
   const users = displayData && displayData.value;
   const id = [use];
   const dome = id.toString();


   
   return (
   <div>Hell: {use}</div>

   )
 }
}

export default UserAccount;

