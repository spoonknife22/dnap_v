import React from "react";
import PoolBar from "../components/cards/bars/PoolBar.js"
import { Button, Container  } from "shards-react";
import Layout from '../components/layout/Layout.js';


export default class AssetPoolSection extends React.Component {

render() {
    return (    
             
            <div>
              <div className="shards-landing-page--1">
                  <div className="d-flex justify-content-center flex-column">
                      <div className="container">
                        <div id="our-services" className="our-services section py-4">
                          <h3 className="section-title text-center my-4 mt-1">Interest Asset Pool</h3>
                          <p className="text-center mb-3">Join the Consortium. Save your DAI. Profit off of asset sales. Risk nothing.</p>
                            <PoolBar />
                          <div className="features py-4 mb-4">
                            <div className="container">
                              <div className="row">
                                  <div className="feature py-4 col-md-6 d-flex">
                                    <div className="icon text-primary mr-3"><i aria-hidden className="fas fa-percentage"></i></div>
                                    <div className="px-4">
                                        <h5>Interest</h5>
                                        <p>The Consortiums pooled DAI earns interest through the Compound protocol. At the end of 2 weeks the interest earned is automatically withdrawn through the Consortiums protocol.</p>
                                    </div>
                                  </div>
                                  <div className="feature py-4 col-md-6 d-flex">
                                    <div className="icon text-primary mr-3"><i aria-hidden className="fas fa-person-booth"></i></div>
                                    <div className="px-4">
                                        <h5>Vote</h5>
                                        <p>Consortium members nominate then vote on which asset to purchase. Nominations include a resale price and timeframe. After 2 days the nomination with the most votes will be set for purchase.</p>
                                    </div>
                                  </div>
                              </div>

                              <div className="row">
                                <div className="feature py-4 col-md-6 d-flex">
                                  <div className="icon text-primary mr-3"><i aria-hidden className="fas fa-receipt"></i></div>
                                  <div className="px-4">
                                      <h5>Acquire</h5>
                                      <p>Through the Consortiums protocol the asset is acquired and immeiately put up for auction.</p>
                                  </div>
                                </div>
                                  <div className="feature py-4 col-md-6 d-flex">
                                    <div className="icon text-primary mr-3"><i aria-hidden className="fas fa-gavel"></i></div>
                                    <div className="px-4">
                                        <h5>Auction</h5>
                                        <p>Assets are auctioned off on OpenSea marketplace. Once the sale is complete the proceeds are dispersed to Consortium members.</p>
                                    </div>
                                  </div>
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
                  <style jsx>{` .card-text {margin-bottom:.1rem;font-family: Poppins;}
                  .card {font-size: 10px;width:70%;margin-bottom:0;}
                  .card-header {font-family: Poppins;padding: .3rem 2.2rem;background-color: #f2f2f2;font-size:17px;font-weight:500;}
                  .card-body {padding: .6rem;font-size:17px;font-weight:400;} .joinButton {letter-spacing: 2.5px;}
                  .dia-total {color: #007bff;font-weight: 500;font-family: Poppins;letter-spacing: 1px;}
                  .dia-interest {color: #007bff;font-family: Poppins;font-weight: 500;letter-spacing: 1px;}`}  </style>
            </div>
       
        );
    }

}