import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';

const ProjectAllocation = () => {
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [selectedproject, setSelectedproject] = useState('');

  const ProjectList = [
    {key: '1', value: 'BIIT PROJECT PROGRESS MONITORING SYSTEM'},
    {key: '2', value: 'SECRET MESSAGE'},
    {key: '3', value: 'ADVENTURE PLANNER'},
    {key: '4', value: 'LOST CHILD '},
    {key: '5', value: 'HAKEEM HIKMAT APP'},
  ];

  const SupervisorList = [
    {key: '1', value: 'Sir Azeem'},
    {key: '2', value: 'Sir Umer'},
    {key: '3', value: 'Sir Hassan'},
    {key: '4', value: 'Sir Shahid'},
    {key: '5', value: 'Sir Zahid'},
    {key: '6', value: 'Sir Ahsan'},
  ];

  const data = [
    {
      id: '1',
      Name: 'Armughan Ul Haq',
      Aridnum: '2020-Arid-3609',
      Cgpa: '3.43',
      Platform: 'React-Native',
    },
    {
      id: '2',
      Name: 'Muhammad Ruhab Qureshi',
      Aridnum: '2020-Arid-3722',
      Cgpa: '3.01',
      Platform: 'Flutter',
    },
    {
      id: '3',
      Name: 'Areej Sajid',
      Aridnum: '2020-Arid-3606',
      Cgpa: '3.43',
      Platform: 'React-JS',
    },
    {
      id: '4',
      Name: 'Malik Umer Aziz',
      Aridnum: '2020-Arid-3666',
      Cgpa: '3.06',
      Platform: 'IOS',
    },
    {
      id: '5',
      Name: 'Abdullah Faheem',
      Aridnum: '2020-Arid-3588',
      Cgpa: '3.43',
      Platform: 'Android',
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#74A2A8',
      }}>
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
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={[styles.itemContainer, {marginTop: index === 0 ? 50 : 0}]}>
              <View style={styles.itemContent}>
                <View style={styles.column}>
                  <Text style={styles.boldText}>{item.Name}</Text>
                  <Text style={{color: 'black'}}>{item.Aridnum}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={{color: 'black'}}>{'Cgpa: ' + item.Cgpa}</Text>
                  <Text style={{color: 'black'}}>
                    {'Platform: ' + item.Platform}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />

        <View style={[styles.selectContainer]}>
          <Text style={[styles.boldText, {marginLeft: 40}]}>
            Select FYP Project
          </Text>
          <SelectList
            setSelected={val => setSelectedproject(val)}
            data={ProjectList}
            save="value"
            onSelect={() => {
              console.warn(selectedproject);
            }}
            searchPlaceholder="Search Project"
            dropdownTextStyles={{color: 'black'}}
            boxStyles={styles.selectListStyle}
            placeholder="Select Project"
            inputStyles={styles.selectListInput}
          />
        </View>
        <View style={[styles.selectContainer]}>
          <Text style={[styles.boldText, {marginLeft: 40}]}>
            Assign Supervisor
          </Text>
          <SelectList
            setSelected={val => setSelectedSupervisor(val)}
            data={SupervisorList}
            save="value"
            onSelect={() => {
              console.warn(selectedSupervisor);
            }}
            searchPlaceholder="Search Supervisor"
            dropdownTextStyles={{color: 'black'}}
            boxStyles={styles.selectListStyle}
            placeholder="Select Supervisor"
            inputStyles={styles.selectListInput}
          />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>ASSIGN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#74A2A8',
    paddingHorizontal: 20,
  },
  itemContainer: {
    elevation: 5,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  selectContainer: {
    marginTop: 10,
    width: '60%',
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  boldText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  column: {
    flexDirection: 'column',
  },

  selectListStyle: {
    backgroundColor: '#E5E5E5',
    borderColor: '#E5E5E5',
    borderRadius: 20,
    width: 320,
    height: 50,
    alignSelf: 'center',
  },
  selectListInput: {color: 'black', fontSize: 18},
  button: {
    backgroundColor: '#D9D9D9',
    padding: 8,
    borderRadius: 40,
    height: 40,
    width: 130,
    alignItems: 'center',

    marginTop: 50,
    marginBottom: 50,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default ProjectAllocation;
