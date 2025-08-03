import React from 'react';
import {Line} from 'react-chartjs-2';

class PoolTotalChart extends React.Component{
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
      <div className="col-sm">
       
         <Line
          data={this.state.chartData}
          options={{
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
                      display:false
                  },
                  ticks: {
                    suggestedMin: 1500,
                    suggestedMax: 2200,
                    stepSize:200
                  }
              }]
          }

          }}
        />
      </div>
    )
  }
}

export default PoolTotalChart;