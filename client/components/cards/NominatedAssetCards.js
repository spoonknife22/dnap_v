import React, { useState, useEffect } from 'react';
import Pagination from '../Pagination';
import Nominations from '../Nominations'
import moment from "moment";

const NominatedAssetCards = ({ props, userManaBalance }) => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [parcelsPerPage] = useState(6);
  const [totalOrders, setTotalOrders] = useState();

  const nowUnix = moment().valueOf();

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const currentTime= moment().valueOf();
  const graphql= JSON.stringify({ query: 
      `{
        orders(first:12,orderBy: price,where:{status:open, category:parcel,expiresAt_gt:${currentTime}}) {
         status 
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

  useEffect(() => {
    const fetchParcels = async () => {
    //const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    const targetUrl = 'https://api.thegraph.com/subgraphs/name/decentraland/marketplace'
  
    fetch(targetUrl, {
      method: "POST",
      headers:myHeaders,  
      body:graphql, variables:{},
      redirect: 'follow'
    })
      .then(res => res.json())
      .then( async (result) => {
          const ordersGQL = await result.data.orders;
          //All Active Array
          //const ordersFiltered = await result.data.orders;
          //FILTER OUT NOMINATED PROPS
          //const tokenIdArray = await props.drizzle.contracts.ProposalController.methods.getDeployedProposal().call();
          //const ordersFiltered = ordersGQL.filter(item => !tokenIdArray.includes(item.parcel.tokenId));
          ///
       
         const proposalContract = await props.drizzle.contracts.ProposalController;
         const deployedAddresses = await proposalContract.methods.getDeployedAddresses().call();
        
         let i;
         let fundingArray = [];
         let fundedArray = [];
         let forSaleArray = [];
  
         for (i = 0; i < deployedAddresses.length; i++) {
           const address = deployedAddresses[i];
           const propData = await proposalContract.methods.getPropData(`${address}`).call();

           if(propData[0] == 0) {
             fundingArray.push(propData[1]);
           }
           else if(propData[0] == 1){ 
             fundedArray.push(propData[1]);
           }
           else if(propData[0] == 4){
             forSaleArray.push(propData[1]);
           }
       }
    
      //FILTER OUT NOMINATED PROPS
       //const ordersFiltered = ordersGQL.filter(item => !fundingArray.includes(item.parcel.tokenId));

      //Just Funding Array
       //const fundingFilter = ordersGQL.filter(item => fundingArray.includes(item.parcel.tokenId));
       const ordersFiltered = ordersGQL.filter(item => fundingArray.includes(item.nft.parcel.tokenId));
       //Just Funded Array where purchase or resale failed
       //const fundedFilter = ordersGQL.filter(item => fundedArray.includes(item.parcel.tokenId));

      //Just For Sale Array
       //const forSaleFilter = ordersGQL.filter(item => forSaleArray.includes(item.parcel.tokenId));
          setOrders(ordersFiltered);
          setTotalOrders(ordersFiltered.length)
          setLoading(false); 
        },
        (error) => {
          setLoading(true),
          error;
        }
    ) 
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
      <Nominations 
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


export default NominatedAssetCards;

