import React from 'react';
import {Bar} from 'react-chartjs-2';

class PoolInterestBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'',
    location:''
  }

  render(){
    return (
      <div className="col-sm chart">

        <Bar
            data={this.state.chartData}
            options={{
             // maintainAspectRatio: false,
              legend:{
                display:this.props.displayLegend,
                position:this.props.legendPosition            
              },
              scales: {
                xAxes: [{
                    gridLines: {
                        display:false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display:true
                    },
                    ticks: {
                      suggestedMin: 100000,
                      suggestedMax: 2200000,
                      stepSize:500000,
                    }

                }],
            }

            }}
        />

      </div>
    )
  }
}

export default PoolInterestBar;