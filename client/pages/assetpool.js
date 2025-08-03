import React from "react";
import AssetPoolSection from "../components/AssetPoolSection.js";
import { Page, Center } from '../components/layout/Layout.js';



export default class AssetPool extends React.Component {

render() {
    return (    
            <div>
              <Page>
                <Center>
                  <AssetPoolSection />
                </Center>
              </Page>  
            </div>
       
        );
    }

}

