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
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');

  const StudentList = [
    {key: '1', value: 'Manufactring'},
    {key: '2', value: 'Packing'},
    {key: '3', value: 'Management'},
    {key: '4', value: 'Shipping'},
    {key: '5', value: 'Marketing'},
  ];

  const PlatformList = [
    {key: '1', value: 'Manufactring'},
    {key: '2', value: 'Packing'},
    {key: '3', value: 'Management'},
    {key: '4', value: 'Shipping'},
    {key: '5', value: 'Marketing'},
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
            <SelectList
              setSelected={val => setSelectedPlatform(val)}
              data={PlatformList}
              save="value" // also set save to key.
              onSelect={() => {
                console.warn(selectedPlatform);
              }}
              searchPlaceholder="Platform"
              dropdownTextStyles={{color: 'black'}}
              boxStyles={styles.platFormSelect}
              placeholder="Platform"
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
            <SelectList
              setSelected={val => setSelectedPlatform(val)}
              data={PlatformList}
              save="value" // also set save to key.
              onSelect={() => {
                console.warn(selectedPlatform);
              }}
              searchPlaceholder="Platform"
              dropdownTextStyles={{color: 'black'}}
              boxStyles={styles.platFormSelect}
              placeholder="Platform"
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
            <SelectList
              setSelected={val => setSelectedPlatform(val)}
              data={PlatformList}
              save="value" // also set save to key.
              onSelect={() => {
                console.warn(selectedPlatform);
              }}
              searchPlaceholder="Platform"
              dropdownTextStyles={{color: 'black'}}
              boxStyles={styles.platFormSelect}
              placeholder="Platform"
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
            <SelectList
              setSelected={val => setSelectedPlatform(val)}
              data={PlatformList}
              save="value" // also set save to key.
              onSelect={() => {
                console.warn(selectedPlatform);
              }}
              searchPlaceholder="Platform"
              dropdownTextStyles={{color: 'black'}}
              boxStyles={styles.platFormSelect}
              placeholder="Platform"
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
              setSelected={val => setSelectedSection(val)}
              data={StudentList}
              save="value" // also set save to key.
              onSelect={() => {
                console.warn(selectedSection);
              }}
              searchPlaceholder="Search Student"
              dropdownTextStyles={{color: 'black'}}
              boxStyles={styles.selectListStyle}
              placeholder="Select Student"
              inputStyles={styles.selectListInput}
            />
            <SelectList
              setSelected={val => setSelectedPlatform(val)}
              data={PlatformList}
              save="value" // also set save to key.
              onSelect={() => {
                console.warn(selectedPlatform);
              }}
              searchPlaceholder="Platform"
              dropdownTextStyles={{color: 'black'}}
              boxStyles={styles.platFormSelect}
              placeholder="Platform"
              inputStyles={styles.selectListInput}
            />
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
