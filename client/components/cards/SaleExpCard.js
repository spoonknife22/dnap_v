import React, { useState, useEffect } from 'react';
import Pagination from '../Pagination';
import ExpSaleNominations from '../ExpSaleNominations'
 
//import Moment from "react-moment";
//import moment from "moment";

const SaleExpCard = ({ props, userManaBalance }) => {


  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [parcelsPerPage] = useState(6);
  const [totalOrders, setTotalOrders] = useState();
  
  let ordersArray = [];

  const orderSaleCall = (address) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const graphql = JSON.stringify({ query: 
      `{
        orders(where: {category:parcel, status:cancelled, owner:"${address}"}) {
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
             nftAddress
             txHash
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
    .then((result) => {
      console.log(result.data.orders)
      ordersArray.push(...result.data.orders);
    },
    (error) => {
    return error;
    }
  )
  .then(() => {
    setOrders(ordersArray);
    setTotalOrders(ordersArray.length);
    setLoading(false); 
  },
  (error) => {
    return error;
    }
  )
}


  useEffect(() => {
    const fetchParcels = async () => {
      const proposalContract = await props.drizzle.contracts.ProposalController;
      //const deployedAddresses = await proposalContract.methods.getDeployedAddresses().call();
      const deployedAddresses = ["0xf84037B6726dd526Df322387E9780157E0bB6ADD"]
     
      let i;
      for (i = 0; i < deployedAddresses.length; i++) {
        const address = deployedAddresses[i];
    
        const propData = await proposalContract.methods.getPropData(`${address}`).call();
       //Add all failed 1st and 2nd Sales for 2nd Sale and Award Asset
        //if(propData[0] == 4){
        orderSaleCall(address);
     //}
    }
}
  fetchParcels();  
}, []);

  // Get current orders
  const indexOfLastParcel = currentPage * parcelsPerPage;
  const indexOfFirstParcel = indexOfLastParcel - parcelsPerPage;
  const currentParcels = orders.slice(indexOfFirstParcel, indexOfLastParcel);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (   
    <div>
      <ExpSaleNominations 
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
  );
};


export default SaleExpCard;


