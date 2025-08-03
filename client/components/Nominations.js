import React from 'react';
import { connect } from 'react-redux';
import Web3 from "web3";
import { Loader } from 'rimble-ui';
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Container } from "shards-react";
import NominationDetailsLink from './NominationDetailsLink.js';
import CardFooterButton from './buttons/CardFooterBtn.js';
import Moment from "react-moment";


const Nominations =  ({ orders, loading, props, userManaBalance, getSoldStatus }) => {
  
  if (loading) {
    return (
      <div className="justify-content-center align-items-center mt-3">   
        <Loader className="mx-auto" color="#007bff" size="40px" />
      </div>
      )
  }
  return (  
    <Row className="mt-4 justify-content-center">
      {orders.map(parcel => (
          <div key={parcel.nft.activeOrder.txHash} className="mb-4 col-sm-12 col-md-12 col-lg-4 nominations-main-col" >
            <Card>
              <CardHeader className="asset-header p-2 card-title text-center">Decentraland</CardHeader>
              <div>
                <div>
                  <CardTitle className="asset-title text-center">
                    <div className="current-price">Price:&nbsp;{Web3.utils.fromWei(`${parcel.nft.activeOrder.price}`,'ether')} MANA</div>
                  </CardTitle>   
                </div>  
              </div>  
              <Row className="justify-content-center">
                <NominationDetailsLink tokenId={parcel.nft.parcel.tokenId} drizzle={props.drizzle} />
              </Row>
              <CardBody className="pb-.4rem;px-2">
                <Row className="asset-image align-items-center">
                  <img className="mx-auto" src={'https://api.decentraland.org/v1/parcels/' + parcel.nft.parcel.x + '/' + parcel.nft.parcel.y + '/map.png?height=260&width=260&size=12'} />
                </Row>
                <Row className="mt-2 justify-content-center">
                <div className="my-2 asset-card text-center card-text">Parcel:&nbsp;{parcel.nft.parcel.x},{parcel.nft.parcel.y}</div>
                </Row>
                <Row className="mt-3 justify-content-center">
                  <div className="mb-2 col-4 asset-card text-left card-text">End Date</div>
                  <div className="mb-2 col-8 asset-card-time text-right card-text">
                    {(typeof(Number(parcel.nft.activeOrder.expiresAt)) == 'number')?
                      <Moment format="h:mma M/DD/YY">
                        {Number(parcel.nft.activeOrder.expiresAt)}
                      </Moment>       
                    :
                      'no end date'
                    }
                  </div> 
                </Row>  
              </CardBody>   
              <CardFooterButton 
                 tokenId={parcel.nft.parcel.tokenId} 
                 assetPrice={parcel.nft.activeOrder.price} 
                 expiresAt={parcel.nft.activeOrder.expiresAt} 
                 nftAddress={parcel.nft.activeOrder.nftAddress} 
                 orderId={parcel.nft.activeOrder.id} 
                 orderStatus={parcel.status}
                 props={props} 
                 userManaBalance={userManaBalance}
                 getSoldStatus={getSoldStatus}
              />
            </Card>  
          <style jsx> {` 
            .modal-content{border-top:2px solid #bff}
            .asset-card{font-weight:400;color:black;font-size:.9rem;font-family: Poppins;}
            .card-footer-btn{font-family: Poppins;font-weight:400;color:#000;font-size:1rem;
            letter-spacing:.3rem;border-radius:.01rem .01rem .2rem .2rem;}
            .card-footer-btn:hover{background:#007bff;color:white;}
            .asset-total-fund{font-weight:200;font-size:.9rem;letter-spacing:.2rem;color:#000;}
            .asset-card-numbers{font-size:1rem;letter-spacing:.2rem;color:#007bff;hover:black;}
            .asset-card-time{font-weight:400;color:#ff8080;font-size:.9rem;font-family:Poppins;}
            .current-price{font-size:.9rem;letter-spacing:.1rem;font-weight:400;
            `}    
          </style>
        </div>
      ))}
    </Row> 
  );
};


const mapDispatchToProps = (dispatch) => ({
  getSoldStatus: (proposalBalance, soldStatus) =>  dispatch({ type: "GOT_SOLD_STATUS", status: soldStatus, proposalBalance: proposalBalance })
});
  
  
export default connect(null, mapDispatchToProps)(Nominations);