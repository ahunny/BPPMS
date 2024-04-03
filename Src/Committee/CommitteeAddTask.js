import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';

const Addtask = () => {
  const [Title, setTitle] = useState('');
  const [TaskNotes, setNotes] = useState('');
  const [DueDate, setduedate] = useState(new Date());
  const [fileResponse, setFileResponse] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    // Implement form submission logic here
    console.log('Form submitted');
  };

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

  return (
    <View style={{flex: 1, backgroundColor: '#74A2A8'}}>
      <View style={{marginTop: 20}}>
        <Text style={[styles.label, {marginLeft: 15}]}>Title</Text>
        <TextInput
          style={[styles.input, {height: 50, width: 380, alignSelf: 'center'}]}
          value={Title}
          onChangeText={setTitle}
          placeholder="Enter Title"
        />

        <Text style={[styles.label, {marginLeft: 15}]}>Task Details:</Text>
        <TextInput
          style={[styles.input, {height: 180, width: 380, alignSelf: 'center'}]}
          value={TaskNotes}
          onChangeText={setNotes}
          multiline
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

        <Text style={[styles.boldText, {marginLeft: 20, marginTop: 20}]}>
          Due Date
        </Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={showDatepicker}>
          <Text style={styles.buttonText}>{DueDate.toLocaleDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={DueDate}
            mode="time"
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
    marginLeft: 20,
    width: '50%',
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
    backgroundColor: '#C0C0C0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 20,
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
    marginTop: 40,
    marginLeft: 200,
    width: '40%',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Addtask;