import { connect } from 'react-redux';
import SoldAssetCards from "./cards/SoldAssetCard.js";
import Web3 from "web3";

let web3 = new Web3(Web3.givenProvider);

class SoldDna extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manaBalance:null
    }
  }
  
  async componentDidMount() {   
    const { drizzle, drizzleState } = this.props;
    const account = drizzleState.accounts[0];
    const userManaBalanceConvert = await drizzle.contracts.MANAToken.methods.balanceOf(account).call();
    const userManaBalanceOriginal = web3.utils.fromWei(`${userManaBalanceConvert}`,'ether');
    const userManaBalance = Number.parseFloat(userManaBalanceOriginal).toFixed(0);
    this.setState({
      manaBalance: userManaBalance
    });
  };

  render() {    

    return (
    <>
      <SoldAssetCards
        props={this.props} 
        userManaBalance ={this.state.manaBalance}
      />
      <style jsx>{` .card-text {margin-bottom:.1rem;font-family: Poppins;}
                .card {font-size: 10px;width:70%;margin-bottom:0;}
                .card-header {font-family: Poppins;padding: .3rem 2.2rem;background-color: #f2f2f2;font-size:17px;font-weight:500;}
                .card-body {padding: .6rem;font-size:17px;font-weight:400;} 
                .joinButton {letter-spacing: 2.5px;}
                `}  
      </style>
    </>
    )   
  }  
}
  
const mapStateToProps = (state) => ({
 propAddress: state.appReducers.propAddress,
 proceessing: state.appReducers.transactionProcessing
})

export default connect(mapStateToProps, null)(SoldDna);


