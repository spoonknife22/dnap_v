import * as Web3 from 'web3';
import { OpenSeaPort, Network, OpenSeaAsset  } from 'opensea-js';
import React, { Component, useEffect, useState } from 'react';
import OpenSeaApi from "./OpenSeaApi.js";
import { OrderSide } from 'opensea-js/lib/types';




const OsSdk = ({tokenIdArray, projectTotal}) => {

// const [currentOffSet, setcurrentOffSet] = useState(0);
const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState();

const options = {
    method: 'GET',
    headers: {Accept: 'application/json', 'X-API-KEY': '2f2a0900458f4bdfbb489680a58e7526'}
    };
//calls to reach collection total

useEffect(() => {

    let orderArray = [];
    let idArray = [];

    let i;
    let j;

    let limit = 50;
    let currentOffSet = 0;

    // idArray = tokenIdArray.tokenIdArray;

    console.log(orderArray);
    console.log(projectTotal)
    //const callsPerProject = Math.ceil(tokenIdArray.tokenIdArray.length / 50);
    const callsPerProject = 2;

    const fetchorders = async (cursor) => {
      const res = await fetch(
         `https://api.opensea.io/api/v1/assets?collection=doodles-official&order_direction=desc&limit=50&cursor=${cursor}&include_orders=true`,options
      );
      const data = await res.json();
      return data;
    };
  
    fetchorders();
    }, []);


    const handlePageClick = async (cursor) => {
   
      const ordersFormServer = await fetchorders(cursor);
      setItems(ordersFormServer.assets);
      setCursor(ordersFormServer.next)
      console.log(ordersFormServer.assets.sell_orders)
    };

return (
    <div className="container2">
    <div className="container1">
    </div>      
        {items.map((item) => {
          return (
            <div key={item.asse} className="col-sm-6 col-md-4 v my-2">
              <div className="card shadow-sm w-100" style={{ minHeight: 225 }}>
                <div className="card-body">
                  <h5 className="card-title text-center h2">Id :{item.id} </h5>
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


  
)
}

export default OsSdk;



    //turns an array into a string
    //const makeString = stringItem => stringItem * 2;
    //const iArrayMap = idArray.map(makeString);
//https://api.opensea.io/wyvern/v1/orders?bundled=false&include_bundled=false&side=1&limit=20&offset=0&order_by=created_date&order_direction=desc', options)