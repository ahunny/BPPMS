import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ToastAndroid,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';
import API_URL from '../../apiConfig';
import {useNavigation} from '@react-navigation/native';

const Addtask = ({route}) => {
  const [TaskDescription, setDescription] = useState('');
  const [DueDate, setduedate] = useState(new Date());
  const [fileResponse, setFileResponse] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();

  const {Groupdata} = route.params;
  groupid = Groupdata.GroupId;
  console.log('GroupID:', groupid);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setFileResponse(response);
      console.log(response);
    } catch (err) {
      // console.warn(err);
    }
  }, []);
  const handleDateChange = (event, DueDate) => {
    setShowDatePicker(false);
    const currentDate = DueDate || date;
    setduedate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleSubmit = async () => {
    const isStudentSubmitting = false; // This is set to true as per your requirement
    const isFromSupervisor = false; // As per your requirement
    const toSupervisor = false; // As per your requirement
    console.log(DueDate.toString().substring(0, 10));

    const formData = new FormData();
    formData.append('isStudent', isStudentSubmitting.toString());
    formData.append('group_id', groupid.toString());
    formData.append('deadline', DueDate.toString().substring(0, 10));
    formData.append('task_desc', TaskDescription);
    formData.append('isFromSupervisor', isFromSupervisor.toString());
    formData.append('toSupervisor', toSupervisor.toString()); // Assuming all tasks are directed to supervisor

    if (fileResponse[0]) {
      formData.append('fileUrl', fileResponse[0]); // Include the entire file object
    }

    try {
      const response = await fetch(`${API_URL}/Tasks/AddTask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) {
        // Handle non-200 OK responses gracefully
        const errorData = await response.json(); // Try to parse error details
        const errorMessage =
          errorData?.message ||
          'Request failed with status: ' + response.status;
        console.error('Error:', errorMessage);
        Alert.alert('Error', errorMessage);
        return; // Exit the function after handling the error
      }

      const data = await response.json();
      console.log('Response data:', data);
      ToastAndroid.show('Task Uploaded.', ToastAndroid.SHORT);
      navigation.goBack();
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#74A2A8'}}>
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
        <View style={{marginTop: 20}}>
          <Text style={[styles.label, {marginLeft: 15}]}>
            Task Description:
          </Text>
          <TextInput
            style={[
              styles.input,
              {height: 120, width: 320, alignSelf: 'center', color: 'black'},
            ]}
            value={TaskDescription}
            onChangeText={setDescription}
            multiline
          />

          <View>
            {fileResponse[0] && (
              <View style={{marginTop: 20, alignSelf: 'center'}}>
                <Image source={{uri: fileResponse[0].uri}} />
                <Text style={{color: 'black'}}>
                  Selected File: {fileResponse[0].name}
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleDocumentSelection}>
            <Text style={styles.buttonText}>Choose File</Text>
          </TouchableOpacity>

          <Text style={[styles.boldText, {marginTop: 20, marginLeft: 20}]}>
            Due Date
          </Text>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={showDatepicker}>
            <Text style={styles.buttonText}>
              {DueDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={DueDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  datePickerButton: {
    backgroundColor: '#D9D9D9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    width: '50%',
    marginLeft: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  input: {
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#D9D9D9',
  },
  selectContainer: {
    marginTop: 10,
    marginLeft: 20,
  },
  boldText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
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
  uploadButton: {
    backgroundColor: '#D9D9D9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
    marginLeft: 20,
    width: '50%',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'black',
  },
  radioContainer: {
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#D9D9D9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 40,
    marginLeft: 220,
    width: 100,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Addtask;
