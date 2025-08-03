import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import {  Loader } from 'rimble-ui';
import AddrJoinNav from "./AddrJoinNav.js";

const AccountsContainer = () => {
 
  return  (
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const {drizzle, drizzleState, initialized } = drizzleContext;

          if(!initialized) {
            return <Loader size="30px" color="white" />
          }
            return <AddrJoinNav  drizzleState={drizzleState} drizzle={drizzle} />
        }}
      </DrizzleContext.Consumer>
  );
  
}
export default AccountsContainer;