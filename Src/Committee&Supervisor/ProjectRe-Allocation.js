import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Text,
  Button,
  Image,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
} from 'react-native';
import API_URL from '../../apiConfig';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {SelectList} from 'react-native-dropdown-select-list';
import {Alert} from 'react-native';
import {shadow} from 'react-native-paper';

const ProjectReAllocation = props => {
  const [updatedGroup, setUpdatedGroup] = useState(
    props.route.params.updatedGroup,
  );
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [StudentList, setStudentList] = useState([]);
  const [ProjectList, setProjectList] = useState([]);
  const [Supervisorlist, setsupervisorlist] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [Sessionlist, setsessionlist] = useState([]);

  //const {userid} = props.route.params;
  //console.log('ok id', userid);
  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/AssignProject/GetAllProjects?`);
      const data = await response.json();
      const formattedData = data.map(item => ({
        key: item.project_id.toString(),
        value: item.project_title,
      }));
      setProjectList(formattedData);
    } catch (error) {
      ToastAndroid.show('Error fetching Students', ToastAndroid.SHORT);
      console.error('Error fetching Students:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchSupervisors = async () => {
    try {
      const response = await fetch(`${API_URL}/Student/GetAllSupervisors`);
      const data = await response.json();
      const formattedData = data.map(item => ({
        key: item.supervisor_id.toString(), // Extract supervisor ID as string
        value: item.name + ' (' + item.groupCount + ')',
      }));

      setsupervisorlist(formattedData);
      console.log(Supervisorlist);
    } catch (error) {
      ToastAndroid.show('Error fetching Supervisors', ToastAndroid.SHORT);
      console.error('Error fetching Supervisors:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    // useCallback prevent unnecessary re-renders caused by creating a new
    // function instance on every render.
    useCallback(() => {
      fetchProjects();
      fetchSupervisors();
    }, []),
  );
  const CreateFailedMembersGroup = async () => {
    // console.log(updatedGroup);
    const updatedGroupWithSession = {
      // Include selected session in the JSON object
      ...updatedGroup,
      sessionID: selectedSession, // Assuming SessionId is the key for the session in the JSON object
    };
    console.log(updatedGroupWithSession);
    try {
      const response = await fetch(
        `${API_URL}/Groups/CreateFailedMembersGroup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedGroupWithSession),
        },
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data);
        ToastAndroid.show(data, ToastAndroid.SHORT);

        // Optionally, navigate to another screen or show success message
      } else {
        console.log('Request failed with status:', response.status);
        ToastAndroid.show('Error Occured', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${API_URL}/Student/GetAllStudent?`);
      const data = await response.json();
      const formattedData = data.map(item => ({
        key: item.student_id.toString(),
        value: item.student_name + ' ' + '(' + item.arid_no + ')',
      }));
      setStudentList(formattedData);
      console.log(StudentList);
    } catch (error) {
      ToastAndroid.show('Error fetching Students', ToastAndroid.SHORT);
      console.error('Error fetching Students:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchSessions = async () => {
    try {
      const response = await fetch(`${API_URL}/AssignProject/GetAllSessions`);
      const data = await response.json();
      const formattedData = data.map(item => ({
        key: item.session_id.toString(), // Extract supervisor ID as string
        value: item.session_name,
      }));

      setsessionlist(formattedData);
      console.log(formattedData);
    } catch (error) {
      ToastAndroid.show('Error fetching Supervisors', ToastAndroid.SHORT);
      console.error('Error fetching Supervisors:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    // useCallback prevent unnecessary re-renders caused by creating a new
    // function instance on every render.
    useCallback(() => {
      fetchStudents();
      fetchSessions();
    }, []),
  );

  const navigation = useNavigation();
  console.log(updatedGroup);

  return (
    <View style={{flex: 1, backgroundColor: '#74A2A8'}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={{flex: 1, backgroundColor: '#74A2A8', alignItems: 'center'}}>
          <FlatList
            data={updatedGroup.Students}
            renderItem={({item, index}) => (
              <View
                style={[
                  styles.itemContainer,
                  {marginTop: index === 0 ? 20 : 0},
                ]}>
                <View style={styles.itemContent}>
                  <View style={styles.column}>
                    <Text style={styles.boldText}>{item.StudentName}</Text>
                    <Text style={{color: 'black'}}>{item.AridNumber}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={{color: 'black'}}>
                      {'Platform: ' + item.Platform}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={item => item.id}
          />

          <View style={[styles.selectContainer]}>
            <Text style={[styles.boldText, {marginLeft: 40}]}>
              Select FYP Project
            </Text>
            <SelectList
              setSelected={val => {
                temp = ProjectList.find(project => project.value === val);
                setUpdatedGroup(prevGroup => ({
                  ...prevGroup,
                  ProjectId: temp.key,
                  ProjectName: temp.value,
                }));
              }}
              data={ProjectList}
              save="value"
              onSelect={() => {
                console.warn(selectedProject);
              }}
              searchPlaceholder="Search Project"
              dropdownTextStyles={{color: 'black'}}
              boxStyles={styles.selectListStyle1}
              placeholder="Select Project"
              inputStyles={styles.selectListInput}
            />
          </View>
          <View style={[styles.selectContainer]}>
            <Text style={[styles.boldText, {marginLeft: 40}]}>
              Assign Supervisor
            </Text>
            <SelectList
              setSelected={val => {
                temp = Supervisorlist.find(
                  supervisor => supervisor.value === val,
                );
                setUpdatedGroup(prevGroup => ({
                  ...prevGroup,
                  SupervisorId: temp.key,
                  SupervisorName: temp.value,
                }));
              }}
              data={Supervisorlist}
              save="value"
              onSelect={() => {
                console.warn(selectedSupervisor);
              }}
              searchPlaceholder="Search Supervisor"
              dropdownTextStyles={{color: 'black'}}
              boxStyles={styles.selectListStyle1}
              placeholder="Select Supervisor"
              inputStyles={styles.selectListInput}
            />
          </View>
          <View style={[styles.selectContainer]}>
            <Text style={[styles.boldText, {marginLeft: 40}]}>
              Select Session
            </Text>
            <SelectList
              setSelected={val => setSelectedSession(val)}
              data={Sessionlist}
              save="key"
              onSelect={() => {
                console.warn(selectedSession);
              }}
              searchPlaceholder="Search Session"
              dropdownTextStyles={{color: 'b1lack'}}
              boxStyles={styles.selectListStyle1}
              placeholder="Select Session"
              inputStyles={styles.selectListInput}
            />
          </View>
          <TouchableOpacity
            style={styles.Button}
            onPress={CreateFailedMembersGroup}>
            <Text style={styles.buttonText}>Allocate Project</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  selectListStyle1: {
    backgroundColor: '#E5E5E5',
    borderColor: '#E5E5E5',
    borderRadius: 20,
    width: 320,
    height: 50,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#74A2A8',
    paddingHorizontal: 20,
  },
  itemContainer: {
    elevation: 5,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    marginBottom: 10,
    width: 300,
  },
  selectContainer: {
    marginTop: 10,
    width: '60%',
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  boldText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
  },

  selectListStyle: {
    backgroundColor: '#E5E5E5',
    borderColor: '#E5E5E5',
    borderRadius: 20,
    width: '70%',
    height: 50,
  },
  selectListInput: {color: 'black', fontSize: 18},
  button: {
    backgroundColor: '#D9D9D9',
    padding: 8,
    borderRadius: 40,
    height: 40,
    width: 130,
    alignItems: 'center',

    marginTop: 50,
    marginBottom: 50,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  selectListInput: {color: 'black', fontSize: 18},

  Button: {
    backgroundColor: '#D9D9D9',
    padding: 8,
    borderRadius: 40,
    height: 40,
    width: 130,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 50,
    marginBottom: 50,
    marginRight: 40,
  },

  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  optionStyle: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 10,
    width: 100,
  },
  radioContainer: {
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    backgroundColor: '#c5e3e1',
    padding: 30,
    borderRadius: 600,
    position: 'absolute',
    top: 40,
    height: 100,
    width: 100,
  },
  design: {
    backgroundColor: '#2E81FE',
    height: 92,
    width: '100%',
    borderBottomRightRadius: 60000,
    borderBottomLeftRadius: 60000,
    marginBottom: 55,
  },
  whiteDesign: {
    backgroundColor: 'white',
    borderRadius: 600,
    position: 'absolute',
    height: 110,
    width: 110,
    top: 35,
  },
});
export default ProjectReAllocation;
