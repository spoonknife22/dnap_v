import React from "react";
import { Row, CardFooter, Card } from "shards-react";
import AssetTotalDoughNut from "../charts/AssetTotalDough.js"

export default class AssetCard extends React.Component {

  constructor(){
    super();
    this.state = {
      chartData:{}
    }
  }

  UNSAFE_componentWillMount(){
    this.getchartData();
  }

  getchartData(){
    // Ajax calls here
    this.setState({
      chartDataDough:{
        labels: [
          'Assets Sold',
          'Assets Owned'
        ],
        datasets: [{
          data: [24, 4],
          backgroundColor: [
          '#007bff',
          '#FFCE56'
          ],
          hoverBackgroundColor: [
          '#007bff',
          '#FFCE56'
          ]
        }]
      }
      
    });
  }

  render() {
      return (  
          <div className="mb-4 col-sm-12 col-md-12 col-lg-4">
            <Card className="h-100 stats-small card-small mx-auto">
              <div className="px-0 pb-0 pt-.5rem card-body">
                <Row className="d-flex px-3 pb-3">
                  <div className="stats-small__data">
                    <span className="col-sm stat_small_card text-uppercase">Protocol Purchased Assets</span>
                    <h6 className="col-sm stats-small__value count mt-1">46</h6>
                  </div>
                  <div className="col-sm stats_small_data stats_percentage text-right align-items-center">
                  
                  </div>
                </Row>
                <CardFooter className="bg-white border-top">
                <Row className="text-muted">
                    <div className="col-xs col-sm-3 text-left pool_footer_text">Avg. Days Listed</div>
                    <div className="col-xs col-sm-3 text-right pool_footer_text border-right">21 Days</div>
                    <div className="col-xs col-sm-3 text-left pool_footer_text">Avg. List Price</div>
                    <div className="col-xs col-sm-3 text-right pool_footer_text">$1,534</div>
                  </Row> 
                </CardFooter>      
                <CardFooter className="bg-white border-top">
                  <Row>                          
                    <AssetTotalDoughNut chartData={this.state.chartDataDough} legendPosition="bottom" />
                  </Row> 
                </CardFooter>                                                
              </div>
            </Card>
    
            <style jsx> {` 
                .stat_small_card {font-size: .925rem;letter-spacing: .0625rem;font-family: Poppins;}
                .stats-small__value {font-family: Roboto,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;font-size: 1.7rem;font-weight: 400;}
                .stats_small_data {flex: 1 1;display: flex;justify-content: center;flex-flow: column;max-width: 50%;z-index: 1;}
                .stats_percentage {color: #17c671;font-size: 1.2rem;position: relative;display: table;margin-left: auto;padding-left: .9375rem;}
                .dia_logo {width:9;color: #007bff;font-weight: 500;font-family: Poppins;letter-spacing: 1px;}
                .dia-interest {color: #007bff;font-family: Poppins;font-weight: 500;letter-spacing: 1px;}
                .pool_footer_text {font-weight:500;font-size:.8rem;}
                .stat_revenue {font-weight:400;font-size:1.3rem;}
              `}  
            </style>

        </div>
        
      );
  }
}

