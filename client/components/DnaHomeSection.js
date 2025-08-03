import React from "react";
import PoolBar from "../components/cards/bars/PoolBar.js"

export default class DnaHomeSection extends React.Component {

render() { 
    return (    
            
            <div>
              <div className="shards-landing-page--1">
                  <div className="d-flex justify-content-center flex-column">
                      <div className="container">
                        <div className="our-services section">
                          <h3 className="section-title text-center my-4 mt-1">DNA Protocol</h3>
                          <p className="text-center mb-3">Users pool their funds to increase purchasing power and mitigate risk.</p>
                          <div className="features py-4 mb-4">
                            <div className="container">
                              <div className="row">
                                  <div className="feature py-4 col-md-6 d-flex">
                                    <div className="icon text-primary mr-3"><i aria-hidden className="fas fa-receipt"></i></div>
                                    <div className="px-4">
                                        <h5>Acquire</h5>
                                        <p>Users contribute to the purchase of an NFT. Once the seller’s price is met, a series of smart contract interactions purchase and put the NFT on sale.</p>
                                    </div>
                                  </div>
                                  <div className="feature py-4 col-md-6 d-flex">
                                    <div className="icon text-primary mr-3"><i aria-hidden className="fas fa-money-bill-wave"></i></div>
                                    <div className="px-4">
                                        <h5>Sell</h5>                                  
                                        <p>When the NFT is sold the contract distrubutes the proceeds to the owners in proportion to their contribution.</p>
                                    </div>
                                  </div>
                              </div>

                              <div className="row">
                                <div className="feature py-4 col-md-6 d-flex">
                                  <div className="icon text-primary mr-3"><i aria-hidden className="fas fa-hard-hat"></i></div>
                                  <div className="px-4">
                                      <h5>Mitigation</h5>
                                      <p>After one year if the NFT has not sold, the price will be lowered to the purchase price. If the NFT has not sold after two years NFT will be awarded to an owner.</p>                                   
                                  </div>
                                </div>
                                  <div className="feature py-4 col-md-6 d-flex">
                                    <div className="icon text-primary mr-3"><i aria-hidden className="fas fa-trophy"></i></div>
                                    <div className="px-4">
                                        <h5>Award</h5>
                                        <p>The contract will award the NFT to one of the owners through a random number generation that has been weighted by the amount of each owner’s contribution.</p>
                                    </div>
                                  </div>
                              </div>
                              <PoolBar />
                            </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
                  <style jsx>{` 
                  .our-services{margin-top:8rem;} 
                  .card-text {margin-bottom:.1rem;font-family: Poppins;}
                  .card {font-size: 10px;width:70%;margin-bottom:0;}
                  .card-header {font-family: Poppins;padding: .3rem 2.2rem;background-color: #f2f2f2;font-size:17px;font-weight:500;}
                  .card-body {padding: .6rem;font-size:17px;font-weight:400;} .joinButton {letter-spacing: 2.5px;}
                  .dia-total {color: #007bff;font-weight: 500;font-family: Poppins;letter-spacing: 1px;}
                  .dia-interest {color: #007bff;font-family: Poppins;font-weight: 500;letter-spacing: 1px;}`}  </style>
            </div>
       
        );
    }

}