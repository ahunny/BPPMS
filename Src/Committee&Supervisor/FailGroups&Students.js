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

const FailGroups = () => {
  const data = [
    {
      id: '1',
      ProjectName: 'ProjectName',
      StdName: 'Bilal Ahmed (2020-Arid-3609)',
      supervisor: 'Sir Azeem',
      Platform: 'React-Native',
    },
    {
      id: '2',
      ProjectName: 'ProjectName',
      StdName: 'Bilal Ahmed (2020-Arid-3609)',
      supervisor: 'Sir Azeem',
      Platform: 'IOS',
    },
  ];

  const navigation = useNavigation();

  const [TaskRemarks, setremarks] = useState('');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#74A2A8',
      }}>
      <View
        style={{
          backgroundColor: '#C0C0C0',
          width: '97%',
          height: '97%',
          alignSelf: 'center',
          marginTop: 10,
          borderRadius: 20,
        }}>
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <ScrollView>
              <TouchableOpacity
                style={[
                  styles.itemContainer,
                  {marginTop: index === 0 ? 20 : 0},
                ]}>
                <View style={styles.itemContent}>
                  <View style={styles.column}>
                    <Text style={styles.boldText}>{item.ProjectName}</Text>

                    <Text style={{color: 'black'}}>
                      {'Supervisor By : ' + item.supervisor}
                    </Text>
                    <Text style={{color: 'black', fontWeight: 'bold'}}>
                      {'Failed Members:'}
                    </Text>
                    <FlatList
                      data={data}
                      renderItem={({item, index}) => (
                        <ScrollView>
                          <TouchableOpacity
                            style={[
                              styles.itemContainer2,
                              {marginTop: index === 0 ? 20 : 0},
                            ]}>
                            <View style={styles.itemContent}>
                              <View style={{flexDirection: 'row'}}>
                                <Text style={{color: 'black'}}>
                                  {item.StdName}
                                </Text>
                                <Text style={{color: 'black', marginLeft: 20}}>
                                  {item.Platform}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </ScrollView>
                      )}
                      keyExtractor={item => item.id}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={{
                    marginBottom: 10,
                    backgroundColor: '#C0C0C0',
                    borderRadius: 40,
                    height: 40,
                    width: 120,
                    alignItems: 'center',
                    alignContent: 'center',
                    marginLeft: 20,
                  }}>
                  <Text style={styles.buttonText}>Re-Allocate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginBottom: 10,
                    backgroundColor: '#C0C0C0',
                    borderRadius: 40,
                    height: 40,
                    width: 120,
                    alignItems: 'center',
                    alignContent: 'center',
                    marginLeft: 20,
                  }}>
                  <Text style={styles.buttonText}>Add Member</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </ScrollView>
          )}
          keyExtractor={item => item.id}
        />
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
    width: '95%',
    marginLeft: 9,
  },
  itemContainer2: {
    elevation: 5,
    backgroundColor: '#C0C0C0',
    borderRadius: 10,
    marginBottom: 10,
    width: 310,
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
    fontSize: 15,
    marginTop: 10,
  },
});

export default FailGroups;
