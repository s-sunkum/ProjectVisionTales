import React, { useState, useRef, useEffect, useMemo } from 'react';
import NavButton from "./components/NavButton";
import MainTextInput from './components/MainTextInput';
import MainText from './components/MainText'
import axios from "axios";
import CountryPicker from 'react-native-country-picker-modal';
import { CountrySelection } from 'react-native-country-list';
import { SelectList } from 'react-native-dropdown-select-list';
import countryData from './components/CountryData';
import ageRanges from './components/AgeRanges';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';

const registerUrl = "https://9ncfhn4qea.execute-api.us-east-2.amazonaws.com/register"

const Register = ({ navigation }) => {
    
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [location, setLocation] = useState('');
    let [age, setAge] = useState("");
    let [gender,setGender] = useState("");
    const genderChoices = [
      {key:'1', value:'Male'},
      {key:'2', value:'Female'},
      {key:'3', value:'Non Binary'},
      {key:'4', value:'Prefer Not To Say'}
    ]


    let authenticate = () => {
        location = location.substring(0,location.length - 4);
        const requestBody = {
            name: name,
            email: email,
            username: username,
            password: password,
            origin: location,
            age: age,
            gender: gender
        }
        axios.post(registerUrl,requestBody).then(response => {
            alert("Account Registered!");
            navigation.navigate("Sign Out");
        }).catch(error => {
            if(error.response.status === 401 || error.response.status === 403){
                alert(error.response.data.message);
            }else{
                alert("Network Error");
            }
        })
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1, backgroundColor: "#dbb42b" }}>
          <MainTextInput
                placeholder="Name"
                onChangeText={
                  (name) => setName(name)
                }
                style={{ padding: 10, backgroundColor: "#ffffff", margin: 2 }}
            />
            <MainTextInput
                placeholder="Email"
                onChangeText={
                  (email) => setEmail(email)
                }
                style={{ padding: 10, backgroundColor: "#ffffff", margin: 2  }}
            />
            <MainTextInput
                placeholder="Enter Username"
                onChangeText={
                  (username) => setUsername(username)
                }
                style={{ padding: 10, backgroundColor: "#ffffff", margin: 2  }}
            />
            <MainTextInput
                placeholder="Enter Password"
                onChangeText={
                  (password) => setPassword(password)
                }
                style={{ padding: 10, backgroundColor: "#ffffff", margin: 2 }}
            />
            <Text>
              {"\n"}
            </Text>
            <SelectList 
              setSelected={(location) => setLocation(location)} 
              data={countryData} 
              save="value"
              style={{ padding: 10 }}
            />
            <Text>
              {"\n"}
            </Text>
            <SelectList 
              setSelected={(age) => setAge(age)} 
              data={ageRanges} 
              save="value"
              style={{ padding: 10 }}
            />
            <Text>
              {"\n"}
            </Text>
            <SelectList 
              setSelected={(gender) => setGender(gender)} 
              data={genderChoices} 
              save="value"
              style={{ padding: 10 }}
            />
            <NavButton
              title="Register"
              
              customClick={() => authenticate()}
            />
          </ScrollView>
        </SafeAreaView>
      );

}

export default Register;