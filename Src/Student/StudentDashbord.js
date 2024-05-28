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
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Request_Details from './Request';
import Tasklist from './Task';
const Tab = createBottomTabNavigator();
const multiplescreen = createNativeStackNavigator();
import Creategroup from './createGroup';
import StudentMeeting from './Meeting';
import API_URL from '../../apiConfig';
const Stack = createNativeStackNavigator();
var userid;

const Dashboardscreens = props => {
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
        }}>
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
              {'Project Details'}
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
        onPress={() => props.navigation.navigate('Grades')}>
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
              source={require('./Assets/icons8-grades-48.png')} // Provide the local image path
              style={{width: 40, height: 40, marginTop: 5}} // Set the width and height of the image
            />
            <Text style={{marginLeft: -10, color: 'black', fontSize: 20}}>
              {' '}
              {'Grades'}
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
        onPress={() => props.navigation.navigate('creategroup', {userid})}>
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
              source={require('./Assets/icons8-add-male-user-group-50.png')} // Provide the local image path
              style={{width: 40, height: 40, marginTop: 5}}
              // Set the width and height of the image
            />
            <Text style={{marginLeft: -10, color: 'black', fontSize: 20}}>
              {'Create Group'}
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
        onPress={() => props.navigation.navigate('reqsupervisor', {userid})}>
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
              source={require('./Assets/icons8-add-administrator-50.png')} // Provide the local image path
              style={{width: 40, height: 40, marginTop: 5}} // Set the width and height of the image
            />
            <Text style={{marginLeft: -10, color: 'black', fontSize: 20}}>
              {'Prefer Supervisor'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const StudentDashboard = props => {
  const {data} = props.route.params;
  console.log(data.user_id);
  userid = data.user_id;
  roles = data.role;
  groupid = data.group_id;
  console.log(userid, roles, groupid);

  return (
    <Tab.Navigator
      screenOptions={{
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
          title: 'Dashboard',
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
        name="Request"
        component={Request_Details}
        initialParams={{userid: userid}} // Pass userid as initial parameter
        options={{
          title: 'Request',
          tabBarIcon: () => (
            <Image
              source={require('./Assets/icons8-add-male-user-64.png')}
              style={{width: 35, height: 35}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Meeting"
        component={StudentMeeting}
        initialParams={{userid: userid, roles: roles, groupid: groupid}} // Pass userid as initial parameter
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
      <Tab.Screen
        name="Task"
        component={Tasklist}
        initialParams={{userid: userid, roles: roles, groupid: groupid}} // Pass userid as initial parameter
        options={{
          title: 'Tasks',
          tabBarIcon: () => (
            <Image
              source={require('./Assets/icons8-tasks-30.png')}
              style={{width: 35, height: 35}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default StudentDashboard;
