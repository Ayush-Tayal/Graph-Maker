import { Button } from '@mui/material';
import React, { useState } from 'react'
import './UserInput.css'
import GraphComp from '../Graph/Graph'
import { showNotification } from '../../Notification';

const UserInput = () => {
    const [inputField, setInputField] = useState([{
        number : "",
        probability : ""
    },{
        number : '',
        probability : ''
    }]);

    const [yAxis, setYAxis] = useState([]);
    // console.log("user input",inputField);

    const [showGraph, setShowGraph] = useState(false);
    const [showHeading, setShowHeading] = useState(true)

    const handleChange = (i, e) => {
        const values = [...inputField];
        if(e.target.name === 'number') {
            values[i].number = e.target.value
        } else if(e.target.name === 'probability') {
            values[i].probability = e.target.value
        }

        setInputField(values);
    }

    const handleAddRow = () => {
        const values = [...inputField, {number:"", probability:""}];
        setInputField(values);
        // console.log("New Row Added ");
    }

    // making number and probability array from user input
    let numArr = [];
    let numProb = []; 
    let probabSum = 0 ;
    inputField.forEach((e) => {
        numArr.push(e.number);
        numProb.push(e.probability / 100); 
        probabSum += parseInt(e.probability);
    })
    
    // console.log("sum is ",probabSum);
    // console.log("array is ",numArr);
    // console.log("prob is ",numProb);

    //  function to generate random number
    var numberArray = numArr; 
    var prob = numProb;

    function generateRandomNumber () {
        var rNum = Math.random();
        var s = 0;
        var lastIndex = prob.length - 1;

        for (var i = 0; i < lastIndex; i++) {
            s += prob[i];
            if (rNum < s) {
                return numberArray[i];
            }
        }
        return numberArray[lastIndex];
    };
        
    //  function to calculating frequency of array
    const frequencyCal = (para) => {
        const obj = {};
        para.forEach((i) => {
            if(obj[i])
            {
                obj[i]++;
            }
            else{
                obj[i] = 1;
            }
        });
        return obj;
    }

    const handleCreateGraph = () => {
        if(probabSum === 100) {

        setShowHeading(false);
        setShowGraph(true);

        let generatedNumber = [];


        for(let i=0; i<1000; i++){
            generatedNumber.push(generateRandomNumber());
        }
        // console.log(frequencyCal(generatedNumber));
         setYAxis(frequencyCal(generatedNumber))
         showNotification("Creating Graph", "success", "1000")
        } else {
            showNotification("The probability Sum must be 100", "warning", "1000")
        }
    }

    return (
        <div id='main'> 
            <div id='user-comp'>
                {
                showHeading &&
                    <div id='userInput'>
                        <h1> Welcome to the Graph Maker ! </h1>
                        <h2> Enter numbers and their respective probabilities to create a probability distribution graph </h2>
                    </div>
                }
            
                <div>
                    <form id='form-field'>
                    { 
                    inputField.map( (e, i) => (
                        <div id='input' key={i}>
                            <div>
                                <label> Number </label>
                                <input 
                                    type="number" 
                                    name='number' 
                                    value={e.number} 
                                    onChange={ (ev) => handleChange(i, ev) }  
                                    placeholder='#'
                                />
                            </div>

                            <div>
                                <label> Probability </label>
                                <input 
                                    type="number" 
                                    name='probability' 
                                    value={e.probability} 
                                    onChange={ (ev) => handleChange(i, ev)}
                                    placeholder='%'
                                />
                            </div>
                        </div>
                    ))
                    }
                    
                        <div id='add-row-btn'>
                            <Button variant='contained' onClick={handleAddRow}> Add Row </Button>
                        </div>
                    </form>

                    <div id='create-graph-btn'>
                        <Button variant='contained' onClick={handleCreateGraph}> Create Graph </Button>
                    </div>
                </div>
            </div>

            {
                showGraph && 
                <div id='graph-comp'>
                    <GraphComp probability = {yAxis}/>
                </div>
            }

        </div>
    )
}

export default UserInput

