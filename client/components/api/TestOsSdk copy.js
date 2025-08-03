//import ReactPaginate from "react-paginate";
import OsPagination from '../OsPagination.js';
import * as Web3 from 'web3';
import { OpenSeaPort, Network, OpenSeaAsset  } from 'opensea-js';
import React, { Component, useEffect, useState } from 'react';

import { OrderSide } from 'opensea-js/lib/types';
import { Button, Form } from "shards-react";

function TestOsSdk({tokenIdArray, projectTotal}) {
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(6);
  const [totalOrders, setTotalOrders] = useState();



  let i;
  let offsetNum=0;
  const callsPerProject = 3;
 // console.log(offsetNum)

  let tokenArray = [];
  for (i = 0; i < callsPerProject; i++, offsetNum+=50) {

 
  //getorders(offsetNum);

  
//console.log(tokenIdArray)
  const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io');

  const seaport = new OpenSeaPort(provider, {
    networkName: Network.Main,
    apiKey: '2f2a0900458f4bdfbb489680a58e7526'
  });


const options = {
  method: 'GET',
  headers: {Accept: 'application/json', 'X-API-KEY': '2f2a0900458f4bdfbb489680a58e7526'}
};

  let limit = 50;
  let i;
  let offsetNum=0;
  const callsPerProject = 3;
  console.log(offsetNum)
  for (i = 0; i < callsPerProject; i++, offsetNum+=50) {
  


  }
  

  useEffect(() => {
 
    const getorders = async (tokenIds) => {
  
      const  { orders, count } = await seaport.api.getOrders({
        asset_contract_address: '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e',
        token_ids: [3396],
        side: 1,
        sale_kind: 0,
  
      })
      console.log(orders)
      const data = orders;
  
      // const total = res.headers.get("x-total-count");
      const total = data.count;
      //setpageCount(Math.ceil(projectTotal / limit));
      // console.log(Math.ceil(total/12));
      //setCursor(data.next)
      //console.log(data)
      setItems(orders);
    };
 
    getorders();
  }, [limit]);

  const fetchorders = async (cursor) => {
    const res = await fetch(
      //`http://localhost:3004/orders?_page=${currentPage}&_limit=${limit}`
       //`https://jsonplaceholder.typicode.com/orders?_page=${currentPage}&_limit=${limit}`
       //`https://api.opensea.io/wyvern/v1/orders?bundled=false&include_bundled=false&side=1&limit=${limit}&offset=${currentOs}&order_by=created_date&order_direction=desc`,options
       `https://api.opensea.io/api/v1/assets?collection=doodles-official&order_direction=desc&limit=50&cursor=${cursor}&include_orders=true`,options
    );
    const data = await res.json();
    return data;
  };

  const handlePageClick = async (cursor) => {
   
    const ordersFormServer = await fetchorders(cursor);
    setItems(ordersFormServer.assets);
    setCursor(ordersFormServer.next)
    console.log(ordersFormServer.assets.sell_orders)
  };


  
  return (
    <div className="container">
      <button className="btn btn-block btn-success join-form-btn" key="submit" type="button" onClick={() => handlePageClick(cursor)} style={{ fontSize: 16 }} > 
          Button
      </button>
      <div className="row m-2">
        {items.map((item) => {
          return (
            <div key={item.asset.tokeId} className="col-sm-6 col-md-4 v my-2">
              <div className="card shadow-sm w-100" style={{ minHeight: 25 }}>
                <div className="card-body">
                  <h5 className="card-title text-center h2">Id :{item.asset.tokenId} </h5>
                  <h6 className="card-subtitle mb-2 text-muted text-center">
                    {item.email}
                  </h6>
                  <p className="card-text">{item.body}</p>
                </div>
              </div>
       
            </div>
          );
        })}
      </div>


    </div>
  );
}
}

export default TestOsSdk;