import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dash_borad from './Src/Student/StudentDashbord';
import Login from './Src/Login';
import Creategroup from './Src/Student/createGroup';
import ReqSupervisor from './Src/Student/ReqSupervisor';
import UploadTasks from './Src/Student/UploadTask';
import CommitteeDashborad from './Src/Committee&Supervisor/CommitteeDashboard';
import Groups from './Src/Committee&Supervisor/Groups';
import ProjectAllocation from './Src/Committee&Supervisor/ProjectAllocation';
import ScheduleMeeting from './Src/Committee&Supervisor/ScheduleMeeting';
import CommitteeMeetings from './Src/Committee&Supervisor/CommitteeMeetings';
import FypGroups from './Src/Committee&Supervisor/FYP-Groups';
import CommitteeProjectDetails from './Src/Committee&Supervisor/CommitteeProjectDetails';
import Addtask from './Src/Committee&Supervisor/CommitteeAddTask';
import Request_Details from './Src/Student/Request';
import StudentMeeting from './Src/Student/Meeting';
import ViewUploadedTasks from './Src/Committee&Supervisor/ViewUploadedTask';
import Viewtask from './Src/Committee&Supervisor/ViewTask';
import AddRemarks from './Src/Committee&Supervisor/AddRemarks';
import Grading from './Src/Committee&Supervisor/Grading1';
import StudentDashboard from './Src/Student/StudentDashbord';
import StudentGrading from './Src/Student/Grading';
import SupervisorDashboard from './Src/Supervisor/SupervisorDashboard';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#D9D9D9',
          },
        }}>
        <Stack.Screen
          name="login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StudentDashboard"
          component={StudentDashboard}
          options={{
            headerShown: false,
            headerBackVisible: false, // Hide the back button
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerStyle: {backgroundColor: '#74A2A8'}, // Custom header style for StudentDashboard
          }}
        />
        <Stack.Screen
          name="Request"
          component={Request_Details}
          options={{title: 'Requests'}}
        />
        <Stack.Screen
          name="Meeting"
          component={StudentMeeting}
          options={{title: 'Meetings'}}
        />
        <Stack.Screen name="creategroup" component={Creategroup} />
        <Stack.Screen name="reqsupervisor" component={ReqSupervisor} />
        <Stack.Screen name="uploadtask" component={UploadTasks} />
        <Stack.Screen name="Grades" component={StudentGrading} />

        {/*Committee Screen Navigation Stack*/}
        <Stack.Screen
          name="CommitteeDashboard"
          component={CommitteeDashborad}
          options={{
            headerShown: false,
            headerBackVisible: false, // Hide the back button
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerStyle: {backgroundColor: '#74A2A8'}, // Custom header style for StudentDashboard
          }}
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

        {/*Supervisor Screen Navigation Stack*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
