import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  Linking,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import NavButton from "./components/NavButton";
import MainText from "./components/MainText";
import axios from "axios";
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
const quizDataUrl = "https://9ncfhn4qea.execute-api.us-east-2.amazonaws.com/quizdata"
let chartDataAge = null;


let getChart = (formmattedData) => {
    let chartData = {
        labels: Object.keys(formmattedData),
        datasets: [
          {
            data: Object.values(formmattedData).map(scores => scores.reduce((a, b) => a + b, 0) / scores.length)
          },
        ],
      };
    return chartData;
}
let storeData = (data) => {
    let dataByAge = {};
    data.forEach(item => {
        if (!dataByAge[item.age]) {
            dataByAge[item.age] = [];
        }
        dataByAge[item.age].push(parseInt(item.score));
    });
    
    chartDataAge = getChart(dataByAge);
}
const Analytics = ({ navigation }) => {
    const requestBody = {};
    axios.get(quizDataUrl,requestBody).then(response => {
        storeData(response.data.Items);
    })
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, backgroundColor: "#dbb42b" }}>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Age vs Score</Text>
            {chartDataAge &&
            <BarChart
                data={chartDataAge}
                width={Dimensions.get('window').width}
                height={200}
                yAxisSuffix={'%'}
                
                chartConfig={{
                    backgroundGradientFrom: '#0b2529',
                    backgroundGradientTo: '#0e363c',
                    color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`
                }}
      
            />
            }
            </ScrollView>
        </SafeAreaView>
  );
}
export default Analytics;