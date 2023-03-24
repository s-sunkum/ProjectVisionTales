import React from 'react';
import { Text, StyleSheet } from 'react-native';

const VideoTitleText = (props) => {
  return <Text style={styles.text}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: '#dbb42b',
    padding: 10,
    fontSize: 20,
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 35,
    marginRight: 35,
    fontWeight: '700',
  },
});

export default VideoTitleText;
