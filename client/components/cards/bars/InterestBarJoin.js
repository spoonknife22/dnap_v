import React from "react";
import { Container  } from "shards-react";
import JoinBtnInterestBar from '../../buttons/JoinBtnInterestBar.js';


export default class InterestBar extends React.Component {


render() {
    return (  
    <div className="mb-4 d-flex justify-content-center">
      <div className="card">
        <div className="card-body">
          <Container>
            <div className="row justify-content-sm-center"> 
              <div className="col-sm d-flex justify-content-sm-center">
                <JoinBtnInterestBar />                            
              </div> 
              <div className="col-sm d-flex justify-content-sm-center">
                <div className="card-text arrow">&rarr;</div>
              </div> 
              <div className="col-sm d-flex justify-content-sm-center">
                <div className="card-text">Deposit</div>
              </div>  
              <div className="col-sm d-flex justify-content-sm-center">
                <div className="card-text arrow">&rarr;</div>
              </div>  
              <div className="col-sm d-flex justify-content-sm-center">
                <div className="card-text">Save</div>
              </div> 
              <div className="col-sm d-flex justify-content-sm-center">
                <div className="card-text arrow">&rarr;</div>
              </div>   
              <div className="col-sm d-flex justify-content-sm-center">
                <div className="card-text">Profit</div>
              </div>                                                      
            </div>
            </Container>
          </div>     
        </div>
        <style jsx>{` 
                  .card-text {margin-bottom:.1rem;font-family: Poppins;color:black;}
                  .card {width:60%;margin-bottom:0;}
                  .card-body {padding:.5rem;font-size:18px;font-weight:300;} 
                  .arrow {color:#17c671;font-size:19px;font-weight:900;}
                  .join-btn{color:#000;letter-spacing:2px;font-family: Poppins;font-size:14px;line-height: 1;}
                  `}  
        </style>

    </div>

        );
    }
}
