import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dash_borad from './Src/Student/StudentDashbord';
import Login from './Src/Login';
import Creategroup from './Src/Student/createGroup';
import ReqSupervisor from './Src/Student/ReqSupervisor';
import UploadTasks from './Src/Student/UploadTask';
import CommitteeDashborad from './Src/Committee/CommitteeDashboard';
import Groups from './Src/Committee/Groups';
import ProjectAllocation from './Src/Committee/ProjectAllocation';
import ScheduleMeeting from './Src/Committee/ScheduleMeeting';
import CommitteeMeetings from './Src/Committee/CommitteeMeetings';
import FypGroups from './Src/Committee/FYP-Groups';
import CommitteeProjectDetails from './Src/Committee/CommitteeProjectDetails';
import Addtask from './Src/Committee/CommitteeAddTask';
import Request_Details from './Src/Student/Request';
import StudentMeeting from './Src/Student/Meeting';
import ViewUploadedTasks from './Src/Committee/ViewUploadedTask';
import Viewtask from './Src/Committee/ViewTask';
import AddRemarks from './Src/Committee/AddRemarks';
import Grading from './Src/Committee/Grading1';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{
          headerStyle: {backgroundColor: '#74A2A8'},
        }}>
        <Stack.Screen
          name="login"
          component={Login}
          options={{headerShown: false}}
        />
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
        <Stack.Screen name="FypGroups" component={FypGroups} />
        <Stack.Screen
          name="CommitteeProjectDetails"
          component={CommitteeProjectDetails}
        />
        <Stack.Screen name="Addtask" component={Addtask} />
        <Stack.Screen name="Uploaded Tasks" component={ViewUploadedTasks} />
        <Stack.Screen name="View Task" component={Viewtask} />
        <Stack.Screen name="Add Remarks" component={AddRemarks} />
        <Stack.Screen name="Grading" component={Grading} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
