import "react-native-gesture-handler";

import * as React from "react";
import { Button, View, Text, Image, Linking, TouchableOpacity } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import Register from "./pages/Register";
import Login from "./pages/Login";
import HomeScreen from "./pages/HomeScreen";
import ViewTopics from "./pages/ViewTopics";
import ViewVideos from "./pages/ViewVideos";
import AddVideo from "./pages/AddVideo";
import EditVideo from "./pages/EditVideo";
import DeleteVideo from "./pages/DeleteVideo";
import AddQuiz from "./pages/AddQuiz";
import ViewQuizzes from "./pages/ViewQuizzes";
import EditQuiz from "./pages/EditQuiz";
import EditVideoQuiz from "./pages/EditVideoQuiz";
import Donate from "./pages/Donate";
import ViewQuiz from "./pages/ViewQuiz";
import SocialEyes from "./pages/SocialEyes";
import UserHomeScreen from "./pages/UserHomeScreen";
import UserViewTopics from "./pages/UserViewTopics";
import UserViewVideos from "./pages/UserViewVideos";
import UserViewQuizzes from "./pages/UserViewQuizzes";



//the colors that control what the background of the app looks like and what the top header of the app looks like
const bkColor = "#02353c";
const headerColor = "#dbb42b";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Blog" labelStyle={{color: headerColor}} onPress={() => Linking.openURL("https://www.cherisheyesight.org/news")} />
      <DrawerItem label="Additional Resources" labelStyle={{color: headerColor}} onPress={() => Linking.openURL("https://www.cherisheyesight.org/resources")} />
      <DrawerItem label="Our Homepage" labelStyle={{color: headerColor}} onPress={() => Linking.openURL("https://www.cherisheyesight.org/")} />
      <DrawerItem label="Contact Us" labelStyle={{color: headerColor}} onPress={() => Linking.openURL("https://www.cherisheyesight.org/contact")} />
    </DrawerContentScrollView>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: bkColor,
        },
        drawerLabelStyle: {
          color: headerColor,
        },
        drawerPosition: "right",
        headerShown: false,
        swipeEdgeWidth: 150,
        
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={UserHomeScreen}/>
      <Drawer.Screen name="Donate" component={Donate} />
      <Drawer.Screen name="SocialEYES" component={SocialEyes} />
    </Drawer.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
          name="Sign Out"
          component={Login}
          options={{
            //title: "Vision Tales",
            headerTitle: (props) => (
              //title: "Home", //Set Header Title
              <Image
                style={{ width: 200, height: 50 }}
                source={require('./assets/eyesight_logo.png')}
                resizeMode='contain'
              />
            ),
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            //title: "Vision Tales",
            headerTitle: (props) => (
              //title: "Home", //Set Header Title
              <Image
                style={{ width: 200, height: 50 }}
                source={require('./assets/eyesight_logo.png')}
                resizeMode='contain'
              />
            ),
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            //title: "Vision Tales",
            headerTitle: (props) => (
              //title: "Home", //Set Header Title
              <Image
                style={{ width: 200, height: 50 }}
                source={require("./assets/eyesight_logo.png")}
                resizeMode="contain"
              />
            ),
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="AddVideo"
          component={AddVideo}
          options={{
            title: "Video Upload", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="ViewTopics"
          component={ViewTopics}
          options={{
            title: "Vision Tales", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="ViewVideos"
          component={ViewVideos}
          options={{
            title: "Vision Tales", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="EditVideo"
          component={EditVideo}
          options={{
            title: "Edit Video", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="DeleteVideo"
          component={DeleteVideo}
          options={{
            title: "Delete Video", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="AddQuiz"
          component={AddQuiz}
          options={{
            title: "Quiz Upload", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="ViewQuizzes"
          component={ViewQuizzes}
          options={{
            title: "Test Your EyeQ", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="EditQuiz"
          component={EditQuiz}
          options={{
            title: "Edit Quiz", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />

        <Stack.Screen
          name="EditVideoQuiz"
          component={EditVideoQuiz}
          options={{
            title: "Edit Video Quiz", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />

        <Stack.Screen
          name="ViewQuiz"
          component={ViewQuiz}
          options={{
            title: "Take Quiz", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />


        <Stack.Screen
          name="Donate"
          component={Donate}
          options={{
            title: "Donate", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="SocialEyes"
          component={SocialEyes}
          options={{
            title: "SocialEYES", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="UserHomeScreen"
          component={MyDrawer}
          options={{
            title: "UserHomeScreen", //Set Header Title
            headerTitle: (props) => (
              //title: "Home", //Set Header Title
              <TouchableOpacity onPress={() => Linking.openURL("https://www.cherisheyesight.org/")}>
                <Image
                  style={{ width: 200, height: 50 }}
                  source={require('./assets/eyesight_logo.png')}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />

        <Stack.Screen
          name="UserViewTopics"
          component={UserViewTopics}
          options={{
            title: "UserViewTopics", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />

        <Stack.Screen
          name="UserViewVideos"
          component={UserViewVideos}
          options={{
            title: "UserViewVideos", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="UserViewQuizzes"
          component={UserViewQuizzes}
          options={{
            title: "UserViewQuizzes", //Set Header Title
            headerStyle: {
              backgroundColor: bkColor, //Set Header color
            },
            headerTintColor: headerColor, //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
