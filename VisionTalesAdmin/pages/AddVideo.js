import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import CheckBox from 'expo-checkbox';
import NavButton from './components/NavButton';
import MainTextInput from './components/MainTextInput';
import { openDatabase } from 'react-native-sqlite-storage';
import * as SQLite from 'expo-sqlite';

var db = SQLite.openDatabase('VisionTalesDB.db');

const AddVideo = ({ navigation }) => {
  let [videoTitle, setVideoTitle] = useState('');
  let [videoTopic, setVideoTopic] = useState('');
  let [videoURL, setVideoURL] = useState('');
  let [textValue, setTextValue] = useState('');
  let [numInputs, setNumInputs] = useState(1);
  let [isCorrect, setIsCorrect] = useState(false);
  let refInputs = useRef([]);
  let refAnswers = useRef([]);
  let refCorrect = useRef([]);
  let questions = [];

  let setInputValue = (index, value) => {
    const inputs = refInputs.current;
    inputs[index] = value;
    setTextValue(value);
  }

  let addInput = () => {
    refInputs.current.push('');
    refAnswers.current.push(['', '']);
    refCorrect.current.push([false, false]);
    setNumInputs(refInputs.current.length);
  }

  let removeInput = () => {
    refInputs.current.splice(refInputs.current.length - 1, 1)[0];
    refAnswers.current.splice(refAnswers.current.length - 1, 1)[0];
    refCorrect.current.splice(refCorrect.current.length - 1, 1)[0];
    setNumInputs(refInputs.current.length);
  }

  let populateQuestions = () => {
    for (let i = 0; i < refInputs.current.length; i++) {
      let answers = [];
      for (let j = 0; j < refAnswers.current[i].length; j++) {
        answers.push(
          <View key={j}>
            <Text>Answer {j + 1}.</Text>
            <MainTextInput
              placeholder="Enter Answer"
              onChangeText={
                value => {
                  refAnswers.current[i][j] = value;
                  setTextValue(value);
                }
              }
              value={refAnswers.current[i][j]}
              style={{ padding: 10 }}
            />
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <CheckBox
                value={refCorrect.current[i][j]}
                onValueChange={
                  value => {
                    refCorrect.current[i][j] = value;
                    setIsCorrect(!isCorrect);
                  }
                }
                style={{ margin: 10 }}
              />
              <Text style={{ marginTop: 10 }}>Correct Answer</Text>
            </View>
          </View>
        )
      }

      questions.push(
        <View key={i}
          style={{
            borderTopColor: 'black',
            borderTopWidth: 1,
            paddingTop: 15,
            marginTop: 15,
          }}>
          <Text>Question {i + 1}.</Text>
          <MainTextInput
            placeholder="Enter Question"
            onChangeText={
              value => setInputValue(i, value)
            }
            value={refInputs.current[i]}
            style={{ padding: 10 }}
          />
          {answers}
          {refAnswers.current[i].length < 4 ?
            <NavButton
              title="Add an Answer"
              customClick={
                () => {
                  refAnswers.current[i].push('');
                  refCorrect.current[i].push(false);
                  setNumInputs(refAnswers.current[i].length);
                }
              }
              style={{ marginBottom: 10 }}
            />
            : null
          }
          {refAnswers.current[i].length > 2 ?
            <NavButton
              title="Remove Answer"
              customClick={
                () => {
                  refAnswers.current[i].splice(refAnswers.current[i].length - 1, 1)[0];
                  refCorrect.current[i].splice(refCorrect.current[i].length - 1, 1)[0];
                  setNumInputs(refAnswers.current[i].length);
                }} />
            : null
          }
        </View>
      );
    }
  }

  let add_video = () => {
    if (!videoTitle) {
      alert('Error: Please fill video title');
      return;
    }
    if (!videoTopic) {
      alert('Error: Please fill video topic');
      return;
    }
    if (!videoURL) {
      alert('Error: Please fill video URL');
      return;
    }
    if (videoURL.length < 11) {
      alert('Error: Valid YouTube URL/IDs are at least 11 digits');
      return;
    }

    for (let i = 0; i < refInputs.current.length; i++) {
      if (!refInputs.current[i]) {
        alert(`Please fill Question ${i + 1}`);
        return;
      }

      for (let j = 0; j < refAnswers.current[i].length; j++) {
        if (!refAnswers.current[i][j]) {
          alert(`Please fill Answer ${j + 1} of Question ${i + 1}`);
          return;
        }
        if (!refCorrect.current[i].includes(true)) {
          alert(`At least 1 answer of Question ${i + 1} should be correct`);
          return;
        }
      }
    }
    console.log(refInputs.current);
    console.log(refAnswers.current);
    console.log(refCorrect.current);
    fetch("https://9ncfhn4qea.execute-api.us-east-2.amazonaws.com/videos", {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        video_id: videoURL.substring(videoURL.length - 11, videoURL.length),
        quiz: {
          questions: refInputs.current,
          choices: refAnswers.current,
          correct: refCorrect.current,
        },
        title: videoTitle,
        topic: videoTopic,
      })
    })
      .then(response => response.json())
      .then((data) => {
        db.transaction(function (txn) {
          txn.executeSql(
            'INSERT INTO table_video (title, topic, url, yt_id) VALUES (?,?,?,?)',
            [videoTitle, videoTopic, videoURL, videoURL.substring(videoURL.length - 11, videoURL.length)],
            (txn, results) => {
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Success',
                  'You Have Uploaded Successfully!',
                  [
                    {
                      text: 'Ok',
                      onPress: () => navigation.navigate('HomeScreen'),
                    },
                  ],
                  { cancelable: false }
                );
              } else {
                
                alert('Local Upload Failed');
              }
            }
          );
        });
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Upload Failed');
      });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <MainTextInput
                placeholder="Enter Title"
                onChangeText={
                  (videoTitle) => setVideoTitle(videoTitle)
                }
                style={{ padding: 10 }}
              />
              <MainTextInput
                placeholder="Enter Topic"
                onChangeText={
                  (videoTopic) => setVideoTopic(videoTopic)
                }
                style={{ padding: 10 }}
              />
              <MainTextInput
                placeholder="Enter URL"
                onChangeText={
                  (videoURL) => setVideoURL(videoURL)
                }
                style={{ padding: 10 }}
              />

              {populateQuestions()}
              {questions.map(question => question)}
              {refInputs.current.length < 5 ?
                <NavButton
                  title="Add a Question"
                  customClick={addInput} />
                : null
              }
              {refInputs.current.length > 0 ?
                <NavButton
                  title="Remove Question"
                  customClick={removeInput} />
                : null
              }

              <NavButton title="Submit" customClick={add_video} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddVideo;
