import React from "react";
import { Row,Button, Container  } from "shards-react";
import { Link } from '../../../routes';
import ProposalEndDate from '../component-overview/ProposalCountdown.js';




export default class ProposalBar extends React.Component {

  clockRef = null;

  constructor(props) {
      super(props);
      this.setClockRef = this.setClockRef.bind(this);
      this.start = this.start.bind(this);
      this.pause = this.pause.bind(this);
  }

  start() {
      this.clockRef.start();
  }

  pause() {
      this.clockRef.pause();
  }

  setClockRef(ref) {
      // When the `Clock` (and subsequently `Countdown` mounts
      // this will give us access to the API
      this.clockRef = ref;
  }


render() {
    return (  

    <div className="mb-4 d-flex ">
      <div className="card">
        <div className="card-body">
          <Row className="justify-content-md-center">
            <div className="col d-flex justify-content-sm-center">
              <div className="card-text">Active Proposals</div>
                <div className="card-text">
                <button onClick={this.start}>Start Clock</button>
                <button onClick={this.pause}>Pause Clock</button>
                  Vote Ends:<ProposalEndDate refCallback={this.setClockRef} time="100" />
              </div>
            </div>  
          </Row>
        </div>     
        </div>
        <style jsx>{` 
                  .card-text {margin-bottom:.1rem;font-family: Poppins;color:black;}
                  .card {width:100%;margin-bottom:0;}
                  .card-body {padding:.5rem;font-size:18px;font-weight:300;} 
                  .arrow {color:#17c671;font-size:21px;font-weight:900;}
                  `}  
        </style>
    </div>

        );
    }
}



clockRef = null;

constructor(props) {
    super(props);
    this.setClockRef = this.setClockRef.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
}

start() {
    this.clockRef.start();
}

pause() {
    this.clockRef.pause();
}

setClockRef(ref) {
    // When the `Clock` (and subsequently `Countdown` mounts
    // this will give us access to the API
    this.clockRef = ref;
}


<button onClick={this.start}>Start Clock</button>
<button onClick={this.pause}>Pause Clock</button>
  Vote Ends:<ProposalEndDate refCallback={this.setClockRef} time="100"/>
</div>





import React  from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';


export default class ProposalEndDate extends React.Component {

  constructor (props) {
    super(props)
    this.state = { endCountdown: false }
    this.sampleOnTick = this.sampleOnTick.bind(this)
    this.sampleOnCountdownEnd = this.sampleOnCountdownEnd.bind(this)
  }

  sampleOnTick (countdown) {
    this.setState({ endCountdown: countdown <= 0 })
  }
  sampleOnCountdownEnd () {
    console.log('Happy Birthday to you :)')
  }
 
  render() {

    const dateInFuture = moment('2020-3-18 13:35:00 ', 'YYYY-MM-DD HH:mm:ss');
    //const startDate = Date.now();
    //const Completionist = () => <span>You are good to go!</span>;
   
      return (
        <div>
          <Countdown date={dateInFuture} onTick={this.sampleOnTick}
        onCountdownEnd={this.sampleOnCountdownEnd} >
          
          </Countdown>
        
              {/* <Moment format="unix" add={{ hours: 48 }}>{date}</Moment> */}
          </div>


      );
  }
}