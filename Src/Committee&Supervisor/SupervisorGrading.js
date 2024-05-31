import React, {useCallback, useEffect, useState} from 'react';
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
  TextInput,
  ToastAndroid,
  Alert,
} from 'react-native';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {SelectList} from 'react-native-dropdown-select-list';
import API_URL from '../../apiConfig';

const SupervisorGrading = props => {
  const {userid} = props.route.params;
  const {roles} = props.route.params;

  console.log(userid, roles);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedCriteria, setSelectedCriteria] = useState('');
  const [GradeRemarks, setGradeRemarks] = useState('');
  const [ProjectList, setProjectList] = useState([]);
  const [StudentList, setStudentList] = useState([]);
  const [CriteriaList, setcriteriaList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [score, setscore] = useState('');

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        `${API_URL}/Groups/GetSupervisorProjects?userid=${userid}`,
      );
      const data = await response.json();
      const formattedData = data.map(item => ({
        key: item.project_id.toString(),
        value: item.project_title,
      }));
      setProjectList(formattedData);
      console.log(data);
    } catch (error) {
      ToastAndroid.show('Error fetching Projects', ToastAndroid.SHORT);
      console.error('Error fetching Projects:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        `${API_URL}/Groups/GetStudentsbyProjectID?projectid=${selectedProject}`,
      );
      const data = await response.json();
      const students = data.map(item => ({
        key: item.StudentId.toString(),
        value: item.StudentName + ' ' + '(' + item.AridNo + ')',
      }));
      setStudentList(students);
      console.log(students);
    } catch (error) {
      ToastAndroid.show('Error fetching Students', ToastAndroid.SHORT);
      console.error('Error fetching Students:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchCriteria = async () => {
    try {
      const response = await fetch(
        `${API_URL}/Grading/GetCriteria?role=${roles}`,
      );
      const data = await response.json();
      const formattedData = data.map(item => ({
        key: item.score_id.toString(),
        value: item.criteria + '  (' + item.score_weight + ')',
      }));
      setcriteriaList(formattedData);
      console.log(data);
    } catch (error) {
      ToastAndroid.show('Error fetching Criteria', ToastAndroid.SHORT);
      console.error('Error fetching Criteria:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchCriteria();
  }, []);

  useEffect(() => {
    if (selectedProject != '') {
      fetchStudents();
    }
  }, [selectedProject]);

  const HandleSetGrades = async () => {
    if (loading) {
      Alert.alert('Please wait', 'Supervisors are being submitted...');
      return;
    }

    const data = {
      user_id: userid,
      score: score,
      student_id: selectedStudent,
      score_id: selectedCriteria,
      remarks: GradeRemarks,
    };

    setLoading(true); // Set loading state

    try {
      const response = await fetch(`${API_URL}/Grading/AddGrading`, {
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
      ToastAndroid.show('Graded Successfully', ToastAndroid.SHORT);

      setLoading(false); // Reset loading state on success
    } catch (error) {
      console.error('Error:', error);
      setLoading(false); // Reset loading state on error
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#74A2A8'}}>
      <View
        style={{
          backgroundColor: '#C0C0C0',
          width: '97%',
          height: '97%',
          alignSelf: 'center',
          alignItems: 'center',
          marginTop: 10,
          borderRadius: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
          }}>
          <SelectList
            setSelected={val => setSelectedProject(val)}
            data={ProjectList}
            save="key" // also set save to key.
            onSelect={() => {
              console.warn(selectedProject);
            }}
            searchPlaceholder="Search Project"
            dropdownTextStyles={{color: 'black'}}
            boxStyles={styles.selectListStyle}
            placeholder="Select Project"
            inputStyles={styles.selectListInput}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
          }}>
          <SelectList
            setSelected={val => setSelectedStudent(val)}
            data={StudentList}
            save="key" // also set save to key.
            onSelect={() => {
              console.warn(selectedStudent);
            }}
            searchPlaceholder="Search Student"
            dropdownTextStyles={{color: 'black'}}
            boxStyles={styles.selectListStyle}
            placeholder="Select Student"
            inputStyles={styles.selectListInput}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 30,
          }}>
          <SelectList
            setSelected={val => setSelectedCriteria(val)}
            data={CriteriaList}
            save="key" // also set save to key.
            onSelect={() => {
              console.warn(selectedCriteria);
            }}
            dropdownTextStyles={{color: 'black'}}
            boxStyles={styles.selectListStyle}
            placeholder="Select Criteria"
            inputStyles={styles.selectListInput}
          />

          <TextInput
            style={[
              styles.input,
              {
                height: 50,
                width: 80,
                alignSelf: 'center',
                color: 'black',
                marginLeft: 10,
              },
            ]}
            value={score}
            onChangeText={setscore}
            multiline
          />
        </View>

        <Text
          style={{
            color: 'black',
            fontSize: 20,
            marginTop: 20,
            marginLeft: -200,
          }}>
          Remarks:
        </Text>
        <TextInput
          style={[
            styles.input,
            {height: 70, width: 320, alignSelf: 'center', color: 'black'},
          ]}
          value={GradeRemarks}
          onChangeText={setGradeRemarks}
          multiline
        />

        <TouchableOpacity
          style={[
            styles.Button,
            {marginTop: 20, alignSelf: 'flex-end', marginRight: 30},
          ]}
          onPress={HandleSetGrades}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  selectListStyle: {
    backgroundColor: '#E5E5E5',
    borderColor: '#E5E5E5',
    borderRadius: 20,
    width: 230,
    height: 50,
  },
  platFormSelect: {
    backgroundColor: '#E5E5E5',
    borderColor: '#E5E5E5',
    borderRadius: 20,
    width: 130,
    height: 50,
  },
  selectListInput: {color: 'black', fontSize: 18},

  Button: {
    backgroundColor: '#D9D9D9',
    padding: 8,
    borderRadius: 20,
    height: 40,
    width: 130,
    alignItems: 'center',
  },
  input: {
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#D9D9D9',
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

export default SupervisorGrading;
