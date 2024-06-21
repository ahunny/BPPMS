import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ToastAndroid,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox'; // Import the CheckBox component
import {SelectList} from 'react-native-dropdown-select-list';
import API_URL from '../../apiConfig';
import {useNavigation} from '@react-navigation/native';

const AddTaskRemarks = props => {
  const {MeetDetail} = props.route.params;
  const {userid} = props.route.params;
  const projectid = MeetDetail.project_id;
  const meetingid = MeetDetail.meeting_id;

  const [selectedStudent, setSelectedStudent] = useState('');
  const [Comment, setComment] = useState('');
  const [StudentList, setStudentList] = useState([]);
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        `${API_URL}/Groups/GetStudentsbyProjectID?projectid=${projectid}`,
      );
      const data = await response.json();
      const students = data.map(item => ({
        key: item.StudentId.toString(),
        value: `${item.StudentName} (${item.AridNo})`,
      }));
      setStudentList(students);
    } catch (error) {
      ToastAndroid.show('Error fetching Students', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const HandleSetComment = async () => {
    if (loading) {
      Alert.alert('Please wait', 'Supervisors are being submitted...');
      return;
    }

    if (!Comment.trim()) {
      ToastAndroid.show(
        'Please write a comment before submitting',
        ToastAndroid.SHORT,
      );
      return;
    }

    const data = {
      comment: Comment,
      student_id: selectedStudent,
      meeting_id: MeetDetail.meeting_id,
      group_id: MeetDetail.group_id,
      ispublic: isPublic,
    };
    console.log('comment:   ' + data);

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/Remarks/AddSupervisorMeetRemarks`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        setLoading(false);
        ToastAndroid.show(
          errorData?.message || 'You Have Already Commented this Student',
          ToastAndroid.SHORT,
        );
        return;
      }

      const responseData = await response.json();
      ToastAndroid.show('Comment Successfully', ToastAndroid.SHORT);
      navigation.goBack();
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
        <TouchableOpacity style={styles.itemContainer}>
          <View style={styles.itemContent}>
            <Text style={styles.projectTitle}>{MeetDetail.project_title}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.selectContainer}>
          <SelectList
            setSelected={val => setSelectedStudent(val)}
            data={StudentList}
            save="key"
            searchPlaceholder="Search Student"
            dropdownTextStyles={{color: 'black'}}
            boxStyles={styles.selectListStyle}
            placeholder="Select Student"
            inputStyles={styles.selectListInput}
          />
        </View>
        <Text style={styles.remarksLabel}>Remarks:</Text>
        <TextInput
          style={[
            styles.input,
            {height: 100, width: 320, alignSelf: 'center', color: 'black'},
          ]}
          value={Comment}
          onChangeText={setComment}
          multiline
        />
        <View style={styles.checkboxContainer}>
          <CheckBox value={isPublic} onValueChange={setIsPublic} />
          <Text style={{color: 'black'}}>Is Public</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.Button,
            {marginTop: 20, alignSelf: 'flex-end', marginRight: 30},
          ]}
          onPress={HandleSetComment}>
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
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  itemContainer: {
    elevation: 5,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    marginBottom: 10,
    width: 320,
    marginTop: 20,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  selectListInput: {
    color: 'black',
    fontSize: 18,
  },
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
  remarksLabel: {
    color: 'black',
    fontSize: 20,
    marginTop: 20,
    marginLeft: -200,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: -220,
  },
});
export default AddTaskRemarks;
