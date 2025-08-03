import React from "react";
import { EthAddress, Loader } from 'rimble-ui';
import { BaseStyles, theme } from "rimble-ui";
import { ThemeProvider } from "styled-components";


const customTheme = {
  backgroundColor: {
    blue: '#007bff'
  }  
};
   
const AddressBar = ({ drizzle }) => {

  let state = drizzle.store.getState();

  if (state.drizzleStatus.initialized) {
  const accounts = state.accounts;
  const account = accounts[0];

  return  <EthAddress theme={customTheme} backgroundColor='blue' address={account}  />

  }
  
    return <Loader size="30px" color="white" />
}


export default AddressBar;