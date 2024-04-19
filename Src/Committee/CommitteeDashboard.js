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
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const multiplescreen = createNativeStackNavigator();

import Groups from './Groups';
import ScheduleMeeting from './ScheduleMeeting';

import CommitteeMeetings from './CommitteeMeetings';
const Stack = createNativeStackNavigator();
const Dashboardscreens = props => {
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
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            elevation: 5,
            backgroundColor: 'lightgrey',
            borderRadius: 40,
            width: '45%',
            height: '90%',
            marginTop: 55,
          }}
          onPress={() => props.navigation.navigate('FypGroups')}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
            }}>
            <View
              style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
              <Image
                source={require('./Assets/icons8-group-30.png')} // Provide the local image path
                style={{width: 50, height: 50, marginTop: 30}} // Set the width and height of the image
              />
              <Text style={{color: 'black', fontSize: 16}}>
                {' '}
                {'FYP-0 GROUPS'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            elevation: 5,
            backgroundColor: 'lightgrey',
            borderRadius: 40,
            width: '45%',
            height: '90%',
            marginTop: 55,
            marginLeft: 10,
          }}
          onPress={() => props.navigation.navigate('FypGroups')}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
            }}>
            <View
              style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
              <Image
                source={require('./Assets/icons8-group-30.png')} // Provide the local image path
                style={{width: 50, height: 50, marginTop: 30}} // Set the width and height of the image
              />
              <Text style={{color: 'black', fontSize: 16}}>
                {' '}
                {'FYP-I GROUPS'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            elevation: 5,
            backgroundColor: 'lightgrey',
            borderRadius: 40,
            width: '45%',
            height: '90%',
            marginTop: 55,
          }}
          onPress={() => props.navigation.navigate('FypGroups')}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
            }}>
            <View
              style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
              <Image
                source={require('./Assets/icons8-group-30.png')} // Provide the local image path
                style={{width: 50, height: 50, marginTop: 30}} // Set the width and height of the image
              />
              <Text style={{color: 'black', fontSize: 16}}>
                {' '}
                {'FYP-II GROUPS'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            elevation: 5,
            backgroundColor: 'lightgrey',
            borderRadius: 40,
            width: '45%',
            height: '90%',
            marginTop: 55,
            marginLeft: 10,
          }}
          onPress={() => props.navigation.navigate('')}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
            }}>
            <View
              style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
              <Image
                source={require('./Assets/icons8-refresh-50.png')} // Provide the local image path
                style={{width: 50, height: 50, marginTop: 30}} // Set the width and height of the image
              />
              <Text style={{color: 'black', fontSize: 16}}>
                {'Re-Allocation'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            elevation: 5,
            backgroundColor: 'lightgrey',
            borderRadius: 40,
            width: '45%',
            height: '90%',
            marginTop: 55,
          }}
          onPress={() => props.navigation.navigate('Grading')}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
            }}>
            <View
              style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
              <Image
                source={require('./Assets/icons8-grades-48.png')} // Provide the local image path
                style={{width: 50, height: 50, marginTop: 30}} // Set the width and height of the image
              />
              <Text style={{color: 'black', fontSize: 16}}> {'Grading'}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            elevation: 5,
            backgroundColor: 'lightgrey',
            borderRadius: 40,
            width: '45%',
            height: '90%',
            marginTop: 55,
            marginLeft: 10,
          }}
          onPress={() => props.navigation.navigate('FypGroups')}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
            }}>
            <View
              style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
              <Image
                source={require('./Assets/icons8-block-user-48.png')} // Provide the local image path
                style={{width: 50, height: 50, marginTop: 30}} // Set the width and height of the image
              />
              <Text style={{color: 'black', fontSize: 16}}>
                {'Restricted Students'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CommitteeDashborad = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: '#C0C0C0',
        },
        headerStyle: {
          backgroundColor: '#D9D9D9',
        },
      }}>
      <Tab.Screen
        name="dashboard"
        component={Dashboardscreens}
        options={{
          title: 'Committee Dashboard',
          headerShown: true,
          tabBarIcon: () => (
            <Image
              source={require('./Assets/icons8-home-50.png')}
              style={{width: 25, height: 25}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Groups"
        component={Groups}
        options={{
          title: 'Project Allocation',
          tabBarIcon: () => (
            <Image
              source={require('./Assets/icons8-person-64.png')}
              style={{width: 35, height: 35}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ScheduleMeeting"
        component={ScheduleMeeting}
        options={{
          title: 'Schedule Meeting',
          tabBarIcon: () => (
            <Image
              source={require('./Assets/icons8-schedule-64.png')}
              style={{width: 28, height: 28}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Meeting"
        component={CommitteeMeetings}
        options={{
          title: 'Meetings',
          tabBarIcon: () => (
            <Image
              source={require('./Assets/icons8-meeting-room-50.png')}
              style={{width: 35, height: 35}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default CommitteeDashborad;
