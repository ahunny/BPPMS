import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {
  MultipleSelectList,
  SelectList,
} from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import API_URL from '../../apiConfig';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox'; // Import the CheckBox component

const ScheduleMeeting = () => {
  const [Title, setTitle] = useState('');
  const [MeetingNotes, setNotes] = useState('');
  const [FypGroup, setFypGroup] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [Criteria, SetCriteria] = useState([]);
  const [SelectedCriteria, setSelectedCriteria] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isGraded, setIsGraded] = useState(false); // State for checkbox

  const navigation = useNavigation();
  const FypGroupList = [
    {key: 'fyp-0', value: 'FYP-0 Groups'},
    {key: 'fyp-1', value: 'FYP-I Groups'},
    {key: 'fyp-2', value: 'FYP-II Groups'},
  ];

  const handleSubmit = async () => {
    const is_with_supervisor = false; // This is set to true as per your requirement

    // Format the date and time
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const hours = selectedTime.getHours().toString().padStart(2, '0');
    const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;

    const formData = new FormData();
    formData.append('fyp_type', FypGroup);
    formData.append('meeting_starttime', formattedTime);
    formData.append('description', MeetingNotes.toString());
    formData.append('is_with_supervisor', is_with_supervisor.toString());
    formData.append('meeting_date', formattedDate);
    formData.append('criteria_list', SelectedCriteria);
    formData.append('is_graded', isGraded.toString()); // Add checkbox value
    console.log(formData);
    try {
      const response = await fetch(`${API_URL}/Meeting/AddMeetingsSchedule`, {
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
      ToastAndroid.show('Meetings Scheduled.', ToastAndroid.SHORT);
      navigation.goBack();
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const fetchCriteria = async () => {
    try {
      const response = await fetch(
        `${API_URL}/Grading/GetMeetCriteria?fyptype=${FypGroup}`,
      );
      const data = await response.json();
      const formattedData = data.map(item => ({
        key: item.score_id.toString(),
        value: item.criteria + '  (' + item.score_weight + ')',
      }));
      SetCriteria(formattedData);
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
    if (FypGroup) {
      fetchCriteria();
    }
  }, [FypGroup]);

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date !== undefined) {
      setSelectedDate(date);
    }
  };

  const handleTimeChange = (event, time) => {
    setShowTimePicker(false);
    if (time !== undefined) {
      setSelectedTime(time);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  return (
    <ScrollView style={{backgroundColor: '#74A2A8'}}>
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
          <Text style={[styles.label, {marginLeft: 10}]}>Description</Text>
          <TextInput
            style={[
              styles.input,
              {height: 120, width: 320, alignSelf: 'center', color: 'black'},
            ]}
            value={MeetingNotes}
            onChangeText={setNotes}
            placeholder="Enter Notes"
            placeholderTextColor="grey"
            multiline
          />

          <View style={styles.selectContainer}>
            <Text style={styles.boldText}>Select FYP Group:</Text>
            <SelectList
              setSelected={val => setFypGroup(val)}
              data={FypGroupList}
              save="key"
              onSelect={() => {
                // console.warn(FypGroup);
              }}
              dropdownTextStyles={{color: 'black'}}
              boxStyles={styles.selectListStyle}
              placeholder="Select FYP Group"
              inputStyles={styles.selectListInput}
            />
          </View>

          <Text style={[styles.boldText, {marginTop: 20}]}>Meeting Date</Text>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={showDatepicker}>
            <Text style={styles.buttonText}>
              {selectedDate.toISOString().split('T')[0]}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={selectedDate}
              mode="date"
              is24Hour={false}
              display="default"
              onChange={handleDateChange}
            />
          )}

          <Text style={[styles.boldText, {marginTop: 20}]}>Start Time</Text>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={showTimepicker}>
            <Text style={styles.buttonText}>
              {`${selectedTime
                .getHours()
                .toString()
                .padStart(2, '0')}:${selectedTime
                .getMinutes()
                .toString()
                .padStart(2, '0')}:${selectedTime
                .getSeconds()
                .toString()
                .padStart(2, '0')}`}
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
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isGraded}
              onValueChange={setIsGraded}
              tintColors={{true: 'black', false: 'black'}}
            />
            <Text style={styles.label}>Is Graded</Text>
          </View>
          {isGraded && (
            <View style={styles.selectContainer}>
              <MultipleSelectList
                setSelected={setSelectedCriteria}
                data={Criteria}
                save="key"
                dropdownTextStyles={{color: 'black'}}
                labelStyles={{color: 'grey'}}
                label="Selected"
                dropdownStyles={{width: '86%', alignSelf: 'center'}}
                boxStyles={styles.multipleListStyle}
                placeholder="Select Criterias"
                inputStyles={styles.multipleListInput}
              />
            </View>
          )}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Schedule</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  multipleListStyle: {
    backgroundColor: '#E5E5E5',
    borderColor: '#E5E5E5',
    borderRadius: 20,
    marginTop: '2%',
    width: '86%',
    alignSelf: 'center',
  },
  multipleListInput: {color: 'grey', fontSize: 18},
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
    marginBottom: 30,
    marginLeft: 200,
    width: '40%',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'left',
  },
});

export default ScheduleMeeting;
