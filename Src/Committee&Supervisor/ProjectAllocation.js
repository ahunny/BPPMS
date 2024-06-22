import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import API_URL from '../../apiConfig';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

const ProjectAllocation = props => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedSession, setSelectedSession] = useState('');
  const [students, setStudents] = useState([]);
  const [prefsupervisors, setprefSupervisors] = useState([]);
  const [ProjectList, setProjectList] = useState([]);
  const [Supervisorlist, setsupervisorlist] = useState([]);
  const [Sessionlist, setsessionlist] = useState([]);

  const navigation = useNavigation();

  const [allocatedProject, setAllocatedProject] = useState([
    selectedProject,
    selectedSupervisor,
  ]);

  const {groupId} = props.route.params;

  const fetchStudents = async groupId => {
    try {
      const response = await fetch(
        `${API_URL}/AssignProject/GetGroupGetailsByGroupId?group_id=${groupId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        const students = data.members.map(member => ({
          student_name: member.user.student.student_name,
          arid_no: member.user.student.arid_no,
          cgpa: member.user.student.cgpa,
          platform: member.user.platform,
          status: member.user.status,
        }));

        setStudents(students);
        console.log('Students:', students);

        const prefsupervisors = data.supervisors.map(supervisor => ({
          supervisor_id: supervisor.supervisor_id,
          supervisorName: supervisor.SupervisorName,
        }));
        setprefSupervisors(prefsupervisors);
        console.log('Supervisors:', prefsupervisors);
      } else {
        throw new Error('Failed to fetch student data');
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchStudents(groupId);
    };

    fetchData();
  }, [groupId]);

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
      fetchProjects();
      fetchSupervisors();
      fetchSessions();
    }, []),
  );

  const handleProjectAllocation = async () => {
    if (!selectedProject || !selectedSupervisor) {
      ToastAndroid.show(
        'Please select Project and Supervisor',
        ToastAndroid.SHORT,
      );
      return;
    }

    try {
      const projectId = parseInt(selectedProject, 10); // Parse project ID to integer
      const supervisorId = parseInt(selectedSupervisor, 10); // Parse supervisor ID to integer

      const response = await fetch(
        `${API_URL}/AssignProject/ProjectAllocation?project_id=${projectId}&supervisor_id=${supervisorId}&group_id=${groupId}&session_id=${selectedSession}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        ToastAndroid.show(
          'Project allocated successfully!',
          ToastAndroid.SHORT,
        );
        // Clear selections after successful allocation (optional)
        setSelectedProject('');
        setSelectedSupervisor('');
        navigation.goBack();
      } else {
        const error = await response.text();
        console.error('Error allocating project:', error);
        ToastAndroid.show(
          'Error allocating project. Please try again.',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.error('Error allocating project:', error);
      ToastAndroid.show(
        'Error allocating project. Please try again.',
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#74A2A8',
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
        <FlatList
          data={students}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={[
                styles.itemContainer,
                {marginTop: index === 0 ? 20 : 0},
                item.status === false && styles.highlightedItem,
              ]}>
              <View style={styles.itemContent}>
                <View style={styles.column}>
                  <Text style={styles.boldText}>{item.student_name}</Text>
                  <Text style={{color: 'black'}}>{item.arid_no}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={{color: 'black'}}>{'Cgpa: ' + item.cgpa}</Text>
                  <Text style={{color: 'black'}}>
                    {'Platform: ' + item.platform}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.arid_no} // Use unique key extractor
        />
        <Text style={{color: 'black', fontSize: 18}}>
          Supervisor Preferences:
        </Text>
        <FlatList
          data={prefsupervisors}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={[styles.itemContainer, {marginTop: index === 0 ? 10 : 0}]}>
              <View style={styles.itemContent}>
                <View style={styles.column}>
                  <Text style={styles.boldText}>{item.supervisorName}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.supervisor_id.toString()}
        />

        <View style={[styles.selectContainer]}>
          <Text style={[styles.boldText, {marginLeft: 40}]}>
            Select FYP Project
          </Text>
          <SelectList
            setSelected={val => setSelectedProject(val)}
            data={ProjectList}
            save="key"
            onSelect={() => {
              // console.warn(selectedProject);
            }}
            searchPlaceholder="Search Project"
            dropdownTextStyles={{color: 'black'}}
            boxStyles={styles.selectListStyle}
            placeholder="Select Project"
            inputStyles={styles.selectListInput}
          />
        </View>
        <View style={[styles.selectContainer]}>
          <Text style={[styles.boldText, {marginLeft: 40}]}>
            Assign Supervisor
          </Text>
          <SelectList
            setSelected={val => setSelectedSupervisor(val)}
            data={Supervisorlist}
            save="key"
            onSelect={() => {
              // console.warn(selectedSupervisor);
            }}
            searchPlaceholder="Search Supervisor"
            dropdownTextStyles={{color: 'black'}}
            boxStyles={styles.selectListStyle}
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
              // console.warn(selectedSession);
            }}
            searchPlaceholder="Search Session"
            dropdownTextStyles={{color: 'black'}}
            boxStyles={styles.selectListStyle}
            placeholder="Select Session"
            inputStyles={styles.selectListInput}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleProjectAllocation}>
          <Text style={styles.buttonText}>ASSIGN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  highlightedItem: {
    backgroundColor: '#CB7F7F', // Set the background color for highlighted items
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
  },

  selectListStyle: {
    backgroundColor: '#E5E5E5',
    borderColor: '#E5E5E5',
    borderRadius: 20,
    width: 320,
    height: 50,
    alignSelf: 'center',
  },
  selectListInput: {color: 'black', fontSize: 18},
  button: {
    backgroundColor: '#D9D9D9',
    padding: 8,
    borderRadius: 40,
    height: 40,
    width: 130,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default ProjectAllocation;
