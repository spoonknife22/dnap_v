import React from "react";
import { Row,Button, Container  } from "shards-react";
import { Link } from '../../../../routes';
import ProposalEndDate from '../../ProposalCountdown.js';
import moment from 'moment';
import JoinButtonProposalCard from '../../buttons/JoinButtonProposalCard.js';

export default class ProposalBar extends React.Component {

  constructor(){
    super();
    this.state = {
      error:null,
      isLoaded:false,
      unixTimestamp:undefined
    }
  }


  componentDidMount() {
    this.getpoolStartTime();
  }

  getpoolStartTime(){
    // Ajax calls here
    const unixTimestamp=1584931427;
    this.setState({
     // proposalEndTime:<Moment format="MM DD YYYY, HH:mm" unix>{unixTimestamp}</Moment>
    });
  }
 
render() {

  const date = moment.unix(1584931427);
  const proposalEndTime = date.format("MM DD YYYY, HH:mm");

  return (  
    <div className="mb-4 d-flex justify-content-center">
      <div className="card">
        <div className="card-body">
          <Row className=" justify-content-center">
            <div className="col-sm  d-flex justify-content-sm-center">
              <h5 className="my-auto">Next NFT Sale Ends</h5> 
            </div> 
            <div className="col d-flex my-auto justify-content-center">
              <ProposalEndDate timeTillDate={proposalEndTime} />
            </div>  
              <JoinButtonProposalCard />
          </Row>
        </div>     
      </div>
        <style jsx>{` 
                  .card-text {margin-bottom:.1rem;font-family: Poppins;color:black;}
                  .card {width:60%;margin-bottom:0;}
                  .card-body {padding:.5rem;font-size:18px;font-weight:300;} 
                  .arrow {color:#17c671;font-size:21px;font-weight:900;}
                  `}  
        </style>
    </div>

        );
    }
}