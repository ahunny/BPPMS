import React from 'react';
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
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

var userid;

const DatacellDashboard = props => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Perform any necessary logout operations here, like clearing user data
    navigation.navigate('login'); // Navigate to the Login screen
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#74A2A8'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <View />
        <TouchableOpacity onPress={handleLogout} style={{marginRight: 10}}>
          <Icon name="logout" size={25} color="#71B2A8" />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
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
        <TouchableOpacity
          style={{
            elevation: 5,
            backgroundColor: 'lightgrey',
            borderRadius: 10,
            width: '95%',
            height: '15%',
            marginTop: 30,
          }}
          onPress={() => props.navigation.navigate('enroledStudents')}>
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
                {'Enrolled Students'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DatacellDashboard;
