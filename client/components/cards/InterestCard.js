import React from "react";
import { Button, Row, CardFooter, Card, CardHeader  } from "shards-react";
import PoolInterestBar from "../charts/PoolInterestBar.js"
import PoolEndDate from '../PoolCountDown.js';
import moment from 'moment';

export default class InterestCard extends React.Component {

  constructor(){
    super();
    this.state = {
      chartData:{},
      unixTimestamp:undefined
    }
  }

  UNSAFE_componentWillMount(){
    this.getchartData();
  }

  getchartData(){
    // Ajax calls here
    this.setState({
      chartDataBar:{
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets:[
          {
            label:'Pool Depth',
            data:[
              1617200,
              1881121,
              1903932,
              1706677,
              2105099,
              1950333
            ],
            backgroundColor:[
              '#007bff',
              '#007bff',
              '#007bff',
              '#007bff',
              '#007bff',
              '#007bff'
            ],
            // borderColor:'#FFCE56',
            // borderWidth:1.5
          }
        ] 
      }
      
    });
  }

  render() {

      const date = moment.unix(1585459434);
      const poolEndTime = date.format("MM DD YYYY, HH:mm");

      return (  
        <div className="mb-4 col-sm-12 col-md-12 col-lg-4">
          <Card className="h-100 stats-small card-small mx-auto">
            <div className="px-0 pb-0 pt-.5rem card-body">
              <Row className="d-flex px-3 pb-3">
                <div className="stats-small__data">
                  <span className="col-sm stat_small_card text-uppercase">Active Pool Interest</span>
                  <h6 className="col-sm stats-small__value count mt-1">$1,754</h6>
                </div>
                
                <div className="col-sm stats_small_data stats_percentage text-center align-items-center">
                  <div><i className="fas fa-caret-up"></i>&nbsp;3.1&nbsp;%</div>
                  <PoolEndDate timeTillDate={poolEndTime} />
                  
                </div>
              </Row>
              <CardFooter className="bg-white border-top">
                <Row className="text-muted">
                  <div className="col-xs col-sm-3 text-left pool_footer_text">Total Accrued</div>
                  <div className="col-xs col-sm-3 text-right pool_footer_text border-right">$29,354</div>
                  <div className="col-xs col-sm-3 text-left pool_footer_text">Pool Depth</div>
                  <div className="col-xs col-sm-3 text-right pool_footer_text">$1,234,559</div>
                </Row> 
              </CardFooter> 
              <CardFooter className="bg-white border-top">
                <Row>
                  <PoolInterestBar chartData={this.state.chartDataBar} legendPosition="bottom" />
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

