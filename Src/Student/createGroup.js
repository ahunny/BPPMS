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
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {SelectList} from 'react-native-dropdown-select-list';

const Creategroup = () => {
  const [IosStudent, setIosStudent] = useState('');
  const [FlutterStudent, setFlutterStudent] = useState('');
  const [ReactNativeStudent, setReactNativeStudent] = useState('');
  const [AndroidStudent, setAndroidStudent] = useState('');
  const [WebStudent, setWebStudent] = useState('');

  const StudentList = [
    {key: '1', value: 'Armughan Ul Haq'},
    {key: '2', value: 'Muhammad Ruhab Qureshi'},
    {key: '3', value: 'Areej Sajid'},
    {key: '4', value: 'Malik Umer Aziz'},
    {key: '5', value: 'Abdullah Faheem'},
  ];

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
              setSelected={val => setIosStudent(val)}
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
              setSelected={val => setFlutterStudent(val)}
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
              setSelected={val => setReactNativeStudent(val)}
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
              setSelected={val => setAndroidStudent(val)}
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
              setSelected={val => setWebStudent(val)}
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
          <TouchableOpacity style={styles.Button}>
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
