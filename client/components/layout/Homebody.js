import React from "react";
import { Link } from '../../../routes';
import DnaHomeSection from '../DnaHomeSection';

export default class HomeBody extends React.Component {

render() {
		return (    
				<div className="shards-landing-page--1">
					<div className="d-flex justify-content-center flex-column">
						<div className="container">
							<div id="our-services" className="our-services section py-4">
							<h3 className="section-title text-center my-5">Decentralized NFT Protocols</h3>
								<div className="features py-4 mb-4">
									<div className="container">
										<div className="row">
                    <div className="feature py-4 col-md-6 d-flex">
                      <Link route={`/fundingdnapage`}>
                        <div className="icon text-primary mr-3">
                          <i aria-hidden className="fas fa-donate"></i>
                        </div>
                      </Link>
                      <div className="px-4">
                        <Link route={`/fundingdnapage`}> 
                          <h5 className="subtitles">Decentralized NFT<br></br> Acquisition Protocol</h5> 
                        </Link>    
                        <p>Users pool their funds to buy then sell high value NFTs through secure smart contracts interactions.</p>
                      </div> 
											</div>
											<div className="feature py-4 col-md-6 d-flex">
                        <Link route={`/assetpool`}>
                          <div className="icon text-primary mr-3">
                            <i aria-hidden className="fas fa-swimming-pool"></i>
                          </div>
                        </Link>  
												<div className="px-4">
														<h5>Interest Pool Protocol</h5>
														<p>Interest from pooled DIA or USDC is used to purchase then sell high value NFTs.</p>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="feature py-4 col-md-6 d-flex">
												<div className="icon text-primary mr-3">
														<i aria-hidden className="fas fa-money-check-alt"></i>
												</div>
												<div className="px-4">
													<h5>Loan Funding Protocol</h5>
													<p> The borrower uses a NFT as collateral. Individuals choose to fund a portion or all of a borrowers loan request.</p>
												</div>
											</div>
                      <div className="feature py-4 col-md-6 d-flex">
												<div className="icon text-primary mr-3">
													<i aria-hidden className="fas fa-file-invoice-dollar"></i>
												</div>
												<div className="px-4">
														<h5>Interest Loan Protocol</h5>
														<p>Users choose to fund loans with the interest generated from a consortium and borrowers use NFTs as collateral.</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
          <style jsx>{`
          .subtitles{cursor:pointer;}
          .icon{cursor:pointer;}`}
          </style>

				</div>
			);
	}
}
