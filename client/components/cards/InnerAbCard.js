import React, { useState, useEffect } from 'react';
import Pagination from '../Pagination';
import Nominations from '../Nominations'
import moment from "moment";
import Web3 from "web3";
//import { OpenSeaPort, Network, OpenSeaAsset  } from 'opensea-js'

const InnerAbCard = ({ props, userManaBalance, projectTokenIds, totalTokens }) => {
  // console.log(projectTokenIds);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [parcelsPerPage] = useState(6);
  const [totalOrders, setTotalOrders] = useState();
  console.log(orders);
    useEffect(() => {
      const fetchPosts = async () => { 
      var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
      targetUrl = 'https://api.opensea.io/api/v1/assets?';
      let contractAddress = 'asset_contract_address=0x1A92f7381B9F03921564a437210bB9396471050C&order_by=token_ids&order_direction=desc&offset=0&limit=50'
      //asset_contract_address=0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d&event_type=created&only_opensea=false&offset=0&limit=100
      let i;
      let j;
      let artArray = [];
      //console.log(artArray);
      //const callsPerProject = Math.ceil(totalTokens / 50);
      const callsPerProject = 3
      for (i = 0; i < callsPerProject; i++) {
        //for (j = 0; j < 50; j++) {
          // const tokenIdObject = result.data.projects[0].tokens[j];
          // artArray.push(tokenIdObject.tokenId)
      fetch(targetUrl + contractAddress,{header:'x-api-key:2f2a0900458f4bdfbb489680a58e7526'})
        .then(res => res.json())
        .then(
          (result) => {
            // console.log(result.assets);
            artArray.push(...result.assets);
          },
          (error) => {
            setLoading(true),
            error;
          }
        )   
        .then(() => {
          setOrders(artArray);
          setLoading(false);
        },
        (error) => {
          return error;
          }
        ) 

      //}             
    } 
      
        }
  
      fetchPosts();
    }, []);

  // Get current posts
  const indexOfLastParcel = currentPage * parcelsPerPage;
  const indexOfFirstParcel = indexOfLastParcel - parcelsPerPage;
  const currentParcels = orders.slice(indexOfFirstParcel, indexOfLastParcel);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  

  return (
    <>
        {/* {orders.map((assetData) => 
         
         <div key={assetData.id.toString()} className="mb-4 col-sm-12 col-md-12 col-lg-4">
         <div>{console.log(assetData)}
        {assetData.id}
         </div>  
         </div>        
       )} */}
    </> 


  
  );
};

export default InnerAbCard;


