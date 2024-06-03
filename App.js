import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
import ReAllocationScreen from './Src/Committee&Supervisor/Re-Allocation';
import ProjectReAllocation from './Src/Committee&Supervisor/ProjectRe-Allocation';
import ReAllocateSupervisor from './Src/Committee&Supervisor/Re-AllocateSupervisor';
import ProjectDetails from './Src/Committee&Supervisor/Re-AllocateSupervisorScreen';
import DatacellDashboard from './Src/datacell/Dashboard';
import StudentDetails from './Src/datacell/StudentDetails';
import DropStudent from './Src/datacell/DropStudents';
import RestrictedStudent from './Src/Committee&Supervisor/RestrictedStudents';
import SupervisorDashboard from './Src/Committee&Supervisor/SupervisorDashboard';
import SupervisorGrading from './Src/Committee&Supervisor/SupervisorGrading';
import SupervisorMeetings from './Src/Committee&Supervisor/SupervisorMeetings';
import SupervisorScheduleMeeting from './Src/Committee&Supervisor/SupervisorScheduleMeetings';
import SupervisorFypGroups from './Src/Committee&Supervisor/Sup FYP-Groups';
import SupervisorAddtask from './Src/Committee&Supervisor/SupervisorAddTask';
import SupervisorProjectDetails from './Src/Committee&Supervisor/SupervisorProjectDetails';
import SupervisorViewUploadedTasks from './Src/Committee&Supervisor/SupervisorViewUploadTasks';
import FailGroups from './Src/Committee&Supervisor/FailGroups&Students';
import Addmembers from './Src/Committee&Supervisor/AddMembers(Failures)';
import SetGrades from './Src/Committee&Supervisor/Set Grades';
import Grades from './Src/Committee&Supervisor/Grades';
import StudentGrades from './Src/Committee&Supervisor/Grades';
import AddmembersInGroup from './Src/Committee&Supervisor/VacantTechGroups';
import VacantTechGroups from './Src/Committee&Supervisor/VacantTechGroups';
import VacantGroupDetails from './Src/Committee&Supervisor/VacantGroupDetails';
import VacantGroupDetail from './Src/Committee&Supervisor/VacantGroupDetails';
import {Button} from 'react-native';
import SetScoreWeight from './Src/Committee&Supervisor/SetScoreWeightage';

const Stack = createNativeStackNavigator();

const App = () => {
  const handleLogout = () => {
    // Perform any necessary logout operations here, like clearing user data
    navigation.navigate('Login'); // Navigate to the Login screen
  };
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
        <Stack.Screen
          name="creategroup"
          component={Creategroup}
          options={{title: 'Create Group'}}
        />
        <Stack.Screen
          name="reqsupervisor"
          component={ReqSupervisor}
          options={{title: 'Request Supervisor'}}
        />
        <Stack.Screen
          name="uploadtask"
          component={UploadTasks}
          options={{title: 'Upload Task'}}
        />
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
            headerRight: () => (
              <Button onPress={handleLogout} title="Logout" color="red" />
            ),
          }}
        />
        <Stack.Screen name="Groups" component={Groups} />
        <Stack.Screen
          name="ProjectAllocation"
          component={ProjectAllocation}
          options={{title: 'Project Allocation'}}
        />
        <Stack.Screen
          name="ScheduleMeeting"
          component={ScheduleMeeting}
          options={{title: 'Schedule Meeting'}}
        />
        <Stack.Screen
          name="CommiteMeetings"
          component={CommitteeMeetings}
          options={{title: 'Scheduled Meetings'}}
        />
        <Stack.Screen
          name="FypGroups"
          component={FypGroups}
          options={{title: 'FYP GROUPS'}}
        />
        <Stack.Screen
          name="RestrictedStudents"
          component={RestrictedStudent}
          options={{title: 'Restricted Students'}}
        />
        <Stack.Screen
          name="CommitteeProjectDetails"
          component={CommitteeProjectDetails}
          options={{title: 'Details'}}
        />
        <Stack.Screen
          name="Addtask"
          component={Addtask}
          options={{title: 'Add Task'}}
        />
        <Stack.Screen
          name="ReAllocation"
          component={ReAllocationScreen}
          options={{title: 'Re-Allocation'}}
        />
        <Stack.Screen
          name="ProjectReAllocation"
          component={ProjectReAllocation}
          options={{title: 'Project Re-Allocation'}}
        />
        <Stack.Screen
          name="SupervisorReAllocation"
          component={ReAllocateSupervisor}
          options={{title: 'Supervisor Re-Allocation'}}
        />
        <Stack.Screen
          name="SupervisorReAllocationScreen"
          component={ProjectDetails}
          options={{title: 'Supervisor Re-Allocation'}}
        />
        <Stack.Screen
          name="FailGroupsScreen"
          component={FailGroups}
          options={{title: 'Groups'}}
        />
        <Stack.Screen
          name="Addmember"
          component={Addmembers}
          options={{title: 'Add More Members'}}
        />
        <Stack.Screen
          name="vacantgroups"
          component={VacantTechGroups}
          options={{title: 'Search For Groups'}}
        />

        <Stack.Screen
          name="vacantgroupsdetails"
          component={VacantGroupDetail}
          options={{title: 'Group Member'}}
        />
        <Stack.Screen
          name="Uploaded Tasks"
          component={ViewUploadedTasks}
          options={{title: 'Tasks'}}
        />
        <Stack.Screen
          name="View Task"
          component={Viewtask}
          options={{title: 'View Task'}}
        />
        <Stack.Screen name="Add Remarks" component={AddRemarks} />
        <Stack.Screen name="Grading" component={Grading} />
        <Stack.Screen
          name="SetGrading"
          component={SetGrades}
          options={{title: 'Set Grades'}}
        />
        <Stack.Screen
          name="StudentGrades"
          component={StudentGrades}
          options={{title: 'Students Grades'}}
        />
        <Stack.Screen
          name="SetscoreWeight"
          component={SetScoreWeight}
          options={{title: 'Score Weight'}}
        />

        {/*Supervisor Screen Navigation Stack*/}
        <Stack.Screen
          name="SupervisorDashboard"
          component={SupervisorDashboard}
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
        <Stack.Screen name="Supervisor Grading" component={SupervisorGrading} />
        <Stack.Screen
          name="Supervisor Meetings"
          component={SupervisorMeetings}
          options={{title: 'Meetings'}}
        />
        <Stack.Screen
          name="Supervisor Schedule Meetings"
          component={SupervisorScheduleMeeting}
          options={{title: 'Schedule Meeting'}}
        />
        <Stack.Screen
          name="SupervisorProjectDetails"
          component={SupervisorProjectDetails}
          options={{title: 'Members'}}
        />
        <Stack.Screen name="Fyp Groups" component={SupervisorFypGroups} />
        <Stack.Screen
          name="Sup Add Task"
          component={SupervisorAddtask}
          options={{title: 'Add Task'}}
        />
        <Stack.Screen
          name="Sup view Uploaded Task"
          component={SupervisorViewUploadedTasks}
          options={{title: 'Add Task'}}
        />

        <Stack.Screen name="Datacell Dashboard" component={DatacellDashboard} />
        <Stack.Screen name="StudentDetail" component={StudentDetails} />
        <Stack.Screen name="DropStudents" component={DropStudent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
