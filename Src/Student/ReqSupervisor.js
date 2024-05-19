import {useFocusEffect} from '@react-navigation/native';
import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  ScrollView,
  Alert,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import API_URL from '../../apiConfig';

const ReqSupervisor = props => {
  const [supervisorPreferences, setSupervisorPreferences] = useState({
    user_id: props.route.params.userid,
    prefferedSupervisors: [], // Initialize empty array for supervisor IDs
  });
  const [SupervisorList, setsupervisorlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const {userid} = props.route.params;

  const handleFirstPreferenceChange = val => {
    setSupervisorPreferences({
      ...supervisorPreferences,
      prefferedSupervisors: [
        val,
        ...supervisorPreferences.prefferedSupervisors.slice(1),
      ],
    });
  };

  const handleSecondPreferenceChange = val => {
    setSupervisorPreferences({
      ...supervisorPreferences,
      prefferedSupervisors: [
        supervisorPreferences.prefferedSupervisors[0],
        val,
        ...supervisorPreferences.prefferedSupervisors.slice(2),
      ],
    });
  };

  const handleThirdPreferenceChange = val => {
    setSupervisorPreferences({
      ...supervisorPreferences,
      prefferedSupervisors: [
        supervisorPreferences.prefferedSupervisors[0],
        supervisorPreferences.prefferedSupervisors[1],
        val,
      ],
    });
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
    } catch (error) {
      ToastAndroid.show('Error fetching Supervisors', ToastAndroid.SHORT);
      console.error('Error fetching Supervisors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSupervisorsRequest = async () => {
    if (loading) {
      Alert.alert('Please wait', 'Supervisors are being submitted...');
      return;
    }

    const data = {
      user_id: supervisorPreferences.user_id,
      prefferedSupervisors: supervisorPreferences.prefferedSupervisors, // Send supervisor IDs
    };

    setLoading(true); // Set loading state

    try {
      const response = await fetch(`${API_URL}/Auth/SupervisorPreferences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error submitting preferences:', errorData);
        setLoading(false); // Reset loading state on error
        ToastAndroid.show(
          errorData?.message ||
            'Error submitting preferences. Please try again.',
          ToastAndroid.SHORT,
        );
        return;
      }

      const responseData = await response.json();
      console.log('Response data:', responseData);
      Alert.alert(
        'Supervisors Request Sent',
        'Your preferred supervisors have been submitted.',
      );
      setLoading(false); // Reset loading state on success
    } catch (error) {
      console.error('Error:', error);
      setLoading(false); // Reset loading state on error
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchSupervisors();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      fetchSupervisors();
    }, []),
  );

  const [users, setUsers] = useState([]);

  const fetchGroupDetails = async () => {
    try {
      const response = await fetch(
        `${API_URL}/Groups/GetGroupDetails?student_id=${userid}`,
      );
      const data = await response.json();

      if (response.ok) {
        const members = data.members || [];
        const userList = members.map(member => member.user);
        setUsers(userList);
      } else {
        throw new Error(data);
      }
    } catch (error) {
      ToastAndroid.show('Error fetching Group Details', ToastAndroid.SHORT);
      console.error('Error fetching Group Details:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchGroupDetails();
    }, []),
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({item}) => (
          <ScrollView style={{marginTop: 20}}>
            <TouchableOpacity style={styles.itemContainer}>
              <View style={styles.itemContent}>
                <View style={styles.column}>
                  <Text style={styles.boldText}>
                    {item.student.student_name}
                  </Text>
                  <Text style={{color: 'black'}}>{item.student.arid_no}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={{color: 'black'}}>
                    {'Cgpa: ' + item.student.cgpa}
                  </Text>
                  <Text style={{color: 'black'}}>
                    {'Platform: ' + item.platform}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        )}
        keyExtractor={item => item.id} // Assuming 'id' is unique for each user
      />

      <View style={styles.selectContainer}>
        <Text style={styles.boldText}>Supervisor Preferences</Text>
        <SelectList
          setSelected={handleFirstPreferenceChange}
          data={SupervisorList}
          save="key"
          onSelect={() => {
            console.log(supervisorPreferences);
          }}
          searchPlaceholder="Search Supervisor"
          dropdownTextStyles={{color: 'black'}}
          boxStyles={styles.selectListStyle}
          placeholder="Select Supervisor"
          inputStyles={styles.selectListInput}
        />
      </View>
      <View style={styles.selectContainer}>
        <SelectList
          setSelected={handleSecondPreferenceChange}
          data={SupervisorList}
          save="key"
          onSelect={() => {
            console.log(supervisorPreferences);
          }}
          searchPlaceholder="Search Supervisor"
          dropdownTextStyles={{color: 'black'}}
          boxStyles={styles.selectListStyle}
          placeholder="Select Supervisor"
          inputStyles={styles.selectListInput}
        />
      </View>
      <View style={styles.selectContainer}>
        <SelectList
          setSelected={handleThirdPreferenceChange}
          data={SupervisorList}
          save="key"
          onSelect={() => {
            console.log(supervisorPreferences);
          }}
          searchPlaceholder="Search Supervisor"
          dropdownTextStyles={{color: 'black'}}
          boxStyles={styles.selectListStyle}
          placeholder="Select Supervisor"
          inputStyles={styles.selectListInput}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleCreateSupervisorsRequest}>
        <Text style={styles.buttonText}>Send Request</Text>
      </TouchableOpacity>
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
    width: '100%',
  },
  selectContainer: {
    marginTop: 10,
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
    width: 220,
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
    alignSelf: 'flex-end',
    marginTop: 50,
    marginBottom: 50,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default ReqSupervisor;
