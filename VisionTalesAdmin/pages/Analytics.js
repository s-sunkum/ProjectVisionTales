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
  InteractionManager,
} from "react-native";
import NavButton from "./components/NavButton";
import MainText from "./components/MainText";
import axios from "axios";
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
const quizDataUrl = "https://9ncfhn4qea.execute-api.us-east-2.amazonaws.com/quizdata"
let chartDataAge = null;
let chartDataGender = null;
let chartDataOrigin = null;



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
    let dataByGender = {};
    let dataByOrigin = {};
    data.forEach(item => {
        if (!dataByAge[item.age]) {
            dataByAge[item.age] = [];
        }
        if (!dataByGender[item.gender]) {
            dataByGender[item.gender] = [];
        }
        if (!dataByOrigin[item.origin]) {
            dataByOrigin[item.origin] = [];
        }
        dataByAge[item.age].push(parseInt(item.score));
        dataByGender[item.gender].push(parseInt(item.score));
        dataByOrigin[item.origin].push(parseInt(item.score));
    });
    //Sorted data is required only for data by age
    const sortedData = Object.entries(dataByAge)
    .map(([age, scores]) => ({ age, ageNum: parseInt(age.split("-")[0], 10), scores }))
    .sort((a, b) => a.ageNum - b.ageNum);
    chartDataAge = {
        labels: sortedData.map((item) => item.age),
        datasets: [
          {
            data: sortedData.map((item) => {
                const sum = item.scores.reduce((a, b) => a + b, 0);
                return sum / item.scores.length;
              }),
          },
        ],
      };
    chartDataGender = getChart(dataByGender);
    chartDataOrigin = getChart(dataByOrigin);
}

const Analytics = ({ navigation }) => {
    const requestBody = {};
    axios.get(quizDataUrl,requestBody).then(response => {
        storeData(response.data.Items);
    })
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, backgroundColor: "#dbb42b" }}>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Score and Age Averages</Text>
            {chartDataAge &&
            <BarChart
                data={chartDataAge}
                width={Dimensions.get('window').width}
                height={200}
                yAxisSuffix={'%'}
                fromZero = {true}
                chartConfig={{
                    backgroundGradientFrom: '#0b2529',
                    backgroundGradientTo: '#0e363c',
                    color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`
                }}
      
            />
            }
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Gender and Score Averages</Text>
            {chartDataGender &&
            <BarChart
                data={chartDataGender}
                width={Dimensions.get('window').width}
                height={200}
                yAxisSuffix={'%'}
                fromZero = {true}
                chartConfig={{
                    backgroundGradientFrom: '#0b2529',
                    backgroundGradientTo: '#0e363c',
                    color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`
                }}
      
            />
            
            }
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Country and Score Averages</Text>
            {chartDataOrigin &&
            <BarChart
                data={chartDataOrigin}
                width={Dimensions.get('window').width}
                height={200}
                yAxisSuffix={'%'}
                fromZero = {true}
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