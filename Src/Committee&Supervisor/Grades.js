import React, {useState} from 'react';
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
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {SelectList} from 'react-native-dropdown-select-list';

const StudentGrades = () => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  const ProjectList = [
    {key: '1', value: 'Industrial Watch'},
    {key: '2', value: 'Lost Child'},
    {key: '3', value: 'Project Progress Monitoring'},
    {key: '4', value: 'Hakeem Hikmat'},
    {key: '5', value: 'Virtual Eye'},
  ];
  const StudentList = [
    {key: '1', value: 'Armughan Ul Haq'},
    {key: '2', value: 'Muhammad Ruhab Qureshi'},
    {key: '3', value: 'Areej Sajid'},
    {key: '4', value: 'Malik Umer Aziz'},
    {key: '5', value: 'Abdullah Faheem'},
  ];

  const navigation = useNavigation();
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
          }}>
          <SelectList
            setSelected={val => setSelectedProject(val)}
            data={ProjectList}
            save="value" // also set save to key.
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
            save="value" // also set save to key.
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
            marginTop: 20,
          }}>
          <View
            style={{
              backgroundColor: '#D9D9D9',
              width: 200,
              height: 50,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                alignSelf: 'center',
                margin: 10,
              }}>
              Supervisor
            </Text>
          </View>
          <Text
            style={{
              backgroundColor: '#D9D9D9',
              width: 100,
              height: 50,
              borderRadius: 10,
              color: 'black',
              marginLeft: 20,
            }}></Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
          }}>
          <View
            style={{
              backgroundColor: '#D9D9D9',
              width: 200,
              height: 50,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                alignSelf: 'center',
                margin: 10,
              }}>
              Web API Demo
            </Text>
          </View>
          <Text
            style={{
              backgroundColor: '#D9D9D9',
              width: 100,
              height: 50,
              borderRadius: 10,
              color: 'black',
              marginLeft: 20,
            }}></Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
          }}>
          <View
            style={{
              backgroundColor: '#D9D9D9',
              width: 200,
              height: 50,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                alignSelf: 'center',
                margin: 10,
              }}>
              Pitching
            </Text>
          </View>
          <TextInput
            style={{
              backgroundColor: '#D9D9D9',
              width: 100,
              height: 50,
              borderRadius: 10,
              color: 'black',
              marginLeft: 20,
            }}></TextInput>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
          }}>
          <View
            style={{
              backgroundColor: '#D9D9D9',
              width: 200,
              height: 50,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                alignSelf: 'center',
                margin: 10,
              }}>
              Documentation
            </Text>
          </View>
          <Text
            style={{
              backgroundColor: '#D9D9D9',
              width: 100,
              height: 50,
              borderRadius: 10,
              color: 'black',
              marginLeft: 20,
            }}></Text>
        </View>

        <Text
          style={{
            color: 'black',
            fontSize: 20,
            marginTop: 20,
            marginLeft: -150,
          }}>
          Cumulative Grade:
        </Text>
        <Text
          style={{
            backgroundColor: '#D9D9D9',
            width: 100,
            height: 50,
            borderRadius: 10,
            color: 'black',
            marginLeft: -200,
          }}></Text>
      </View>
    </View>
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
export default StudentGrades;