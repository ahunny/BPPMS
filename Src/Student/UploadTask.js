import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import API_URL from '../../apiConfig';

const UploadTasks = ({route}) => {
  const {taskData} = route.params;

  const [description, setDescription] = useState(taskData.task_description);
  const [fileResponse, setFileResponse] = useState([]);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setFileResponse(response);
      console.log('URI is: ', response[0].uri);
    } catch (err) {
      // Handle the error
    }
  }, []);

  const handleSubmit = async () => {
    const isStudentSubmitting = true; // This is set to true as per your requirement

    const formData = new FormData();
    formData.append('isStudent', isStudentSubmitting.toString());
    formData.append('task_id', taskData.task_id.toString());
    formData.append('task_description', description);

    if (fileResponse[0]) {
      formData.append('fileUrl', {
        uri: fileResponse[0].uri,
        type: fileResponse[0].type,
        name: fileResponse[0].name,
      });
    }
    console.log(formData);

    try {
      const response = await fetch(`${API_URL}/Tasks/AddTask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data);
        Alert.alert('Task uploaded successfully');
      } else {
        console.log('Request failed with status:', response.status);
        Alert.alert('Error', 'Failed to upload task');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#74A2A8'}}>
      <View style={{marginTop: 20}}>
        <Text style={[styles.label, {marginLeft: 15}]}>Description</Text>
        <TextInput
          style={[
            styles.input,
            {height: 200, width: '95%', alignSelf: 'center', color: 'black'},
          ]}
          value={description}
          onChangeText={setDescription}
          multiline
          placeholder="Enter description"
          placeholderTextColor={'grey'}
        />
        <View>
          {fileResponse[0] && (
            <View style={{marginTop: 20, alignSelf: 'center'}}>
              <Image
                source={{uri: fileResponse[0].uri}}
                style={{width: 100, height: 100}}
              />
              <Text>Selected File: {fileResponse[0].name}</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleDocumentSelection}>
          <Text style={styles.buttonText}>Choose File</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>UPLOAD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  uploadButton: {
    backgroundColor: '#C0C0C0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
    width: '50%',
  },
  submitButton: {
    backgroundColor: '#C0C0C0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
    width: '50%',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UploadTasks;
