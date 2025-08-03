//NOT IN USE

import EthComponent from "./EthComponent";
import { drizzleConnect } from "@drizzle/react-plugin";


const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    accounts: state.accounts,
    UserStorage: state.contracts.UserStorage,
    UserController: state.contracts.UserController
  };
};

const DrizzleContainer = drizzleConnect(EthComponent, mapStateToProps);

export default DrizzleContainer;
 

