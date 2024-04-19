import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {SelectList} from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';

const ScheduleMeeting = () => {
  const [Title, setTitle] = useState('');
  const [MeetingNotes, setNotes] = useState('');
  const [FypGroup, setFypGroup] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const FypGroupList = [
    {key: '1', value: 'FYP-0 Groups'},
    {key: '2', value: 'FYP-I Groups'},
    {key: '3', value: 'FYP-II Groups'},
  ];

  const handleSubmit = () => {
    // Implement form submission logic here
    console.log('Form submitted');
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    const currentDate = selectedDate || date;
    setSelectedDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    const currentTime = selectedTime || selectedTime;
    setSelectedTime(currentTime);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#74A2A8'}}>
      <View style={{marginTop: 20}}>
        <Text style={[styles.label, {marginLeft: 15}]}>Title</Text>
        <TextInput
          style={[
            styles.input,
            {height: 50, width: 380, alignSelf: 'center', color: 'black'},
          ]}
          value={Title}
          onChangeText={setTitle}
          placeholder="Enter Title"
          placeholderTextColor="grey"
        />

        <View style={styles.selectContainer}>
          <Text style={styles.boldText}>Select FYP Group:</Text>
          <SelectList
            setSelected={val => setFypGroup(val)}
            data={FypGroupList}
            save="value"
            onSelect={() => {
              console.warn(FypGroup);
            }}
            dropdownTextStyles={{color: 'black'}}
            boxStyles={styles.selectListStyle}
            placeholder="Select FYP Group"
            inputStyles={styles.selectListInput}
          />
        </View>

        <Text style={[styles.boldText, {marginLeft: 20, marginTop: 20}]}>
          Meeting Date
        </Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={showDatepicker}>
          <Text style={styles.buttonText}>
            {selectedDate.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={selectedDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={[styles.boldText, {marginLeft: 20, marginTop: 20}]}>
          Start Time
        </Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={showTimepicker}>
          <Text style={styles.buttonText}>
            {selectedTime.toLocaleTimeString()}
          </Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            testID="timePicker"
            value={selectedTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleTimeChange}
          />
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Schedule</Text>
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

export default ScheduleMeeting;
