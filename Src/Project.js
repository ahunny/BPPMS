import React from 'react';
import { View, TouchableOpacity, Text, TextInput, Image } from 'react-native';

const Project_details = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#C0C0C0', }}>
      <View>
        <TextInput
          placeholder="Currently no meeting"
          style={{
            backgroundColor: '#EEEEEE',
            marginTop: 20,
            width: '60%',
            height: 100,
            marginLeft: 70,
            borderRadius: 20,
            fontSize: 20,
            textAlign: 'center',
          }}
        />
        <TextInput
          placeholder="Currently no Task"
          style={{
            backgroundColor: '#EEEEEE',
            marginTop: 20,
            width: '60%',
            height: 100,
            marginLeft: 70,
            borderRadius: 20,
            fontSize: 20,
            textAlign: 'center',
          }}
        />
      </View>
      <View style={{ borderTopEndRadius:15,borderTopLeftRadius:15, marginTop:20,flex:1,flexDirection: 'row', justifyContent: 'center', backgroundColor: '#74A2A8' }}>
        <TouchableOpacity onPress={()=>props.navigation.navigate('Grades')}style={styles.button}>
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 50,
            }}
            source={require('./Assets/icons8-more-details-32.png')}
          />
          <Text style={styles.buttonText}>Project Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
        <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 50,
            }}
            source={require('./Assets/icons8-grades-48.png')}
          />
          <Text style={styles.buttonText}>Grades Detail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  button: {
    backgroundColor: '#D9D9D9',
    width: 130,
    height: 120,
    borderRadius: 15,
    marginTop: 100,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center', // Center the image and text vertically
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2, // Adjust vertical alignment of text
    textAlign: 'center',
  },
};

export default Project_details;
