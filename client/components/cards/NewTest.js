import React, { useState, useEffect } from 'react';
import Pagination from '../Pagination';
import Nominations from '../Nominations'
import moment from "moment";
import Web3 from "web3";
import InnerAbCard from './InnerAbCard';
//import { OpenSeaPort, Network, OpenSeaAsset  } from 'opensea-js'

const NewTest = ({ props, userManaBalance }) => {
  const [orders, setOrders] = useState([]);
  const [projectTokenIds, setprojectTokenIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [parcelsPerPage] = useState(6);
  const [totalTokens, setTotalTokens] = useState();
  const [cursor, setCursor] = useState('');

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let cursorString='cursor=';

  console.log(cursor)
  useEffect(() => {
    let orderArray = [];
    //let cursorString='cursor=';

    console.log(cursor)
    const fetchPosts = async () => { 
    let contractAddress = `order_direction=desc&asset_contract_addresses=0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e&limit=20&&${cursorString}${cursor}&include_orders=true`
    var proxyUrl = `https://cors-anywhere.herokuapp.com/`,
    targetUrl = `https://api.opensea.io/api/v1/assets?`;
   
    let i;
    const callsPerProject = 2;
    //let offset = 0;
    for (i = 0; i < callsPerProject; i++) {
      
 
      fetch(targetUrl + contractAddress,{Accept: 'application/json', 'X-API-KEY': '2f2a0900458f4bdfbb489680a58e7526'})
      //fetch(targetUrl + contractAddress,{header:'x-api-key:2f2a0900458f4bdfbb489680a58e7526'})
        .then(res => res.json())
        .then((result) => {
            orderArray.push(result.assets);
            setCursor(result.next);
            
            setOrders(...orderArray);
            //setOffset(+ 50);
          },
          (error) => {
            setLoading(true),
            error;
          }
        )   
        .then(() => {
          setOrders(orderArray);
          //console.log(orderArray)
          setLoading(false);
        },
        (error) => {
          return error;
          }
        )          
  } 
}
   fetchPosts();
 }, []);

  

  return (
    <>
      <div>Hello</div>
      {/* <InnerAbCard props={props}   /> */}
    </>


  
  );
};

export default NewTest;
