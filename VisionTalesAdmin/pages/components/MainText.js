import React from 'react';
import { Text, StyleSheet } from 'react-native';

const MainText = (props) => {
  return <Text style={styles.text}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: '#111825',
    fontSize: 20,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
});

export default MainText;
