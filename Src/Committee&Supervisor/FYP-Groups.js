import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import API_URL from '../../apiConfig';

const FypGroups = props => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [FilteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const {fyptype} = props.route.params;

  const fetchProjectsWithFyptype = async fyptype => {
    try {
      const response = await fetch(
        `${API_URL}/Groups/GetFyp1Projects?fyptype=${fyptype}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        var details = data;
        console.log('Details', details);
        const formattedData = data.map(item => ({
          key: item.GroupId.toString(), // Extract supervisor ID as string
          value: item.ProjectTitle,
        }));
        setFilteredProjects(data);
      }
    } catch (error) {
      ToastAndroid.show(
        'Error fetching FYP-',
        fyptype,
        'Projects',
        ToastAndroid.SHORT,
      );
      console.error('Error fetching Projects:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await fetchProjectsWithFyptype(fyptype);
    };

    fetchData();
  }, [fyptype]);

  const handleSearch = text => {
    setSearchQuery(text);
    const filtered = FilteredProjects.filter(item =>
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
          data={searchQuery.length > 0 ? filteredData : FilteredProjects}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                elevation: 5,
                backgroundColor: 'lightgrey',
                borderRadius: 10,
                width: 300,
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
                      {item.ProjectTitle}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.GroupId}
        />
      </View>
    </View>
  );
};

export default FypGroups;
