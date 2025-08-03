import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import { Button } from "shards-react";
import {  Loader } from 'rimble-ui';

const NominationDetailsLink = ({ tokenId }) => { 
  
return (
    <Accordion defaultActiveKey="1">
      <div>
        <Accordion.Toggle as={Button}  variant="link" eventKey="0" outline theme="light">
        <div>Asset Details</div>
        </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <div className="p-2 mt-2 border rounded text-center">
              <div>
                {/* {loading ?
                  <Loader size="25px" color="#007bff" className="mx-auto"/> 
                  : */}
                  <a className="details-btn" href={`https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/` + tokenId}  target="_blank">Decentraland</a>
                {/* //}  */}
                </div>
            </div>
          </Accordion.Collapse>
      </div> 
      <style jsx> {` 
          .details-btn:hover{font-family: Poppins;font-size:.9rem;}
        `}    
      </style>
    </Accordion>
  )
}

export default NominationDetailsLink;