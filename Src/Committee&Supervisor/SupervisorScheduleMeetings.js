import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ToastAndroid,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import API_URL from '../../apiConfig';
import {useFocusEffect} from '@react-navigation/native';

const SupervisorScheduleMeeting = props => {
  const [Title, setTitle] = useState('');
  const [MeetingNotes, setNotes] = useState('');
  const [FypGroup, setFypGroup] = useState(null);
  const [FypGrouplist, setFypGrouplist] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const {userid} = props.route.params;
  console.log(userid);

  const fetchProjectsOfSupervisor = async () => {
    try {
      const response = await fetch(
        `${API_URL}/Groups/GetProjectsbySpervisor?userid=${userid}`,
      );
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        const formattedData = data.map(item => ({
          key: item.GroupId.toString(),
          value: item.ProjectTitle,
        }));
        setFypGrouplist(formattedData);
        console.log(formattedData);
      } else {
        setFypGrouplist([]);
        ToastAndroid.show('No Project Available', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Error fetching Projects', ToastAndroid.SHORT);
      console.error('Error fetching Projects:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProjectsOfSupervisor();
    }, []),
  );

  const handleSubmit = async () => {
    if (!FypGroup) {
      Alert.alert(
        'Error',
        'Please select an FYP group before scheduling a meeting.',
      );
      return;
    }

    const is_with_supervisor = true;
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const hours = selectedTime.getHours().toString().padStart(2, '0');
    const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
    const seconds = selectedTime.getSeconds().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    const formData = new FormData();
    formData.append('group_id', FypGroup);
    formData.append('meeting_starttime', formattedTime);
    formData.append('description', MeetingNotes.toString());
    formData.append('is_with_supervisor', is_with_supervisor.toString());
    formData.append('meeting_date', formattedDate);
    console.log(formData);
    try {
      const response = await fetch(
        `${API_URL}/Meeting/AddSupervisorMeetingsSchedule`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData?.message ||
          'Request failed with status: ' + response.status;
        console.error('Error:', errorMessage);
        Alert.alert('Error', errorMessage);
        return;
      }
      const data = await response.json();
      console.log('Response data:', data);
      Alert.alert('New Meeting Scheduled');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

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
            {FypGrouplist.length > 0 ? (
              <SelectList
                setSelected={val => setFypGroup(val)}
                data={FypGrouplist}
                save="key"
                onSelect={() => {
                  // console.warn(FypGroup);
                }}
                dropdownTextStyles={{color: 'black'}}
                boxStyles={styles.selectListStyle}
                placeholder="Select FYP Group"
                inputStyles={styles.selectListInput}
              />
            ) : (
              <Text style={{color: 'black'}}>No projects available</Text>
            )}
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

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Schedule</Text>
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
    marginLeft: 200,
    width: '40%',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SupervisorScheduleMeeting;
