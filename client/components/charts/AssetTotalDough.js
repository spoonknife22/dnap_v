import React from 'react';
import {Doughnut} from 'react-chartjs-2';

class AssetTotalDoughNut extends React.Component{
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
        <Doughnut
            data={this.state.chartData}
            options={{
              legend:{
                display:this.props.displayLegend,
                position:this.props.legendPosition            
              }
            }}
        />
      </div>
    )
  }
}

export default AssetTotalDoughNut;