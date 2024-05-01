import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FypGroups = props => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const data = [
    {
      id: '1',
      Project: 'BIIT PROJECT PROGRESS MONITORING',
      Supervisor: 'Sir Azeem',
    },
    {
      id: '2',
      Project: 'KIDS ALPHABET Tutor',
      Supervisor: 'Sir Azeem',
    },
    {
      id: '3',
      Project: 'BUS PASS QR SCAN',
      Supervisor: 'Sir Azeem',
    },
    {
      id: '4',
      Project: 'ADVENTURE PLANNER',
      Supervisor: 'Sir Azeem',
    },
    {
      id: '5',
      Project: 'SECRET MESSAGE',
      Supervisor: 'Sir Azeem',
    },
    {
      id: '6',
      Project: 'KIDS ALPHABET Tutor',
      Supervisor: 'Sir Azeem',
    },
    {
      id: '7',
      Project: 'BUS PASS QR SCAN',
      Supervisor: 'Sir Azeem',
    },
    {
      id: '8',
      Project: 'ADVENTURE PLANNER',
      Supervisor: 'Sir Azeem',
    },
    {
      id: '9',
      Project: 'SECRET MESSAGE',
      Supervisor: 'Sir Azeem',
    },
    {
      id: '10',
      Project: 'ADVENTURE PLANNER',
      Supervisor: 'Sir Azeem',
    },
    {
      id: '11',
      Project: 'SECRET MESSAGE',
      Supervisor: 'Sir Azeem',
    },
  ];

  const handleSearch = text => {
    setSearchQuery(text);
    const filtered = data.filter(item =>
      item.Project.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#74A2A8'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 10,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 10,
          backgroundColor: 'lightgrey',
          padding: 5,
        }}>
        <Icon name="search" size={20} color="black" style={{marginRight: 5}} />
        <TextInput
          style={{flex: 1, height: 40}}
          placeholder="Search Projects"
          placeholderTextColor="gray"
          color="black"
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>
      <View
        style={{
          backgroundColor: '#C0C0C0',
          width: '93%',
          height: '88%',
          alignSelf: 'center',
          alignItems: 'center',
          marginTop: 10,
          borderRadius: 20,
        }}>
        <FlatList
          data={searchQuery.length > 0 ? filteredData : data}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                elevation: 5,
                backgroundColor: 'lightgrey',
                borderRadius: 10,
                width: 360,
                marginBottom: 10,
                marginTop: index === 0 ? 20 : 0,
              }}
              onPress={() =>
                props.navigation.navigate('CommitteeProjectDetails')
              }>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  padding: 10,
                }}>
                <View style={{flexDirection: 'column'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: 'black',
                        fontSize: 16,
                      }}>
                      {item.Project}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: 'black',
                        fontSize: 16,
                      }}>
                      {' '}
                      {`Supervisor: ${item.Supervisor}`}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default FypGroups;
