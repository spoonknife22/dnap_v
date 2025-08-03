import React from 'react';

export default class OpenSeaApi extends React.Component {
 constructor() {
   super();
   this.state = {
     pictures: [],
   };
 }
  
  componentDidMount() {
    fetch('api.opensea.io/wyvern/v1/')
    .then(assets => {
      return assets.json();
    }).then(data => {
      let pictures = data.assets.map((pic) => {
        return (
        <div key={pic.results}>
          <img src={pic.image_thumbnail_url} />
        </div>
        )
      })
      this.setState({pictures: pictures});
      console.log("state", this.state.pictures);
    })
  }

  render() {
    return (
      <div className="container2">
        <div className="container1">
          {this.state.pictures}

        </div>

      </div>
    )
  }

}

  
//2f2a0900458f4bdfbb489680a58e7526

// -url 'https://api.opensea.io/wyvern/v1/orders?bundled=false&include_bundled=false&side=1&limit=20&offset=0&order_by=created_date&order_direction=desc' \
//      --header 'Accept: application/json' \

//      https://api.opensea.io/wyvern/v1/orders?asset_contract_address=0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e&payment_token_address=0x0000000000000000000000000000000000000000&bundled=false&include_bundled=false&token_ids=1&token_ids=15&token_ids=101&token_ids=222&token_ids=251&token_ids=569&side=1&sale_kind=0&limit=20&offset=0&order_by=created_date&order_direction=desc' \
//      --header 'Accept: application/json' \


     