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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import API_URL from '../../apiConfig';

const ProjectDetails = ({route}) => {
  const [students, setStudents] = useState([]);
  const [Supervisorlist, setsupervisorlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const {projectData} = route.params;
  groupid = projectData.GroupId;
  console.log('details', projectData);
  console.log('id', groupid);

  const fetchStudents = async groupid => {
    try {
      const response = await fetch(
        `${API_URL}/AssignProject/GetGroupdetailsByProject?group_id=${groupid}`,
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
        }));

        setStudents(students);
        console.log(students);
      } else {
        throw new Error('Failed to fetch student data');
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };
  const fetchSupervisors = async () => {
    try {
      const response = await fetch(`${API_URL}/Student/GetAllSupervisors`);
      const data = await response.json();
      const formattedData = data.map(item => ({
        key: item.supervisor_id.toString(), // Extract supervisor ID as string
        value: item.name,
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
      fetchSupervisors();
    }, []),
  );
  useEffect(() => {
    const fetchData = async () => {
      await fetchStudents(groupid);
    };

    fetchData();
  }, [groupid]);
  const HandleAssignSupervisor = () => {
    ToastAndroid.show('New Supervisor Assigned', ToastAndroid.SHORT);
  };
  const navigation = useNavigation();

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
              style={[styles.itemContainer, {marginTop: index === 0 ? 20 : 0}]}>
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
          keyExtractor={item => item.id}
        />
        <View style={[styles.selectContainer]}>
          <Text style={[styles.boldText, {alignSelf: 'center'}]}>
            Re-Allocate Supervisor
          </Text>
          <SelectList
            setSelected={val => setSelectedSupervisor(val)}
            data={Supervisorlist}
            save="key"
            onSelect={() => {
              console.warn(selectedSupervisor);
            }}
            searchPlaceholder="Search Supervisor"
            dropdownTextStyles={{color: 'black'}}
            boxStyles={styles.selectListStyle}
            placeholder="Select Supervisor"
            inputStyles={styles.selectListInput}
          />
        </View>
        <TouchableOpacity
          style={styles.Button}
          onPress={HandleAssignSupervisor}>
          <Text style={styles.buttonText}>Assign Supervisor</Text>
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
  Button: {
    backgroundColor: '#D9D9D9',
    padding: 8,
    borderRadius: 40,
    height: 40,
    width: 150,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 40,
    marginBottom: 100,
  },
  selectContainer: {
    width: '60%',
    alignItems: 'center',
    marginBottom: 100,
  },
  itemContainer: {
    elevation: 5,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    marginBottom: 10,
    width: 320,
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

  buttonText: {
    color: 'black',
    fontSize: 15,
  },
  selectListStyle: {
    backgroundColor: '#E5E5E5',
    borderColor: '#E5E5E5',
    borderRadius: 20,
    width: 280,
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
});

export default ProjectDetails;
