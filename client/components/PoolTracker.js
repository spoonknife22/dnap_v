import React from "react";
import { Container, Row } from "shards-react";
import InterestCard from "./cards/InterestCard.js"
import PoolCard from "./cards/PoolCard.js"
import AssetCard from "./cards/AssetCard.js"
import InterestBarJoin from "./cards/bars/InterestBarJoin.js"
import ProposalBar from "./cards/bars/ProposalBar.js"

export default class PoolTraker extends React.Component {

  constructor(){
    super();
    this.state = {
      chartData:{}
    }
  }

  render() {
    return (      
            <Container fluid>   
              <InterestBarJoin />
              <Row> 
                <InterestCard />
                <AssetCard />
                <PoolCard />
              </Row>
  
              <ProposalBar />  
              {/* <ProposalCard /> */}
             
            </Container>
    );
  }
}