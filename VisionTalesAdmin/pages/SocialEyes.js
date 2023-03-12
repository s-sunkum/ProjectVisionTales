import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Linking,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import MainText from "./components/MainText";

const SocialEyes = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#dbb42b" }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.contentContainer}
        >
          <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
            <MainText text="Visit Our Social Media Pages!" />
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "https://www.instagram.com/cherisheyesight/?hl=en"
                )
              }
            >
              <Image
                style={styles.image}
                source={require("./images/instalogo.webp")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://www.facebook.com/cherisheyesight")
              }
            >
              <Image
                style={styles.image}
                source={require("./images/fblogo.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://twitter.com/CherishEyesight")
              }
            >
              <Image
                style={styles.image}
                source={require("./images/twitlogo.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "https://www.linkedin.com/company/cherish-eyesight-visions/"
                )
              }
            >
              <Image
                style={styles.image}
                source={require("./images/linklogo.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "https://www.youtube.com/channel/UCb3e6gU30PXtBYJj_gwC_fA"
                )
              }
            >
              <Image
                style={styles.image}
                source={require("./images/ytlogo.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://www.tiktok.com/@cherisheyesightvision")
              }
            >
              <Image
                style={styles.image}
                source={require("./images/ttlogo.png")}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "#dbb42b",
              width: "100%",
              flex: 1,
              alignItems: "center",
            }}
          ></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default SocialEyes;
