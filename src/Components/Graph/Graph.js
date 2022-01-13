import React, { useEffect, useState } from 'react'
import './Graph.css'
import Paper from '@material-ui/core/Paper';
import { ArgumentAxis, ValueAxis, Chart, BarSeries} from '@devexpress/dx-react-chart-material-ui';

const Graph = ({probability}) => {
    // console.log("probability props", probability) ;
    
    const [data, setData] = useState([]);
    let probKeys = Object.keys(probability);
    let probValue = Object.values(probability)

    useEffect(() => {
        let temp = [...data];
        for(let i=0; i<probKeys.length; i++) {
            temp.push({argument:probKeys[i], value : probValue[i]})
        }
        setData(temp);
    }, [])
    

    return (
        <>
        <div>
            <h1> Random Number Frequency Chart </h1>
        </div>
        
        <Paper id='graph'>
            <Chart data={data} >
                <ArgumentAxis /> {/* x-axis */}
                <ValueAxis /> {/* y-axis */}
                <BarSeries valueField="value" argumentField="argument" color='skyBlue' barWidth={0.5} />
            </Chart>
        </Paper>
        </>
    )
}

export default Graph
