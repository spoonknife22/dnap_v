import React from "react";
import { Button, Container  } from "shards-react";
import { Link } from '../../../../routes';




export default class PoolBar extends React.Component {

render() {
    return (  

    <div className="d-flex justify-content-center mt-3">
      <div className="card">
        <div className="card-body">
          <Container>
              <div className="row justify-content-sm-center">  
                <div className="col-sm d-flex justify-content-sm-center">
                  <div className="card-text">Pool Depth</div>
                  <span className="dia-total px-3">$1,234,559</span>
                </div>    
                <div className="col-sm d-flex justify-content-sm-center">
                  <div className="card-text interest">Sales</div>
                  <span className="dia-interest card-text px-3">$200,456</span>
                </div>                                
                <div className="col-sm d-flex justify-content-sm-center">
                  <div>
                    <Link route={`/interestpool`}>
                      <Button className="joinButton" outline theme="success" size="sm">
                        Stats &rarr;
                      </Button>                                   
                    </Link>  
                  </div>
                </div>
              </div>
            </Container>
          </div>     
        </div>
        <style jsx>{` .card-text {margin-bottom:.1rem;font-family: Poppins;}
                  .card {font-size: 10px;width:70%;margin-bottom:0;}
                  .card-header {font-family: Poppins;padding: .3rem 2.2rem;background-color: #f2f2f2;font-size:17px;font-weight:500;}
                  .card-body {padding: .6rem;font-size:17px;font-weight:400;} 
                  .joinButton {letter-spacing: 2.5px;}
                  `}  
        </style>
    </div>

        );
    }
}