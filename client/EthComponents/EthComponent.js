import React from 'react';
import { ContractForm, AccountData, ContractData } from "@drizzle/react-components";
import { ToastContainer } from 'react-toastify';

export default ({ accounts }) => (
  
<div>
  <ToastContainer />

  <h4>Register Account</h4>
  <AccountData accountIndex={0} units={"ether"} precision={3} />

  <h4>Get User</h4>
  <ContractData contract="UserStorage" method="addresses" methodArgs={[accounts[0]]} />

  <h4>Create User</h4>
  <ContractForm contract="UserController" method="createUser" labels={['UserName']} fromAscii />
</div>

);  


