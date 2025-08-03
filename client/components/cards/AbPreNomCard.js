import React, { useState, useEffect } from 'react';
import Pagination from '../Pagination';
import Nominations from '../Nominations'
import moment from "moment";
import Web3 from "web3";
import InnerAbCard from './InnerAbCard';
//import { OpenSeaPort, Network, OpenSeaAsset  } from 'opensea-js'

const AbPreNomCard = ({ props, userManaBalance }) => {
  const [orders, setOrders] = useState([]);
  const [projectTokenIds, setprojectTokenIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [parcelsPerPage] = useState(6);
  const [totalTokens, setTotalTokens] = useState();
  //const [offset, setOffset] = useState(0);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  //console.log(orders)
  useEffect(() => {
    let orderArray = [];
    let offset=0;
    const fetchPosts = async () => { 
    
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://api.opensea.io/api/v1/assets?';
    let contractAddress = 'order_direction=desc&asset_contract_address=0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e&limit=50&include_orders=true'
    let i;
    const callsPerProject = 5;

    for (i = 0; i < callsPerProject; i++, offset+=50) {
      let offset = 0;
      console.log(offset)
      fetch(targetUrl + contractAddress,{Accept: 'application/json', 'X-API-KEY': '2f2a0900458f4bdfbb489680a58e7526'})
      //fetch(targetUrl + contractAddress,{header:'x-api-key:2f2a0900458f4bdfbb489680a58e7526'})
        .then(res => res.json())
        .then((result) => {
            orderArray.push(result.assets);
            setOrders(...orderArray);
            setOffset(+ 50);
          },
          (error) => {
            setLoading(true),
            error;
          }
        )   
        .then(() => {
          setOrders(orderArray);
          console.log(orderArray)
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

export default AbPreNomCard;

// const options = {
//   method: 'GET',
//   headers: {Accept: 'application/json', 'X-API-KEY': '2f2a0900458f4bdfbb489680a58e7526'}
// };

// fetch('https://api.opensea.io/wyvern/v1/orders?asset_contract_address=0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e&is_english=false&bundled=false&include_bundled=false&token_ids=722&token_ids=3396&token_ids=6272&token_ids=1&side=1&limit=20&offset=0&order_by=created_date&order_direction=desc', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));


// export default class PurchaseProposalCard extends Component {
//   constructor(){
//     super();
//     this.state = {
//       error:null,
//       isLoaded:false,
//       assetData: []
//     }
//   }


//   componentDidMount() {
//     var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
//     targetUrl = 'https://api.opensea.io/api/v1/events?asset_contract_address=0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d&event_type=successful&only_opensea=false&auction_type=dutch&offset=6&limit=18'
//     fetch(proxyUrl + targetUrl)
//       .then(res => res.json())
//       .then(
//         (result) => {
//           this.setState({
//             isLoaded: true,
//             assets: result.asset_events
//           });
          
//             {console.log(result)}
//         },
//         (error) => {
//           this.setState({
//             isLoaded: true,
//             error
//           });
//         }
//       ) 
//   }

//   render() {
//     const { error, isLoaded, assets} = this.state;
//     if (error) {
//       return <div>Error: {error.message}</div>;
//     } else if (!isLoaded) {
//       return <Progress />
//     } else {


   
     
//       {console.log(assets)}
//       const listItems = assets.map((assetData) => 
  
//         <li key={assetData.id} className="mb-4 col-sm-12 col-md-12 col-lg-4">
//         <Card>
//            <CardHeader className="asset-header p-2 card-title text-center text-uppercase">{assetData.asset_contract.name}</CardHeader>
//            <CardTitle className="asset-vote-title text-center text-uppercase">
//              <div className="asset-vote-total">Vote Total&nbsp;&rarr;&nbsp;124</div>
//            </CardTitle>
//             <CardBody className="pb-.4rem;px-2">
//               <Row className="asset-image align-items-center">
//                 <img className="mx-auto" src= {assetData.image_preview_url}/>
//               </Row>
//               <Row className="mt-2 justify-content-center">
//                 <div className="mb-2 asset-card text-center card-text">{assetData.name}</div>
//               </Row>
//               <Row className="mt-3 justify-content-center">
//                 {/* <div className="mb-2 col-sm asset-card text-left card-text">{assetData.payment_token.symbol}</div> */}
//                 <div className="mb-2 col-sm asset-card text-right card-text">End Date</div>
//               </Row>
//               <Row className="p-0 justify-content-center">
//                 {/* <div className="mb-2 col-sm text-left card-text asset-card-numbers">{Web3.utils.fromWei(assetData.starting_price,'ether')}</div>
//                 <div className=" mb-2 col-sm text-right card-text asset-card-numbers">{assetData.duration}</div> */}
//               </Row>
//           </CardBody>
//           <CardFooter className="p-0">
//             <button type="button" className="btn btn-lg btn-block card-footer-btn">APPROVE</button>
//           </CardFooter>
//         </Card>  
//         </li>        
      
//       );
//       <style jsx> {` 
//         .asset-card{font-weight:400;color:black;font-size:.9rem;font-family: Poppins;}
//         .card-footer-btn{font-family: Poppins;font-weight:400;color:#000;font-size:1rem;letter-spacing:.3rem;border-radius:.01rem .01rem .2rem .2rem;}
//         .card-footer-btn:hover{background:#007bff;color:white;}
//         .asset-vote-total{font-weight:200;font-size:.9rem;letter-spacing:.2rem;color:#007bff;}
//         .asset-card-numbers{font-size:1rem;letter-spacing:.2rem;color:#007bff;hover:black;}
        
//         `}    
//       </style>
  

//       return (

        
//         <ul>{listItems} </ul>
      

//       );
//     }
//   }
// }
