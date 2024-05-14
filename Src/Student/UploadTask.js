import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';

const UploadTasks = ({route}) => {
  const {taskData} = route.params;

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [fileResponse, setFileResponse] = useState([]);
  const [recipient, setRecipient] = useState('supervisor');

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

  const handleSubmit = () => {
    // Implement form submission logic here
    console.log('Form submitted');
  };

  return (
    <View style={{flex: 1, backgroundColor: '#74A2A8'}}>
      <View style={{marginTop: 20}}>
        <Text style={[styles.label, {marginLeft: 15}]}>Description</Text>
        <TextInput
          style={[styles.input, {height: 200, width: 380, alignSelf: 'center'}]}
          value={description}
          onChangeText={setDescription}
          multiline
          placeholder="Enter description"
          placeholderTextColor={'grey'}
        />
        <View>
          {fileResponse[0] && (
            <View style={{marginTop: 20, alignSelf: 'center'}}>
              <Image source={{uri: fileResponse[0].uri}} />
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
