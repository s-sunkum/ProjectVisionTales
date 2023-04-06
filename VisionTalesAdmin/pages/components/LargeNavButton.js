import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const NavButton = (props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={props.customClick}>
      <Text style={styles.text}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#0e363c',
    color: '#ffffff',
    padding: 25,
    borderRadius: '15%',
    marginTop: '8%',
    marginLeft: "10%",
    marginRight: "10%",
  },
  text: {
    color: '#dbb42b',
    fontSize: 24,
    fontWeight: '700'
  },
});

export default NavButton;
