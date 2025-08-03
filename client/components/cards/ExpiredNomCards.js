import React, { useState, useEffect } from 'react';
import Pagination from '../Pagination';
import ExpiredNominations from '../ExpiredNominations';
import { Loader } from 'rimble-ui';
//import Moment from "react-moment";
//import moment from "moment";




const NominatedCardsExpired = ({ props, userManaBalance }) => {
  // const nowUnix = moment().valueOf();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [parcelsPerPage] = useState(6);
  const [totalOrders, setTotalOrders] = useState();

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  useEffect(() => {
    fetchParcels();  
  }, []);

  const fetchParcels = async () => {

  const proposalContract = await props.drizzle.contracts.ProposalController;
  const deployedAddresses = await proposalContract.methods.getDeployedAddresses().call();

  let i;
  let orderIdsArray = [];
  for (i = 0; i < deployedAddresses.length; i++) {
    const address = deployedAddresses[i];
    const propData = await proposalContract.methods.getPropData(`${address}`).call(); 
    orderIdsArray.push(propData[2]);
  }

  let j;
  let expiredOrdersArray = [];

  for (j = 0; j < orderIdsArray.length; j++) {
  
    const graphql = JSON.stringify({ query: 
      `{
        orders(where: {id:"${orderIdsArray[j]}", status:cancelled, category:parcel }) {
          status
          id
          nft{
            parcel {          
                    x,
                    y,
                    tokenId
                }
      
            activeOrder {
                id
                price
                expiresAt
                txHash
                nftAddress
            }
        }
        }
      }`
  })

  const targetUrl = 'https://api.thegraph.com/subgraphs/name/decentraland/marketplace'
  fetch(targetUrl, {
    method: "POST",
    headers:myHeaders,  
    body:graphql, variables:{},
    redirect: 'follow'
  })
    .then(res => res.json())
    .then( async (result) => {
      if(!result.data.orders.length){
      }
      else{
        if(result.data.orders[0].nft.activeOrder === null && result.data.orders[0].status === 'cancelled'){
          expiredOrdersArray.push(result.data.orders);
      }
        setTotalOrders(expiredOrdersArray.length)
        setOrders(expiredOrdersArray);
        setLoading(false); 
      }
    },
    (error) => {
    return error;
    }
  ) 
}
}

const indexOfLastParcel = currentPage * parcelsPerPage;
const indexOfFirstParcel = indexOfLastParcel - parcelsPerPage;
const currentParcels = orders.slice(indexOfFirstParcel, indexOfLastParcel);
const paginate = pageNumber => setCurrentPage(pageNumber);



return (   
<>
{!orders  ? 
  <div className="align-items-center">   
    <Loader className="mx-auto" color="#007bff" size="40px" />
  </div>
: 
  <div>
    <ExpiredNominations 
      orders={currentParcels} 
      loading={loading} 
      props={props}   
      userManaBalance={userManaBalance}
    />
    <Pagination
      currentPage ={currentPage}
      parcelsPerPage={parcelsPerPage}
      totalParcels={totalOrders}
      paginate={paginate}
    />
  </div>
    
  }
    
    </>
  );
};


export default NominatedCardsExpired;


