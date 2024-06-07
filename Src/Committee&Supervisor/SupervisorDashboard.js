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
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SupervisorScheduleMeeting from './SupervisorScheduleMeetings';
import SupervisorMeetings from './SupervisorMeetings';
import Icon from 'react-native-vector-icons/MaterialIcons';
import chat from '../Chat';
import SupervisorGroups from './GroupChats';

const Tab = createBottomTabNavigator();
const multiplescreen = createNativeStackNavigator();
var userid;
var roles;

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
            props.navigation.navigate('Fyp Groups', {
              fyptype: 'fyp-0',
              userid: userid,
            })
          }>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
            }}>
            <View
              style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
              <Image
                source={require('./Assets/icons8-group-30.png')} // Provide the local image path
                style={{width: 50, height: 50, marginTop: 10}} // Set the width and height of the image
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
            borderRadius: 20,
            width: '90%',
            height: '15%',
            marginTop: 15,
          }}
          onPress={() =>
            props.navigation.navigate('Fyp Groups', {
              fyptype: 'fyp-1',
              userid: userid,
            })
          }>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
            }}>
            <View
              style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
              <Image
                source={require('./Assets/icons8-group-30.png')} // Provide the local image path
                style={{width: 50, height: 50, marginTop: 10}} // Set the width and height of the image
              />
              <Text style={{color: 'black', fontSize: 16}}>
                {' '}
                {'FYP-I GROUPS'}
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
            marginTop: 15,
          }}
          onPress={() =>
            props.navigation.navigate('Fyp Groups', {
              fyptype: 'fyp-2',
              userid: userid,
            })
          }>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
            }}>
            <View
              style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
              <Image
                source={require('./Assets/icons8-group-30.png')} // Provide the local image path
                style={{width: 50, height: 50, marginTop: 10}} // Set the width and height of the image
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
            borderRadius: 20,
            width: '90%',
            height: '15%',
            marginTop: 15,
          }}
          onPress={() =>
            props.navigation.navigate('Supervisor Grading', {userid, roles})
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
              <Text style={{color: 'black', fontSize: 16}}> {'Grading'}</Text>
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
            marginTop: 15,
          }}
          // onPress={() => props.navigation.navigate('Fyp Groups')}
        >
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
            }}>
            <View
              style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
              <Image
                source={require('./Assets/icons8-block-user-48.png')} // Provide the local image path
                style={{width: 50, height: 50, marginTop: 10}} // Set the width and height of the image
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

const SupervisorDashboard = props => {
  const {data} = props.route.params;
  console.log(data.user_id);
  userid = data.user_id;
  roles = data.role;

  const navigation = useNavigation();

  const handleLogout = () => {
    // Perform any necessary logout operations here, like clearing user data
    navigation.navigate('login'); // Navigate to the Login screen
  };
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
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={{marginRight: 10}}>
            <Icon name="logout" size={25} color="#74A2A8" />
          </TouchableOpacity>
        ),
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
        name="Supervisorgroup"
        component={SupervisorGroups}
        initialParams={{userid: userid}}
        options={{
          title: 'Chat',
          headerShown: true,
          tabBarIcon: () => (
            <Image
              source={require('./Assets/icons8-chat-50.png')}
              style={{width: 25, height: 25}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Schedule Meeting"
        component={SupervisorScheduleMeeting}
        initialParams={{userid: userid}}
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
        name="Supervisor Meetings"
        component={SupervisorMeetings}
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
export default SupervisorDashboard;
