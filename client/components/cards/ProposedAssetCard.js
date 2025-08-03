import React, { Component } from 'react';
import Web3 from "web3";
import { Loader } from 'rimble-ui';
import Accordion from 'react-bootstrap/Accordion';
import { Card, CardHeader, CardBody, CardFooter, CardTitle, Button, Row, Progress } from "shards-react";
import ContributeModal from '../modals/InitialContributeModal';
      
// import Moment from "react-moment";
// <time>
// <Moment fromNow ago unix>
//   {postedAt}
// </Moment>
// </time>
      
export default class ProposedAssetCard extends Component {
  constructor(props){
    super(props);
    this.handleSlide = this.handleSlide.bind(this),
 
    this.state = {
      error:null,
      isLoaded:false,
      value: 0,
      valueSlider:0,
      contribAmount:0,
      assetData: []
    }
  }

  
  componentDidMount() {
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://api.opensea.io/api/v1/events?asset_contract_address=0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d&event_type=created&on_sale=true&offset=3&limit=6'
    fetch(proxyUrl + targetUrl,{header:'x-api-key: 2f2a0900458f4bdfbb489680a58e7526'})
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            assets: result.asset_events
          });
          
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      ) 
      
  }

  handleSlide(e) {
    this.setState({
      valueSlider: parseFloat(e[0])
    });
  }

  render() {
   
    const { error, isLoaded, assets} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <Loader color="white" />
    } else {  
     
      return (
        <Row className="mt-4">
          {assets.map((assetData) =>         
          {if( (Array.isArray(assetData.sell_orders) && assetData.sell_orders.length) ){
            return (
            <div className="mb-4 col-sm-12 col-md-12 col-lg-4"  key={assetData.asset.token_id.toString()}>
              <Card>
                <CardHeader className="asset-header p-2 card-title text-center">Decentraland</CardHeader>
                <div>
                  {assetData.sell_orders.map((subOne)=> 
                      {if(subOne.payment_token_contract.id === 1){
                      return (
                        <div key={subOne.created_date.toString()}>
                        <CardTitle className="asset-title text-center">
                          <Progress className='mx-4' theme="primary" value={3} max={Web3.utils.fromWei(subOne.current_price,'ether')} >{3}</Progress>
                          <div className="current-price">Current Price:{Web3.utils.fromWei(subOne.current_price,'ether')} ETH</div>
                        </CardTitle>
                        </div>
                      )}
                    }
                  )}
                </div>
                <Row className="justify-content-center">
                  <Accordion defaultActiveKey="1">
                    <div>  
                      <Accordion.Toggle as={Button} variant="link" eventKey="0" outline theme="light">
                        Details
                      </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                          <div className="p-3 mt-3 border rounded">
                            <div>Previouse Sales:{assetData.num_sales}</div>
                            {[assetData.last_sale].map((subSet) => {
                              if(subSet?.payment_token.id == 3) {
                                return <div key={subSet.event_timestamp.toString()} >Last Sale: {Web3.utils.fromWei(subSet.total_price,'ether')} MANA</div>
                              }
                              if(subSet?.payment_token.id == 1) {
                                return <div key={subSet.event_timestamp.toString()}>Last Sale: {Web3.utils.fromWei(subSet.total_price,'ether')} ETH</div>
                              }
                            }
                            )}
                          </div>
                        </Accordion.Collapse>
                    </div> 
                  </Accordion>
                </Row>
                <CardBody className="pb-.4rem;px-2">
                  <a href={assetData.permalink}>{}
                    <Row className="asset-image align-items-center">
                        <img className="mx-auto" src= {assetData.image_preview_url} target="_blank" />
                    </Row>
                  </a>
                  <Row className="mt-2 justify-content-center">
                    <div className="mb-2 asset-card text-center card-text">{assetData.name}</div>
                  </Row>
                  <Row className="mt-3 justify-content-center">
                    <div className="mb-2 col-sm asset-card text-left card-text">End Date:</div>

                    {assetData.sell_orders.map((subThree)=> 
                    
                    {if(subThree.payment_token_contract.id === 1){
                      return ( 
                          <div key={subThree.listing_time.toString()} className="mb-2 col-sm asset-card text-right card-text">
                             {(typeof(subThree.closing_date)=='string')?
                              <div>{subThree.closing_date}</div>            
                            :
                            'no end date'
                            }
                          </div>
                          )
                          
                          }
                        }
                      )}
                  </Row>
                </CardBody>
                <ContributeModal handleSlide={this.handleSlide} state={this.state} assetData={assetData} drizzle={this.props.drizzle} />
              </Card>  
            </div>    
            )}
            // console.log("In OpenSea API MANA sales do not return sale_orders array")
          }
      
          )}

          <style jsx> {` 
            .asset-card{font-weight:400;color:black;font-size:.9rem;font-family: Poppins;}
            .card-footer-btn{font-family: Poppins;font-weight:400;color:#000;font-size:1rem;letter-spacing:.3rem;border-radius:.01rem .01rem .2rem .2rem;}
            .card-footer-btn:hover{background:#007bff;color:white;}
            .asset-total-fund{font-weight:200;font-size:.9rem;letter-spacing:.2rem;color:#000;}
            .asset-card-numbers{font-size:1rem;letter-spacing:.2rem;color:#007bff;hover:black;}
            .current-price{font-size:.8rem;letter-spacing:.1rem;font-weight:100;}
           
            `}    
          </style>

        </Row> 
      );
    }
  }
}


