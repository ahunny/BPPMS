import React, {useCallback, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ToastAndroid,
} from 'react-native';

var userid;

const DatacellDashboard = props => {
  return (
    <View style={{flex: 1, backgroundColor: '#74A2A8', alignItems: 'center'}}>
      <TouchableOpacity
        style={{
          elevation: 5,
          backgroundColor: 'lightgrey',
          borderRadius: 10,
          width: '95%',
          height: '15%',
          marginTop: 50,
        }}
        onPress={() => props.navigation.navigate('StudentDetail')}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            padding: 10,
          }}>
          <View
            style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
            <Image
              source={require('./Assets/icons8-more-details-50.png')} // Provide the local image path
              style={{width: 40, height: 40, marginTop: 5}} // Set the width and height of the image
            />
            <Text style={{marginLeft: -10, color: 'black', fontSize: 20}}>
              {'Students Details'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          elevation: 5,
          backgroundColor: 'lightgrey',
          borderRadius: 10,
          width: '95%',
          height: '15%',
          marginTop: 30,
        }}
        onPress={() => props.navigation.navigate('DropStudents')}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            padding: 10,
          }}>
          <View
            style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
            <Image
              source={require('./Assets/icons8-person-64.png')} // Provide the local image path
              style={{width: 40, height: 40, marginTop: 5}} // Set the width and height of the image
            />
            <Text style={{marginLeft: -10, color: 'black', fontSize: 20}}>
              {' '}
              {'Drop Students'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DatacellDashboard;
