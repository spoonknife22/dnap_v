import React, { useState, useEffect } from 'react';
import OsSdk from './OsSdk.js';


function OtterSkd(drizzle, drizzleState) {
    const [projectTotal, setProjectTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [projectTokenIds, setprojectTokenIds] = useState([]);
    const [projectTokenIdArray, setprojectTokenIdArray] = useState([]);
  
   useEffect(() => {
        const fetchStats = async () => { 
   
            var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
            targetUrl = 'https://api.opensea.io/api/v1/collection/';
            const collectionSlug= 'doodles-official/';
            const collection='stats';
           
            let i;
            let tokenIdArray= [];
            console.log(projectTokenIdArray)
            setprojectTokenIds(tokenIdArray);
            fetch(targetUrl + collectionSlug + collection,{header:'x-api-key:2f2a0900458f4bdfbb489680a58e7526'})
              .then(res => res.json())
              .then(
                (res) => {
                   setProjectTotal(res.stats.count)
                   for (i = 0; i < res.stats.count; i++) {
                   tokenIdArray.push(i)
                  }           
                  (error) => {
                    setLoading(true),
                    error;
                  }
                })    
        }
        
        fetchStats();
      }, []);

    return (
      <div>
        {/* <OsSdk  projectTotal={projectTotal} tokenIdArray={projectTokenIds}  /> */}
      </div>
    );
  }

  export default OtterSkd;

  