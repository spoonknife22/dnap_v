import React from "react";
import PoolTraker from '../components/PoolTracker.js';
import { Page, Center } from '../components/layout/Layout.js';


export default class InterestPool extends React.Component {

    render() {
        return (    
        <div className="footer-btm">
          <Page>
            <Center>
              <div className="main-content-container px-4 container-fluid">
                <div className="page-header py-2 no-gutters row">
                  <div className="text-sm-left mb-3 text-center text-md-left mb-sm-0 col-12 col-sm-4">
                    <span className="text-uppercase page-subtitle"> </span>
                      <h3 className="page-title"> </h3>         
                  </div>
                </div>
                <PoolTraker />
              </div> 
            </Center>    

            <style jsx>{` .card-text {margin-bottom:.1rem;font-family: Poppins;}
            .card {font-size: 10px;width:70%;margin-bottom:0;}
            .card-header {font-family: Poppins;padding: .3rem 2.2rem;background-color: #f2f2f2;font-size:17px;font-weight:500;}
            .card-body {padding: .6rem;font-size:17px;font-weight:400;} .joinButton {letter-spacing: 2.5px;}
            .dia-total {color: #007bff;font-weight: 500;font-family: Poppins;letter-spacing: 1px;}
            .dia-interest {color: #007bff;font-family: Poppins;font-weight: 500;letter-spacing: 1px;}
            .footer-btm{ min-height:100%;}
            `}  </style>
            
          </Page>   
        </div>
       
        );
    }

}

