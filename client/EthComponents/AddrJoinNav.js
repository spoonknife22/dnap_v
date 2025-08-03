import React from 'react';
import AddressBar  from "./AddressBar.js"; 
import JoinButton from "../components/buttons/JoinButton.js";

class AddrJoinNav extends React.Component {
 state = { dataKey: null,contracts: null };

async componentDidMount() {
  const { drizzle, drizzleState } = this.props;
  const contract = drizzle.contracts.UserStorage;
  const account = drizzleState.accounts[0];
  
  try {
  const dataKey = await contract.methods["addresses"].cacheCall(account);

  this.setState({ dataKey });
  } 
  catch (err) {
    this.setState({ errorMessage: err.message });
  }
 }

 componentDidUpdate(prevProps) {
  if (prevProps.drizzleState.accounts[0] !== this.props.drizzleState.accounts[0]) {
    window.location.reload();
  }
}

 render() {
    
  const { UserStorage } = this.props.drizzleState.contracts;
  const displayData = UserStorage.addresses[this.state.dataKey]; 
  let user =  displayData && displayData.value;

  if(user) {   
    return  (
              <div>
                <AddressBar drizzle={this.props.drizzle} />
              </div>
            )
            }
              return <JoinButton drizzleState ={this.props.drizzleState}/>;
            }
    }

export default AddrJoinNav;

