import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SmallNavButton = (props) => {
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
    backgroundColor: '#91781c',
    color: '#ffffff',
    padding: '4%',
    borderRadius: '15%',
    marginTop: '4%',
    marginLeft: "13%",
    marginRight: "13%",
  },
  text: {
    color: '#ecebeb',
    fontSize: 19,
    fontWeight: '500'
  },
  
});

export default SmallNavButton;
