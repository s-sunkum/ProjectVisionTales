import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Linking,
} from "react-native";
import NavButton from "./components/NavButton";
import MainText from "./components/MainText";

const Resources = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#dbb42b" }}>
        <MainText text="Find Additional Resources Below!" />
        <NavButton title="General Info" customClick={() => Linking.openURL("https://www.cherisheyesight.org/resources")} />
        <NavButton title="About Optometry" customClick={() => Linking.openURL("https://www.cherisheyesight.org/about-optometry-1")} />
        <NavButton title="Become an Optometrist" customClick={() => Linking.openURL("https://www.cherisheyesight.org/become-an-optometrist")} />
        <NavButton title="Eye Health Resources" customClick={() => Linking.openURL("https://www.cherisheyesight.org/eye-health-resources")} />
        <NavButton title="Contact Eye Providers" customClick={() => Linking.openURL("https://www.cherisheyesight.org/contact-local-optometrist")}/>
      </View>
    </SafeAreaView>
  );
};

export default Resources;