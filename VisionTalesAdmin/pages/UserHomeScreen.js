import React, { useEffect, useState } from "react";
import { ScrollView, Text, FlatList, View, SafeAreaView, Alert, Linking } from "react-native";
import NavButton from "./components/NavButton";
import VideoTitleText from './components/VideoTitleText';
import SmallNavButton from "./components/SmallNavButton";
import YoutubePlayer from 'react-native-youtube-iframe';
import LargeNavButton from "./components/LargeNavButton";
import MainText from "./components/MainText";
import ViewQuiz from './ViewQuiz';
import Quiz from './components/QuizQuestion';
import { quizScore, incrementScore, setQuizScore } from "./components/QuizScore";
import * as SQLite from "expo-sqlite";
import { useIsFocused } from "@react-navigation/native";

var db = SQLite.openDatabase("VisionTalesDB.db");
const UserHomeScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  // demoInfoFilled is to check if demographic info is filled up
  const [demoInfoFilled, setDemoInfoFilled] = useState(0);

  // Map of video title to Id's
  const videoIdMap = new Map();

  // Demographic Info
  const [demoInfo, setDemoInfo] = useState([]);

  // Object to contain JSON response from db server
  let videoData = {};

  // Pull video data from AWS
  async function getVideos() {
    try {
      const response = await fetch(
        "https://9ncfhn4qea.execute-api.us-east-2.amazonaws.com/videos"
      );
      const json = await response.json();
      videoData = json;
      await loadDatabase();
    } catch (error) {
      console.log(error);
    }
  }

  async function loadDatabase() {
    db.transaction(function (txn) {
      // Begin creating Video Table
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_video'",
        [],
        function (tx, res) {
          if (res.rows.length >= 0) {
            txn.executeSql("DROP TABLE IF EXISTS table_video", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_video(video_id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(20), topic VARCHAR(20), url VARCHAR(255), yt_id VARCHAR(20))",
              []
            );
          }
        },
        function (tx, error) {
          console.log(error);
        }
      );
    });

    // Insert videos pulled from server into local database
    for (let i = 0; i < videoData.length; i++) {
      db.transaction(function (txn) {
        // Insert into video table video data:
        txn.executeSql(
          "INSERT INTO table_video (title, topic, url, yt_id) VALUES (?,?,?,?)",
          [
            videoData[i].title,
            videoData[i].topic,
            videoData[i].yt_url,
            videoData[i].video_id,
          ],
          (txn, results) => {
            if (results.rowsAffected > 0) {
              videoIdMap.set(videoData[i].title, results.insertId);
            } else {
              alert("Upload Failed");
            }
          }
        );
      });
    }

    // Create demographic storage
    db.transaction(function (txn) {
      // Begin creating Video Table
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_demographics'",
        [],
        function (tx, res) {
          if (res.rows.length == 0) {
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_demographics(d_id INTEGER PRIMARY KEY, location VARCHAR(50), gender VARCHAR(20), age VARCHAR(255))",
              [],
              (txn, res) => {},
              (txn, error) => {
                console.log(error);
              }
            );
          }
        }
      );
    });

    //Fill demographic data
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT d_id FROM table_demographics WHERE d_id=1",
        [],
        function (tx, res) {
          if (res.rows.length == 0) {
            txn.executeSql(
              "INSERT INTO table_demographics (d_id, location, gender, age) VALUES(1,'NA','NA','NA')",
              [],
              (txn, res) => {},
              (txn, error) => {
                console.log(error);
              }
            );
          }
        }
      );
    });

    db.transaction(function (txn) {
      // Begin creating Quiz Table
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_quiz'",
        [],
        function (txn, res) {
          if (res.rows.length >= 0) {
            txn.executeSql(
              "DROP TABLE IF EXISTS table_quiz",
              [],
              (txn, res) => {},
              (txn, error) => {
                console.log(error);
              }
            );
            // txn.executeSql("PRAGMA foreign_keys = ON");
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_quiz(quiz_id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(20), video_id INTEGER NOT NULL, FOREIGN KEY (video_id) REFERENCES table_video (video_id))",
              [],
              (txn, response) => {},
              (txn, error) => {
                console.log(error);
              }
            );
          }
        }
      );
    });

    db.transaction(function (txn) {
      // Begin creating for Question Table
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_question'",
        [],
        function (txn, res) {
          if (res.rows.length >= 0) {
            txn.executeSql("DROP TABLE IF EXISTS table_question", []);
            // , ,
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_question(question_id INTEGER PRIMARY KEY AUTOINCREMENT, content VARCHAR(255), quiz_id INTEGER NOT NULL, FOREIGN KEY (quiz_id) REFERENCES table_quiz(quiz_id) )",
              []
            );
          }
        }
      );
    });

    db.transaction(function (txn) {
      // Begin creating for Question Choice Table
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_question_choice'",
        [],
        function (tx, res) {
          if (res.rows.length >= 0) {
            txn.executeSql("DROP TABLE IF EXISTS table_question_choice", []);
            // isAnswer: 0 means false/ 1 means true
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_question_choice(choice_id INTEGER PRIMARY KEY AUTOINCREMENT, choice_content VARCHAR(255), isAnswer INTEGER, question_id INTEGER NOT NULL, FOREIGN KEY (question_id) REFERENCES table_question(question_id) )",
              []
            );
          }
        }
      );
    });

    db.transaction(function (txn) {
      // Insert quizzes, choices, and answers into local DB from server DB
      // Insert quizzes from server into local DB
      if (videoData) {
        for (let i = 0; i < videoData.length; i++) {
          // If the quiz object isn't empty:
          if (videoData[i].quiz) {
            txn.executeSql(
              "INSERT INTO table_quiz (title, video_id) VALUES (?,?)",
              [
                videoData[i].title + ` Quiz`,
                videoIdMap.get(videoData[i].title),
              ],
              (txn, resultsQuiz) => {
                if (resultsQuiz.rowsAffected > 0) {
                  // If the questions object in quiz isn't empty
                  if (videoData[i].quiz.questions) {
                    for (
                      let j = 0;
                      j < videoData[i].quiz.questions.length;
                      j++
                    ) {
                      txn.executeSql(
                        "INSERT INTO table_question (content, quiz_id) VALUES (?, ?)",
                        [videoData[i].quiz.questions[j], resultsQuiz.insertId],
                        (txn, resultsQuestion) => {
                          // Now, upload choices for question, if question download is successful
                          if (resultsQuestion.rowsAffected > 0) {
                            for (
                              let k = 0;
                              k < videoData[i].quiz.choices.length;
                              k++
                            ) {
                              txn.executeSql(
                                "INSERT INTO table_question_choice (choice_content, isAnswer, question_id) VALUES (?, ?, ?)",
                                [
                                  videoData[i].quiz.choices[j][k],
                                  videoData[i].quiz.correct[j][k],
                                  resultsQuestion.insertId,
                                ],
                                (txn, resultsChoice) => {
                                  if (resultsChoice.rowsAffected > 0) {
                                    console.log(
                                      videoData[i].quiz.choices[j][k] +
                                        " downloaded successfully!"
                                    );
                                  } else {
                                    alert("Choice Download Failed");
                                  }
                                }
                              );
                            }
                          } else {
                            alert("Question Download Failed");
                          }
                        }
                      );
                    }
                  }
                } else {
                  alert("Upload Failed");
                }
              }
            );
          }
        }
      }
    });
  }

  async function startup() {
    // const [demoInfoFilled, setDemoInfoFilled] = useState();
    console.log("---------- BEGIN --------------");
    await getVideos();

    // Test for quiz input
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT * from table_demographics",
        [],
        (txn, result) => {
          if (result.rows.length > 0) {
            // if demographic info is filled up, the user would only able to change their profile
            setDemoInfoFilled(1);
          } else {
            setDemoInfoFilled(0);
          }
        },
        (txn, error) => {
          console.log(error);
          console.log("quiz error!!");
        }
      );
    });
  }

  // Code to run on startup
  useEffect(() => {
    // Put Your Code Here Which You Want To Refresh or Reload on Coming Back to This Screen.
    startup();
  }, [isFocused]);

  let [flatListItems, setFlatListItems] = useState([]);
  let questions = [];
  let choices = [];
  let correct = [];

  async function getQuiz(yt_id) {
    try {
      const response = await fetch(
        "https://9ncfhn4qea.execute-api.us-east-2.amazonaws.com/videos"
      );
      const json = await response.json();
      var videoQuiz = null;
      for (let i = 0; i < json.length; i++) {
        if(json[i].video_id == yt_id){
          videoQuiz = json[i];
        }
      }
      questions = videoQuiz.quiz.questions;
      choices = videoQuiz.quiz.choices;
      correct = videoQuiz.quiz.correct;

      console.log("made call in View Video Quiz: ", questions.length);
    } catch (error) {
      console.log(error);
    }
  }

  async function takeQuiz(e, yt_id) {
    if (e === "ended") {
      await getQuiz(yt_id);
      if (questions.length > 0) {
	Alert.alert("Quiz time! Please take the quiz.");
        navigation.navigate("ViewQuiz", {
          id: yt_id,
          questions: questions,
          choices: choices,
          correct: correct,
        });
      }
    }
  }

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM table_video', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
         temp.push(results.rows.item(i));
         setFlatListItems(temp);
        }
        });
      }
    )
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: "100%",
          backgroundColor: "#cccccc",
        }}
      />
    );
  };
  let listItemView = (item) => {
    return (
      <View
        key={item.video_id}
        style={{ backgroundColor: '#0e363c', padding: 15, borderRadius: 20, margin: '3%' }}
      >
  
	<VideoTitleText text={item.title} />
  <YoutubePlayer 
	  height = {200}
	  play={false}
	  videoId={item.yt_id}
	  onChangeState={e => takeQuiz(e, item.yt_id)}
	/>

        <SmallNavButton
          title="What Do You Know?"
          customClick={async () => {
            await getQuiz(item.yt_id);
            setQuizScore(0);
            navigation.navigate("ViewQuiz", {
              id: item.yt_id,
              questions: questions,
              choices: choices,
              correct: correct,
            });
          }}
        />
      </View>
    );
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#dbb42b" }}>
        <FlatList
          data={flatListItems}
          ItemSeparatorComponent={listViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => listItemView(item)}
        />
      </View>
    </SafeAreaView>
  );
};
export default UserHomeScreen;
