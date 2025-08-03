import React from "react";
import { Button } from "shards-react";
import JoinModal from '../modals/JoinModal.js';
 
 export default class JoinButton extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      dropdownOpen: false,
      collapseOpen: false,
      showRegisterModal: false,
      ethNetwork: null,
      networkId: null
    };
  }

  
  toggleRegisterModal = async () => {
    const { showRegisterModal } = this.state

    this.setState({
      showRegisterModal: !showRegisterModal,
    })
  }

  toggleDropdown() {
    this.setState({
      ...this.state,
      ...{
        dropdownOpen: !this.state.dropdownOpen
      }
    });
  }

  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen
      }
    });
  } 

  componentDidUpdate(prevProps) {
    if (prevProps.drizzleState.transactionProcessing !== this.props.drizzleState.transactionProcessing) {
        this.setState({
          showRegisterModal: this.props.drizzleState.transactionProcessing,  
        });
    }
  }

  render() {
    const { showRegisterModal } = this.state;
      return ( 
            <div>
              <Button className="nav-join-btn" onClick={this.toggleRegisterModal} onClose={this.toggleRegisterModal} theme="success" size="md" >
                ACCESS
              </Button>
              <div>
                {showRegisterModal && (
                  <JoinModal onClose={this.toggleRegisterModal} />
                )}
              </div> 
            </div>  
        );  

    
    }
}

