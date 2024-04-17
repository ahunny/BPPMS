import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {useNavigation} from '@react-navigation/native';

const AddRemarks = () => {
  const data = [
    {
      id: '1',
      Name: 'Armughan Ul Haq',
      Aridnum: '2020-Arid-3609',
      supervisor: 'Sir Azeem',
      Cgpa: '3.43',
      Platform: 'React-Native',
    },
    {
      id: '2',
      Name: 'Muhammad Ruhab Qureshi',
      Aridnum: '2020-Arid-3722',
      supervisor: 'Sir Azeem',
      Cgpa: '3.01',
      Platform: 'Flutter',
    },
    {
      id: '3',
      Name: 'Areej Sajid',
      Aridnum: '2020-Arid-3606',
      supervisor: 'Sir Azeem',
      Cgpa: '3.43',
      Platform: 'React-JS',
    },
  ];

  const navigation = useNavigation();

  const [TaskRemarks, setremarks] = useState('');

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <ScrollView>
            <TouchableOpacity
              style={[styles.itemContainer, {marginTop: index === 0 ? 50 : 0}]}>
              <View style={styles.itemContent}>
                <View style={styles.column}>
                  <Text style={styles.boldText}>{item.Name}</Text>
                  <Text style={{color: 'black'}}>{item.Aridnum}</Text>
                  <Text style={{color: 'black'}}>
                    {'Supervisor: ' + item.supervisor}
                  </Text>
                </View>
                <View style={styles.column}>
                  <Text style={{color: 'black'}}>{'Cgpa: ' + item.Cgpa}</Text>
                  <Text style={{color: 'black'}}>
                    {'Platform: ' + item.Platform}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        )}
        keyExtractor={item => item.id}
      />

      <Text style={[styles.label]}>Remarks:</Text>
      <TextInput
        style={[styles.input, {height: 180, width: 380, alignSelf: 'center'}]}
        placeholder="Enter Remarks"
        placeholderTextColor={'grey'}
        value={TaskRemarks}
        onChangeText={setremarks}
        multiline
      />
      <TouchableOpacity
        style={{
          marginBottom: 200,
          backgroundColor: '#D9D9D9',
          borderRadius: 40,
          height: 50,
          width: 200,
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
        }}>
        <Text style={styles.buttonText}>Add Remark</Text>
      </TouchableOpacity>
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
  input: {
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#D9D9D9',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },

  buttonText: {
    color: 'black',
    fontSize: 20,
    marginTop: 10,
  },
});

export default AddRemarks;
