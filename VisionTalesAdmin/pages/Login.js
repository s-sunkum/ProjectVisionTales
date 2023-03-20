import React, { useState, useRef, useEffect } from 'react';
import NavButton from "./components/NavButton";
import MainTextInput from './components/MainTextInput';
import PasswordTextInput from './components/PasswordTextInput';
import axios from "axios";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';


const loginUrl = "https://9ncfhn4qea.execute-api.us-east-2.amazonaws.com/login"

const Login = ({ navigation }) => {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let authenticate = () => {
        const requestBody = {
            username: username,
            password: password
        }
        axios.post(loginUrl,requestBody).then(response => {
            navigation.navigate("HomeScreen");
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
                placeholder="Enter Username"
                onChangeText={
                  (username) => setUsername(username)
                }
                style={{ padding: 10 }}
            />
            <PasswordTextInput
                placeholder="Enter Password"
                onChangeText={
                  (password) => setPassword(password)
                }
                style={{ padding: 10 }}
            />
            <NavButton
              title="Log In"
              customClick={() => authenticate()}
            />
            <NavButton
              title="New Member? Create Account"
              customClick={() => navigation.navigate("Register")}
            />
          </ScrollView>
        </SafeAreaView>
      );

}

export default Login;