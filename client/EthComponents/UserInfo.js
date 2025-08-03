import React from "react";

import { newContextComponents } from "@drizzle/react-components";
const { ContractData } = newContextComponents;

import Web3 from "web3";

const UserInfo = ({ drizzle, drizzleState, accounts }) => {
  return (    

            <div>
            <ContractData
              drizzle={drizzle}
              drizzleState={drizzleState}
              contract="UserStorage"
              method="profiles"
              methodArgs={[accounts[0]]} 
              render={displayData => {
              const values = Object.values(displayData);
              const username = Web3.utils.toAscii(values[1]);
              <div>{username}</div>
                        
                    }}
            />
             </div>
            )

           

}

export default UserInfo;

