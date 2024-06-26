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
  Button,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();
const multiplescreen = createNativeStackNavigator();

import Groups from './Groups';
import ScheduleMeeting from './ScheduleMeeting';
import CommitteeMeetings from './CommitteeMeetings';

const Stack = createNativeStackNavigator();

var userid;
var roles;

const Dashboardscreens = props => {
  return (
    <ScrollView
      style={{
        // flex: 1,
        backgroundColor: '#74A2A8',
        // alignItems: 'center',
        flexDirection: 'column',
      }}>
      <View
        style={{
          backgroundColor: '#C0C0C0',
          width: '93%',
          height: '100%',
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
            height: '12%',
            marginTop: 15,
          }}
          onPress={() =>
            props.navigation.navigate('FypGroups', {
              fyptype: 'fyp-1',
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
                style={{width: 50, height: 40}} // Set the width and height of the image
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
            height: '12%',
            marginTop: 15,
          }}
          onPress={() =>
            props.navigation.navigate('FypGroups', {
              fyptype: 'fyp-2',
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
                style={{width: 50, height: 40}} // Set the width and height of the image
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
            height: '12%',
            marginTop: 15,
          }}
          onPress={() => props.navigation.navigate('ReAllocation')}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
            }}>
            <View
              style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
              <Image
                source={require('./Assets/icons8-refresh-50.png')} // Provide the local image path
                style={{width: 40, height: 40}} // Set the width and height of the image
              />
              <Text style={{color: 'black', fontSize: 16}}>
                {' '}
                {'Re-Allocation'}
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
            height: '12%',
            marginTop: 15,
          }}
          onPress={() => props.navigation.navigate('Grading', {userid, roles})}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
            }}>
            <View
              style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
              <Image
                source={require('./Assets/icons8-grades-48.png')} // Provide the local image path
                style={{width: 40, height: 40}} // Set the width and height of the image
              />
              <Text style={{color: 'black', fontSize: 16}}>
                {' '}
                {'Grading & Progress'}
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
            height: '12%',
            marginTop: 10,
          }}
          onPress={() => props.navigation.navigate('enrolStudents')}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
            }}>
            <View
              style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
              <Image
                source={require('./Assets/icons8-group-30.png')} // Provide the local image path
                style={{width: 50, height: 40}} // Set the width and height of the image
              />
              <Text style={{color: 'black', fontSize: 16}}>
                {' '}
                {'Enrolled Students'}
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
            height: '12%',
            marginTop: 15,
          }}
          onPress={() => props.navigation.navigate('RestrictedStudents')}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
            }}>
            <View
              style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
              <Image
                source={require('./Assets/icons8-block-user-48.png')} // Provide the local image path
                style={{width: 40, height: 40}} // Set the width and height of the image
              />
              <Text style={{color: 'black', fontSize: 16}}>
                {' '}
                {'Restricted Students'}
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
            height: '12%',
            marginTop: 15,
          }}
          onPress={() => props.navigation.navigate('Addproject')}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
            }}>
            <View
              style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
              <Image
                source={require('./Assets/icons8-add-50.png')} // Provide the local image path
                style={{width: 40, height: 40}} // Set the width and height of the image
              />
              <Text style={{color: 'black', fontSize: 16}}>
                {' '}
                {'Add Project'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const CommitteeDashborad = props => {
  const {data} = props.route.params;
  console.log(data.user_id);
  userid = data.user_id;
  roles = data.role;
  const groupid = data.group_id;
  console.log(userid, roles, groupid);

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
          tabBarIcon: () => (
            <Image
              source={require('./Assets/icons8-home-50.png')}
              style={{width: 30, height: 30, marginTop: 5}}
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
              style={{width: 40, height: 35, marginBottom: 10}}
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
              style={{width: 40, height: 28}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Meeting"
        component={CommitteeMeetings}
        initialParams={{userid: userid}} // Pass userid as initial parameter
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
