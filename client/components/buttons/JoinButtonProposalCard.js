import React from "react";
import { Button } from "shards-react";
import JoinModal from '../modals/JoinModal.js';
 
 export default class JoinButtonProposalCard extends React.Component {
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

  render() {
    const { showRegisterModal } = this.state;
      return ( 
            <div className="col-sm d-flex justify-content-sm-centerr"> 
              <Button onClick={this.toggleRegisterModal} onClose={this.toggleRegisterModal} className="my-auto join-vote-btn-otr" block outline theme="primary" size="sm">
                <div className="join-vote-btn">ACCESS</div>
              </Button>

              <div>
                {showRegisterModal && (
                  <JoinModal onClose={this.toggleRegisterModal} />
                )}
              </div> 
            </div>  
        )  
    }
}