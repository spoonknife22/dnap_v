import React from "react";
import { Button } from "shards-react";
import Web3 from "web3";
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import ContributionButton from '../buttons/ContributionButton';
// import Contribute from './Contribute.js';
import { newContextComponents } from "@drizzle/react-components";

const { AccountData, ContractData, ContractForm } = newContextComponents;


const Approve = ({ drizzle, drizzleState, accounts }) => {
  <form >
  <Row className="mt-3 justify-content-center contribute-form-dialog">
    <div className="modal-footer justify-content-center">
      <div className="contribute-form-dialog ">
      <Input 
          title="Contribute"
          placeholder="MANA" 
          onChange={e => this.updateField("contribution", e)} 
        />
      </div> 
      <div>
        {!transactionProcessing && !txHash ? 
          <Button className="contribute-form-btn btn btn-block btn-success" type="submit" onClick={this.contribute} theme="success" >
            Approve
          </Button>
        : (!processingDone  ?  
          <div className="mx-auto">   
            <Loader className="mx-auto" color="#007bff" size="40px" />
          </div>  
          : 
          <Button className="contribute-form-btn btn btn-block btn-success" type="submit" onClick={this.deposit} theme="success" >
            Deposit
          </Button>
        )     
        }
      </div>
    </div>
  </Row>
</form>
}
export default Approve;