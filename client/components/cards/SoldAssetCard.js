import React, { useState, useEffect } from 'react';
import Pagination from '../Pagination.js';
import SoldNominations from '../SoldNominations.js'

const SoldAssetCards = ({ props, userManaBalance }) => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [parcelsPerPage] = useState(6);
  const [totalOrders, setTotalOrders] = useState();

  let ordersArray = [];

  const orderSoldCall = (address) => {
    const myHeaders = new Headers(); 
    myHeaders.append("Content-Type", "application/json");

    const graphql = JSON.stringify({ query: 
      `{
        orders(where: {category:parcel, status:sold, owner:"${address}"}) {
          id
          status
          nft{
            parcel {  
                    tokenId     
                    x,
                    y,
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
      const deployedAddresses = ["0xAc077477dc36a6E4cDf27Ec229920e81136E5A33"]
      let i;
      //for (i = 0; i < deployedAddresses.length; i++) {
      for (i = 0; i < 1; i++) {
        const address = deployedAddresses[i];
        orderSoldCall(address);
    }
}
  fetchParcels();  
}, []);

  if(totalOrders < 0){
    return console.log('loading...');
  }
  else {
    
    const indexOfLastParcel = currentPage * parcelsPerPage;
    const indexOfFirstParcel = indexOfLastParcel - parcelsPerPage;
    const currentParcels = orders.slice(indexOfFirstParcel, indexOfLastParcel);
    const paginate = pageNumber => setCurrentPage(pageNumber)

    return(
        <div>
          <SoldNominations 
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
    )

  }

};

export default SoldAssetCards;

