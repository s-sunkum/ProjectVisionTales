import React, { useState, useRef, useEffect } from 'react';
import NavButton from "./components/NavButton";
import MainTextInput from './components/MainTextInput';
import axios from "axios";
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
    let authenticate = () => {
        const requestBody = {
            name: name,
            email: email,
            username: username,
            password: password
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
                style={{ padding: 10 }}
            />
            <MainTextInput
                placeholder="Email"
                onChangeText={
                  (email) => setEmail(email)
                }
                style={{ padding: 10 }}
            />
            <MainTextInput
                placeholder="Enter Username"
                onChangeText={
                  (username) => setUsername(username)
                }
                style={{ padding: 10 }}
            />
            <MainTextInput
                placeholder="Enter Password"
                onChangeText={
                  (password) => setPassword(password)
                }
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