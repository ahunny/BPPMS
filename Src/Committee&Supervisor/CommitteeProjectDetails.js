import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {useNavigation} from '@react-navigation/native';

const CommitteeProjectDetails = () => {
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

  const navigation = useNavigation();

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
              style={[styles.itemContainer, {marginTop: index === 0 ? 20 : 0}]}>
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

        <TouchableOpacity
          style={{
            marginBottom: 20,
            backgroundColor: '#D9D9D9',
            padding: 8,
            borderRadius: 40,
            height: 60,
            width: 330,
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
          }}
          onPress={() => navigation.navigate('Addtask')}>
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginBottom: 200,
            backgroundColor: '#D9D9D9',
            padding: 8,
            borderRadius: 40,
            height: 60,
            width: 330,
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
          }}
          onPress={() => navigation.navigate('Uploaded Tasks')}>
          <Text style={styles.buttonText}>View Task</Text>
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

  buttonText: {
    color: 'black',
    fontSize: 20,
    marginTop: 10,
  },
});

export default CommitteeProjectDetails;
