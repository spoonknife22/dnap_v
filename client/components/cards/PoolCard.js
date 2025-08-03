import React from "react";
import { Container, Row, CardFooter, Card, CardHeader  } from "shards-react";
import PoolTotalChart from "../charts/PoolTotalLine.js"

export default class PoolCard extends React.Component {

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
      chartData:{
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets:[
          {
            label:'Revenue',
            data:[
              1617,
              1881,
              1903,
              1606,
              2105, 
              1950
            ],
            backgroundColor:[
              '#007bff'
            ],
            borderColor:'#FFCE56',
            pointRadius:0,
            borderDash:[],
            lineTension: 0.3,
            borderWidth:0
          }
        ]
      }
      
    });
  }

  render() {
      return (  
          <div className="mb-4 col-sm-12 col-md-12 col-lg-4">
            <Card className="h-100 stats-small card-small mx-auto">
              <div className="px-0 pb-0 pt-.5rem card-body">
                <Row className="align-items-middle d-flex px-3 pb-3">
                  <div className="stats-small__data">
                    <span className="col-sm stat_small_card text-uppercase">Asset Revenue</span>
                    <h6 className="col-sm stats-small__value count mt-1">$34,249</h6>
                  </div>
                  <div className="col-sm ">
                  </div>
                  <div className="col-sm stats_small_data stats_percentage text-right align-items-center">
                    <span>Assets Sold</span>
                    <div className="asset-sold-total">24</div>
                  </div>
                </Row>
                <CardFooter className="bg-white border-top">
                  <Row className="text-muted">
                    <div className="col-xs col-sm-3 text-left pool_footer_text">Avg. Sale Price</div>
                    <div className="col-xs col-sm-3 text-right pool_footer_text border-right">$1,427</div>
                    <div className="col-xs col-sm-3 text-left pool_footer_text">Sale Profit</div>
                    <div className="col-xs col-sm-3 text-right pool_footer_text">$4,895</div>
                  </Row> 
                </CardFooter>       
                <CardFooter className="bg-white border-top">
                  <Row>
                    <PoolTotalChart chartData={this.state.chartData} legendPosition="bottom" />
                  </Row> 
                </CardFooter>                                     
              </div>
            </Card>
    
            <style jsx> {` 
                .stat_small_card {font-size: .925rem;letter-spacing: .0625rem;font-family: Poppins;}
                .stats-small__value {font-family: Roboto,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;font-size: 1.7rem;font-weight: 400;}
                .stats_small_data {flex: 1 1;display: flex;justify-content: center;flex-flow: column;max-width: 50%;z-index: 1;}
                .stats_percentage {color: #000;font-size: 1rem;position: relative;display: table;margin-left: auto;padding-left: .9375rem;}
                .asset-sold-total{color:#17c671;}
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

