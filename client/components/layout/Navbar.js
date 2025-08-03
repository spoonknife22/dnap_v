import React from "react";
import AccountsContainer from '../../EthComponents/AccountsContainer.js';

import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Collapse,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from "shards-react";


  export default class NavBar extends React.Component {
    constructor(props) {
      super(props);
  
      this.toggleDropdown = this.toggleDropdown.bind(this);
      this.toggleNavbar = this.toggleNavbar.bind(this);
  
      this.state = {
        dropdownOpen: false,
        collapseOpen: false,
        showRegisterModal: false 
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
      <div>
          <Navbar type="dark" theme="primary" expand="md">
            <NavbarBrand href="/">Decentralized NFT Protocols</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} />
            <Collapse open={this.state.collapseOpen} navbar>
              <Nav navbar>
              <NavItem>
              <Dropdown 
                  open={this.state.dropdownOpen}
                  toggle={this.toggleDropdown}
                >
                <DropdownToggle nav caret>
                  DNA Protocol
                </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem href={`/prednapage`}>Nominate DNA</DropdownItem>
                    <DropdownItem href={`/fundingdnapage`}>DNA's Funding </DropdownItem>
                    <DropdownItem  href={`/salednapage`} >DNA's for Sale</DropdownItem>
                    <DropdownItem  href={`/saleexpdnapage`} >DNA's Sale Expired</DropdownItem>
                    <DropdownItem  href={`/solddnapage`} >DNA's Sold </DropdownItem>
                    <DropdownItem  href={`/expireddnapage`} >DNA's Expired</DropdownItem>
                    <DropdownItem  href={`/preAbpage`} >Nomination Art Blocks</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                </NavItem>
                {/* <NavItem>
                  <NavLink active href={`/cpp`}>
                    NFT Purchase Protocol
                  </NavLink>
                </NavItem> */}
                <NavItem>
                  <NavLink href="/assetpool">
                    Interest Protocol
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">
                    Loan Protocol
                  </NavLink>
                </NavItem>
                 <NavItem>
                  <NavLink  href="#">
                    Interest Loan Protocol
                  </NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink active href="#">
                    Compound Interest Protocol
                  </NavLink>
                </NavItem> */}
              </Nav>
              <Nav className="ml-auto">
                <NavItem>
                  <AccountsContainer  onClick={this.toggleRegisterModal} onClose={this.toggleRegisterModal} />
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
         
        </div>
      );
    }
  }

