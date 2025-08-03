import  React, { Component, useEffect, useState  } from "react";
import { Container  } from "shards-react";
import OsSdk from '../components/api/OsSdk.js';
import OutterOsSdk from '../components/api/OutterOsSdk.js';
import TestOsSdk from '../components/api/TestOsSdk.js';
import { Page, Center } from '../components/layout/Layout.js';
import { DrizzleContext } from "@drizzle/react-plugin";
import {  Loader } from 'rimble-ui';
import NewTest from '../components/cards/NewTest';


function SdkPage () {
  
  const [items, setItems] = useState([]);
  const [cursorTwo, setcursorTwo] = useState('{}');

  const options = {
    method: 'GET',
    headers: {Accept: 'application/json', 'X-API-KEY': ''}
  };

  let limit = 5;
  let i;
  let cursorOne='';
  let cursor='';
  let tokenIdArray = [];
  let offsetNum=0;
  const callsPerProject = 3;
  const getorders = async (cursorOne, cursor) => {
      
    const res = await fetch(
        `https://api.opensea.io/api/v1/assets?collection=doodles-official&order_direction=desc&limit=${limit}&${cursor}${cursorOne}&include_orders=true`,options
    )
    const data = await res.json();
    setItems(data.assets);
    setcursorTwo(data.next);
    cursor='cursor='
    cursorOne = data.next;
    console.log(cursorOne);
    //return cursorOne;
} 

  useEffect(() => {

      for (i = 0; i < callsPerProject; i++) {
        console.log(cursorTwo);
        getorders(cursorOne,cursor);
      };
      //}
      }, []);
         console.log(items)
            const fetchorders = async (cursor) => {
              const res = await fetch(

                 `https://api.opensea.io/api/v1/assets?collection=doodles-official&order_direction=desc&limit=50&cursor=${cursor}&include_orders=true`,options
              );
              const data = await res.json();
              return data;
            };
          
            const handlePageClick = async (cursor) => {
             
              const ordersFormServer = await fetchorders(cursor);
              setItems(ordersFormServer.assets);
              setcursorTwo(ordersFormServer.next)
              console.log(ordersFormServer.assets.sell_orders)
            };

            
    return (    
            <div>
              <Page>
                <Center>       
                  <DrizzleContext.Consumer>
                    {drizzleContext => {
                     const {drizzle, drizzleState, initialized } = drizzleContext;
                        if(!initialized) {
                          return (
                            <div className="justify-content-center align-items-center mt-3">   
                              <Loader className="mx-auto" color="#007bff" size="40px" />
                            </div>
                            )
                          }                       
                          return(
                            <Container fluid className="d-flex justify-content-center main-container-pp">                               
                              {/* <OsSdk  drizzleState={drizzleState} drizzle={drizzle} tokenIdArray={this.state.dataKey} projectTotal={this.state.projectTotal} /> */}
                              {/* <TestOsSdk  drizzleState={drizzleState} drizzle={drizzle} tokenIdArray={this.state.dataKey} projectTotal={this.state.projectTotal} /> */}
                              <NewTest drizzleState={drizzleState} drizzle={drizzle}  /> 
                            </Container>
                          )
                       }
                      }  
                  </DrizzleContext.Consumer>
                </Center>
              </Page>    
            </div>
       
        );
    
   
}
export default SdkPage;