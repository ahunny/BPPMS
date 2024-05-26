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
import {useNavigation} from '@react-navigation/native';

const Addmembers = () => {
  const data = [
    {
      id: '1',
      StdName: 'Bilal Ahmed (2020-Arid-3609)',
      supervisor: 'Sir Azeem',
      Platform: 'React-Native',
    },
    {
      id: '2',
      StdName: 'Bilal Ahmed (2020-Arid-3609)',
      supervisor: 'Sir Azeem',
      Platform: 'IOS',
    },
  ];

  const navigation = useNavigation();

  const [TaskRemarks, setremarks] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(
    item =>
      item.StdName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supervisor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Platform.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Name, Platform, Supervisor"
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
        />
        <FlatList
          data={filteredData}
          renderItem={({item, index}) => (
            <ScrollView>
              <TouchableOpacity
                style={[
                  styles.itemContainer,
                  {marginTop: index === 0 ? 20 : 0},
                ]}>
                <View style={styles.itemContent}>
                  <View style={styles.column}>
                    <Text style={styles.boldText}>{item.StdName}</Text>
                    <Text style={{color: 'black', fontWeight: 'bold'}}>
                      {'Platform : ' + item.Platform}
                    </Text>
                    <Text style={{color: 'black'}}>
                      {'Supervisor By : ' + item.supervisor}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    marginBottom: 10,
                    backgroundColor: '#C0C0C0',
                    borderRadius: 40,
                    height: 40,
                    width: 80,
                    alignItems: 'center',
                    alignContent: 'center',
                    marginLeft: 10,
                  }}>
                  <Text style={styles.buttonText}>Add</Text>
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
  searchInput: {
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#D9D9D9',
    margin: 10,
  },
});

export default Addmembers;
