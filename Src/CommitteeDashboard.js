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
import Project_details from './Project';
import Grades from './ProjectDetails';
import Request_Details from './Request';
import Meeting_Schedule from './Meeting';
import Tasklist from './Task';
const Tab = createBottomTabNavigator();
const multiplescreen = createNativeStackNavigator();
import Creategroup from './createGroup';
import ProjectAllocation from './ProjectAllocation';
import Groups from './Groups';
import ScheduleMeeting from './ScheduleMeeting';
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
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <TouchableOpacity
          style={{
            elevation: 5,
            backgroundColor: 'lightgrey',
            borderRadius: 10,
            width: 180,
            height: 150,
            marginTop: 50,
          }}
          onPress={() => props.navigation.navigate('Groups')}>
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
                style={{width: 50, height: 50, marginTop: 20}} // Set the width and height of the image
              />
              <Text style={{color: 'black', fontSize: 16}}>
                {'Project Allocation'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            elevation: 5,
            backgroundColor: 'lightgrey',
            borderRadius: 10,
            width: 180,
            height: 150,
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
                source={require('./Assets/icons8-schedule-64.png')} // Provide the local image path
                style={{width: 50, height: 50, marginTop: 20}} // Set the width and height of the image
              />
              <Text style={{color: 'black', fontSize: 16}}>
                {' '}
                {'Schedule Meetings'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <TouchableOpacity
          style={{
            elevation: 5,
            backgroundColor: 'lightgrey',
            borderRadius: 10,
            width: 180,
            height: 150,
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
                source={require('./Assets/icons8-bulleted-list-50.png')} // Provide the local image path
                style={{width: 50, height: 50, marginTop: 20}} // Set the width and height of the image
              />
              <Text style={{color: 'black', fontSize: 16}}>
                {'FYP-0 Groups'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            elevation: 5,
            backgroundColor: 'lightgrey',
            borderRadius: 10,
            width: 180,
            height: 150,
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
                source={require('./Assets/icons8-bulleted-list-50.png')} // Provide the local image path
                style={{width: 50, height: 50, marginTop: 20}} // Set the width and height of the image
              />
              <Text style={{color: 'black', fontSize: 16}}>
                {' '}
                {'FYP-I Groups'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <TouchableOpacity
          style={{
            elevation: 5,
            backgroundColor: 'lightgrey',
            borderRadius: 10,
            width: 180,
            height: 150,
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
                source={require('./Assets/icons8-bulleted-list-50.png')} // Provide the local image path
                style={{width: 50, height: 50, marginTop: 20}} // Set the width and height of the image
              />
              <Text style={{color: 'black', fontSize: 16}}>
                {'FYP-II Groups'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            elevation: 5,
            backgroundColor: 'lightgrey',
            borderRadius: 10,
            width: 180,
            height: 150,
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
                source={require('./Assets/icons8-grade-48.png')} // Provide the local image path
                style={{width: 50, height: 50, marginTop: 20}} // Set the width and height of the image
              />
              <Text style={{color: 'black', fontSize: 16}}> {'Gradings'}</Text>
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
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#C0C0C0',
        },
      }}>
      <Tab.Screen
        name="dashboard"
        component={Dashboardscreens}
        options={{
          title: 'Dashboard,',
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
export default CommitteeDashborad;
