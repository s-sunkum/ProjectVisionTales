import { useState, useEffect, useRef } from "react";
import React from "react";
// FlatList, SafeAreaView, StatusBar, , Text,
import {
  FlatList,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import MainText from "./components/MainText";
import * as SQLite from "expo-sqlite";
import NavButton from "./components/NavButton";
import MainTextInput from "./components/MainTextInput";

var db = SQLite.openDatabase("VisionTalesDB.db");

const EditVideo = ({ navigation, route }) => {
  const video_id = route.params.video_id;
  // const title = route.params.title;
  // const topic = route.params.topic;
  // const url = route.params.url;
  // const yt_id = route.params.yt_id;
  // let [video_id, setVideoId] = useState(route.params.video_id);
  let [videoTitle, setVideoTitle] = useState(route.params.title);
  let [videoTopic, setVideoTopic] = useState(route.params.topic);
  let [videoURL, setVideoURL] = useState(route.params.url);
  let [videoYtId, setVideoYtId] = useState(route.params.yt_id);
  var videoQuiz = null;

  // let updateAllStates = (videoTitle, videoTopic, videoURL, videoYtId) => {
  //   setVideoTitle(videoTitle);
  //   setVideoTopic(videoTopic);
  //   setVideoURL(videoURL);
  //   setVideoYtId(videoYtId);
  //   // setVideoId(video_id);
  // };

  // useEffect(() => {
  //   console.log("checkkkkk");

  //   updateAllStates(videoTitle, videoTopic, videoURL, videoYtId);
  // }, []);

  async function getQuiz(yt_id) {
    try {
      const response = await fetch(
        "https://9ncfhn4qea.execute-api.us-east-2.amazonaws.com/videos"
      );
      const json = await response.json();
      for (let i = 0; i < json.length; i++) {
        if(json[i].video_id == yt_id){
          videoQuiz = json[i].quiz;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  let editVideo = () => {
    // console.log(videoTitle, videoTopic, videoURL, videoYtId, video_id);

    if (!videoTitle) {
      alert("Please fill video title");
      return;
    }
    if (!videoTopic) {
      alert("Please fill video topic");
      return;
    }

    (async () => {
      await getQuiz(videoYtId);
      fetch("https://9ncfhn4qea.execute-api.us-east-2.amazonaws.com/videos", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            video_id: videoYtId,
            quiz: videoQuiz,
            title: videoTitle,
            topic: videoTopic,
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        Alert.alert(
          "Success",
          "You Have Updated Successfully!",
          [
            {
              text: "Ok",
              onPress: () => navigation.navigate("HomeScreen"),
            },
          ],
          { cancelable: false }
      );
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Update Failed");
      }); 
    })();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: "space-between" }}
            >
	      <MainText text="Video with YouTube ID:" />
	      <MainText text={videoYtId} />
              <MainTextInput
                placeholder="Enter Video Title"
                value={videoTitle}
                style={{ padding: 10 }}
                onChangeText={(videoTitle) => setVideoTitle(videoTitle)}
              />
              <MainTextInput
                placeholder="Enter Video Topic"
                value={videoTopic}
                style={{ padding: 10 }}
                onChangeText={(videoTopic) => setVideoTopic(videoTopic)}
              />
              <NavButton title="Update video" customClick={editVideo} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            color: "grey",
          }}
        ></Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            color: "grey",
          }}
        >
          https://www.cherisheyesight.org/
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default EditVideo;
