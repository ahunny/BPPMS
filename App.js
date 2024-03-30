import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dash_borad from './Src/StudentDashbord';
import Request_Details from './Src/Request';
import Login from './Src/Login';
import Creategroup from './Src/createGroup';
import ReqSupervisor from './Src/ReqSupervisor';
import UploadTasks from './Src/UploadTask';
import CommitteeDashborad from './Src/CommitteeDashboard';
import Groups from './Src/Groups';
import ProjectAllocation from './Src/ProjectAllocation';
import ScheduleMeeting from './Src/ScheduleMeeting';
import StudentMeeting from './Src/Meeting';
import CommitteeMeetings from './Src/CommitteeMeetings';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="StudentDashboard" component={Dash_borad} />
        <Stack.Screen name="Request" component={Request_Details} />
        <Stack.Screen name="Meeting" component={StudentMeeting} />
        <Stack.Screen name="creategroup" component={Creategroup} />
        <Stack.Screen name="reqsupervisor" component={ReqSupervisor} />
        <Stack.Screen name="uploadtask" component={UploadTasks} />
        <Stack.Screen
          name="CommitteeDashboard"
          component={CommitteeDashborad}
        />
        <Stack.Screen name="Groups" component={Groups} />
        <Stack.Screen name="ProjectAllocation" component={ProjectAllocation} />
        <Stack.Screen name="ScheduleMeeting" component={ScheduleMeeting} />
        <Stack.Screen name="CommiteMeetings" component={CommitteeMeetings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
