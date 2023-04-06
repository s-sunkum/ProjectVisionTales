import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, Text, StatusBar, Pressable, StyleSheet, } from 'react-native';
import * as SQLite from 'expo-sqlite';
import uuid from 'react-native-uuid';
import { quizScore, incrementScore, setQuizScore } from "./QuizScore";
import {name, age, gender, country} from './UserSession'
import axios from "axios";
var db = SQLite.openDatabase('VisionTalesDB.db');

const quizDataUrl = "https://9ncfhn4qea.execute-api.us-east-2.amazonaws.com/quizdata"
let result = 0;
const Quiz = (props) => {
  if(props.qNum >= props.questions.length){
    result = quizScore/props.qNum * 100;
    const requestBody = {
      quiz_id: uuid.v4(),
      score: result.toString(),
      origin: country,
      age: age,
      gender: gender
    }
    
    axios.post(quizDataUrl,requestBody).then(response => {
      
    }).catch(error => {
      if(error.response.status === 401 || error.response.status === 403){
        alert(error.response.data.message);
      }else{
        alert("Network Error");
      }
    })
  }
  return (
    <SafeAreaView>
      <Text 
        style={{ 
          padding: 25,
          marginTop: '8%',
          marginLeft: "10%",
          marginRight: "10%",
          color: '#ecebeb',
          fontSize: 24,
          fontWeight: '700', 
          backgroundColor: '#91781c'}}>

          {props.questions[props.qNum]}

      </Text>
      <Text>
              {"\n"}
            </Text>
      {props.choices[props.qNum] &&
        props.choices[props.qNum].map((item, key) => (
          <Pressable onPress={() => {
            // Increment our question counter
            props.customClick()
            if (props.correct[props.qNum][key]) {
              alert("🤗😊🎈 Correct! 😀🥳😇")
              incrementScore();
            } else {
              alert("Incorrect!")
            }
          }
         } style={[styles.button]}>
            <Text key={key} style={{ color: "#dbb42b", fontSize: 20 }} >{item}</Text>
          </Pressable>
        ))
      }
      {(props.qNum >= props.questions.length) &&
      <Text style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 10, fontSize: 20, textAlign: 'center' }}>
        Quiz done! 🥳✅ Please return to previous page 🔙{'\n'}
        <Text>Quiz Score: {result}%</Text>
      </Text>
}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#0e363c',
    color: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
  text: {
    color: '#dbb42b',
    fontSize: 20
  },
  baseText: {
    fontWeight: 'bold'
  },
  container: {
    color: 'white'
  }
});

export default Quiz;
