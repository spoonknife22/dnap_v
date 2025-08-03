import React from "react";
import Web3 from "web3";
import { Nav  } from "shards-react";
import {  CurrentNetwork, DefaultConntectionBanner, FullConntectionBanner } from '../../EthComponents/Web3Components/Web3Network.js';
import detectEthereumProvider from '@metamask/detect-provider';


//const seaport = new OpenSeaPort(web3.currentProvider, { networkName: Network.Main })
var web3 = new Web3(Web3.givenProvider);
//var web3 = new Web3('http://localhost:7545');
//var web3 = new Web3('http://localhost:8545');


export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      networkId: null
    };
  }
  async componentDidMount(){
    
    //const networkId = await web3.eth.net.getId();
    const networkId = await web3.eth.getChainId();
    web3.eth.getChainId(console.log);
    web3.eth.getChainId().then(console.log);
    this.setState({ ethNetwork: networkId })

    //const chainId = await ethereum.request({ method: 'eth_chainId' }); 
    // if(chainId == '0x3'){
    //   const networkId = 3;
  
   // handleChainChanged(chainId);
    
    // ethereum.on('chainChanged', handleChainChanged);
    
    // function handleChainChanged(_chainId) {
    //   // We recommend reloading the page, unless you must do otherwise
    //   window.location.reload();

  //}
  }  

render() {
  const { ethNetwork } = this.state;
    return (    
        <footer>
            <Nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">NDP{ethNetwork}</a>
          
                    <div className="collapse navbar-collapse" id="navbarNav">
                      <ul className="navbar-nav ml-auto">
                          <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only"></span></a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="#">FAQ</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="#">Blog</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="#">Contact Us</a>
                          </li>
                      </ul>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                          <div className="network-indicator nav-link"><CurrentNetwork ethNetwork={ethNetwork} /></div>
                        </li>
                    </ul>
                    </div>
                </div>
                <style jsx>{` .network-indicator{color:$fff;font-family: Poppins;}`} 
                </style>
            </Nav>
        </footer>
       
        );
    }
}
