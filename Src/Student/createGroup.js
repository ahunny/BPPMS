import React, {useCallback, useState} from 'react';
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
  ToastAndroid,
} from 'react-native';
import API_URL from '../../apiConfig';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {SelectList} from 'react-native-dropdown-select-list';
import {Alert} from 'react-native';

const Creategroup = props => {
  const [IosStudent, setIosStudent] = useState('');
  const [FlutterStudent, setFlutterStudent] = useState('');
  const [ReactNativeStudent, setReactNativeStudent] = useState('');
  const [AndroidStudent, setAndroidStudent] = useState('');
  const [WebStudent, setWebStudent] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [StudentList, setStudentList] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([
    IosStudent,
    FlutterStudent,
    ReactNativeStudent,
    AndroidStudent,
    WebStudent,
  ]);
  const {userid} = props.route.params;
  console.log('ok id', userid);

  const HandleCreatGroup = async () => {
    try {
      const data = selectedStudents
        .map(student => ({
          student_id: student.id,
          technology: student.Technology,
          user_id: userid,
        }))
        .filter(
          item =>
            item.student_id !== undefined && item.technology !== undefined,
        );

      const response = await fetch(`${API_URL}/Auth/CreateGroup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data);
        Alert.alert('Group Added');

        // Optionally, navigate to another screen or show success message
      } else {
        console.log('Request failed with status:', response.status);
        ToastAndroid.show('Error Occured', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${API_URL}/Student/GetAllStudent?`);
      const data = await response.json();
      const formattedData = data.map(item => ({
        key: item.student_id.toString(),
        value: item.student_name + ' ' + '(' + item.arid_no + ')',
      }));
      setStudentList(formattedData);
      console.log(StudentList);
    } catch (error) {
      ToastAndroid.show('Error fetching Students', ToastAndroid.SHORT);
      console.error('Error fetching Students:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    // useCallback prevent unnecessary re-renders caused by creating a new
    // function instance on every render.
    useCallback(() => {
      fetchStudents();
    }, []),
  );

  const sendRequest = () => {
    setSelectedStudents([
      IosStudent,
      FlutterStudent,
      ReactNativeStudent,
      AndroidStudent,
      WebStudent,
    ]);
    console.log(selectedStudents);
    HandleCreatGroup();
  };

  const navigation = useNavigation();

  return (
    <ScrollView style={{backgroundColor: '#74A2A8'}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{flex: 1, backgroundColor: '#74A2A8'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            <SelectList
              setSelected={val => {
                setIosStudent({
                  id: StudentList.find(student => student.value.includes(val))
                    .key,
                  Technology: 'IOS',
                });
                setStudentList(
                  StudentList.filter(student => student.value !== val),
                );
              }}
              data={StudentList}
              save="value" // also set save to key.
              onSelect={() => {
                console.warn(IosStudent);
              }}
              searchPlaceholder="Search Student"
              dropdownTextStyles={{color: 'black'}}
              boxStyles={styles.selectListStyle}
              placeholder="Select Student"
              inputStyles={styles.selectListInput}
            />
            <Text
              style={{
                backgroundColor: '#D9D9D9',
                width: 150,
                height: 50,
                borderRadius: 20,
                fontSize: 18,
                color: 'black',
                textAlign: 'center',
                verticalAlign: 'middle',
              }}>
              IOS
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            <SelectList
              setSelected={val => {
                setFlutterStudent({
                  id: StudentList.find(student => student.value.includes(val))
                    .key,
                  Technology: 'Flutter',
                });
                setStudentList(
                  StudentList.filter(student => student.value !== val),
                );
              }}
              data={StudentList}
              save="value" // also set save to key.
              onSelect={() => {
                console.warn(FlutterStudent);
              }}
              searchPlaceholder="Search Student"
              dropdownTextStyles={{color: 'black'}}
              boxStyles={styles.selectListStyle}
              placeholder="Select Student"
              inputStyles={styles.selectListInput}
            />
            <Text
              style={{
                backgroundColor: '#D9D9D9',
                width: 150,
                height: 50,
                borderRadius: 20,
                fontSize: 18,
                color: 'black',
                textAlign: 'center',
                verticalAlign: 'middle',
              }}>
              Flutter
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            <SelectList
              setSelected={val => {
                setReactNativeStudent({
                  id: StudentList.find(student => student.value.includes(val))
                    .key,
                  Technology: 'React-Native',
                });
                setStudentList(
                  StudentList.filter(student => student.value !== val),
                );
              }}
              data={StudentList}
              save="value" // also set save to key.
              onSelect={() => {
                console.warn(ReactNativeStudent);
              }}
              searchPlaceholder="Search Student"
              dropdownTextStyles={{color: 'black'}}
              boxStyles={styles.selectListStyle}
              placeholder="Select Student"
              inputStyles={styles.selectListInput}
            />
            <Text
              style={{
                backgroundColor: '#D9D9D9',
                width: 150,
                height: 50,
                borderRadius: 20,
                fontSize: 18,
                color: 'black',
                textAlign: 'center',
                verticalAlign: 'middle',
              }}>
              React-Native
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            <SelectList
              setSelected={val => {
                setAndroidStudent({
                  id: StudentList.find(student => student.value.includes(val))
                    .key,
                  Technology: 'Android',
                });
                setStudentList(
                  StudentList.filter(student => student.value !== val),
                );
              }}
              data={StudentList}
              save="value" // also set save to key.
              onSelect={() => {
                console.warn(AndroidStudent);
              }}
              searchPlaceholder="Search Student"
              dropdownTextStyles={{color: 'black'}}
              boxStyles={styles.selectListStyle}
              placeholder="Select Student"
              inputStyles={styles.selectListInput}
            />
            <Text
              style={{
                backgroundColor: '#D9D9D9',
                width: 150,
                height: 50,
                borderRadius: 20,
                fontSize: 18,
                color: 'black',
                textAlign: 'center',
                verticalAlign: 'middle',
              }}>
              Android
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            <SelectList
              setSelected={val => {
                setWebStudent({
                  id: StudentList.find(student => student.value.includes(val))
                    .key,
                  Technology: 'WEB',
                });
                setStudentList(
                  StudentList.filter(student => student.value !== val),
                );
              }}
              data={StudentList}
              save="value" // also set save to key.
              onSelect={() => {
                console.warn(WebStudent);
              }}
              searchPlaceholder="Search Student"
              dropdownTextStyles={{color: 'black'}}
              boxStyles={styles.selectListStyle}
              placeholder="Select Student"
              inputStyles={styles.selectListInput}
            />
            <Text
              style={{
                backgroundColor: '#D9D9D9',
                width: 150,
                height: 50,
                borderRadius: 20,
                fontSize: 18,
                color: 'black',
                textAlign: 'center',
                verticalAlign: 'middle',
              }}>
              Web
            </Text>
          </View>
          <TouchableOpacity style={styles.Button} onPress={sendRequest}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  selectListStyle: {
    backgroundColor: '#E5E5E5',
    borderColor: '#E5E5E5',
    borderRadius: 20,
    width: 220,
    height: 50,
  },

  selectListInput: {color: 'black', fontSize: 18},

  Button: {
    backgroundColor: '#D9D9D9',
    padding: 8,
    borderRadius: 40,
    height: 40,
    width: 130,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 50,
    marginRight: 40,
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
export default Creategroup;
