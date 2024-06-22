import React, {useState} from 'react';

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
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import API_URL from '../../apiConfig';

const Stack = createNativeStackNavigator();
const Grading = props => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const {userid} = props.route.params;
  const {roles} = props.route.params;
  const role = roles;
  console.log(userid, role);

  const CalculateGrades = async () => {
    try {
      const response = await fetch(`${API_URL}/Grading/CalculateGrading`);
      const data = await response.json();
      ToastAndroid.show('Graded Successfully', ToastAndroid.SHORT);
      console.log(data);
    } catch (error) {
      ToastAndroid.show('Error Occured While Grading', ToastAndroid.SHORT);
      console.error('Error Occured While Grading:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#74A2A8',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <View
        style={{
          backgroundColor: '#C0C0C0',
          width: '93%',
          height: '97%',
          alignSelf: 'center',
          alignItems: 'center',
          marginTop: 10,
          borderRadius: 20,
        }}>
        <TouchableOpacity
          style={{
            elevation: 5,
            backgroundColor: 'lightgrey',
            borderRadius: 20,
            width: '90%',
            height: '15%',
            marginTop: 20,
          }}
          onPress={() =>
            props.navigation.navigate('SetGrading', {userid, role})
          }>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
            }}>
            <View
              style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
              <Image
                source={require('./Assets/icons8-grades-48.png')} // Provide the local image path
                style={{width: 50, height: 50, marginTop: 10}} // Set the width and height of the image
              />
              <Text style={{color: 'black', fontSize: 16}}>
                {' '}
                {'Set Grades'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            elevation: 5,
            backgroundColor: 'lightgrey',
            borderRadius: 20,
            width: '90%',
            height: '15%',
            marginTop: 20,
          }}
          onPress={() => props.navigation.navigate('StudentGrades')}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
            }}>
            <View
              style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
              <Image
                source={require('./Assets/icons8-report-card-50.png')} // Provide the local image path
                style={{width: 50, height: 50, marginTop: 10}} // Set the width and height of the image
              />
              <Text style={{color: 'black', fontSize: 16}}>
                {' '}
                {'View Grades'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            elevation: 5,
            backgroundColor: 'lightgrey',
            borderRadius: 20,
            width: '90%',
            height: '15%',
            marginTop: 20,
          }}
          onPress={() => props.navigation.navigate('graph')}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
            }}>
            <View
              style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
              <Image
                source={require('./Assets/icons8-graph-50.png')} // Provide the local image path
                style={{width: 50, height: 50, marginTop: 10}} // Set the width and height of the image
              />
              <Text style={{color: 'black', fontSize: 16}}>
                {' '}
                {'View Progress'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* {role === 'Director' && (
          <TouchableOpacity
            style={{
              elevation: 5,
              backgroundColor: 'lightgrey',
              borderRadius: 20,
              width: '90%',
              height: '15%',
              marginTop: 20,
            }}
            onPress={() => props.navigation.navigate('SetscoreWeight')}>
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Image
                  source={require('./Assets/icons8-edit-50.png')} // Provide the local image path
                  style={{
                    width: 50,
                    height: 50,
                    marginTop: 10,
                    marginLeft: 10,
                  }} // Set the width and height of the image
                />
                <Text style={{color: 'black', fontSize: 16}}>
                  {' '}
                  {'Set Score Weightage'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )} */}
        {role === 'Director' && (
          <TouchableOpacity
            style={{
              elevation: 5,
              backgroundColor: 'lightgrey',
              borderRadius: 20,
              width: '90%',
              height: '15%',
              marginTop: 20,
            }}
            onPress={CalculateGrades}>
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Image
                  source={require('./Assets/icons8-grade-80.png')} // Provide the local image path
                  style={{width: 50, height: 50, marginTop: 10}} // Set the width and height of the image
                />
                <Text style={{color: 'black', fontSize: 16}}>
                  {' '}
                  {'Calculate grades'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Grading;
