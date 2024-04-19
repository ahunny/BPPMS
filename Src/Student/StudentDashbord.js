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
import Request_Details from './Request';
import Tasklist from './Task';
const Tab = createBottomTabNavigator();
const multiplescreen = createNativeStackNavigator();
import Creategroup from './createGroup';
import StudentMeeting from './Meeting';
const Stack = createNativeStackNavigator();
const Dashboardscreens = props => {
  // return(
  //     <multiplescreen.Navigator>
  //         <multiplescreen.Screen name="profile" component={Project_details}   options={{ headerShown: false }}/>
  //         <multiplescreen.Screen name="Grades" component={Grades}   options={{ headerShown: false }}/>
  //     </multiplescreen.Navigator>
  // )
  return (
    <View style={{flex: 1, backgroundColor: '#74A2A8'}}>
      <TouchableOpacity
        style={{
          elevation: 5,
          backgroundColor: 'lightgrey',
          borderRadius: 10,
          width: 370,
          height: 120,
          marginTop: 50,
          marginLeft: 20,
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
              style={{width: 40, height: 40, marginTop: 10}} // Set the width and height of the image
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
          width: 370,
          height: 120,
          marginTop: 30,
          marginLeft: 20,
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
              style={{width: 40, height: 40, marginTop: 10}} // Set the width and height of the image
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
          width: 370,
          height: 120,
          marginTop: 30,
          marginLeft: 20,
        }}
        onPress={() => props.navigation.navigate('creategroup')}>
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
              style={{width: 40, height: 40, marginTop: 10}}
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
          width: 370,
          height: 120,
          marginTop: 30,
          marginLeft: 20,
        }}
        onPress={() => props.navigation.navigate('reqsupervisor')}>
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
              style={{width: 40, height: 40, marginTop: 10}} // Set the width and height of the image
            />
            <Text style={{marginLeft: -10, color: 'black', fontSize: 20}}>
              {'Request Supervisor'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const StudentDashboard = () => {
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
