import  React, { Component } from "react";
import { Container  } from "shards-react";
import PreNomAbPp from '../components/PreNomAbPp.js';
import { Page, Center } from '../components/layout/Layout.js';
import { DrizzleContext } from "@drizzle/react-plugin";
import {  Loader } from 'rimble-ui';


export default class PreAbDnaPage extends Component {

render() {
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
                              <PreNomAbPp  drizzleState={drizzleState} drizzle={drizzle}  />
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

}

