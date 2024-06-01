import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  TextInput,
} from 'react-native';
import API_URL from '../../apiConfig';
import SearchBarComponent from './SearchComponent';

const ReAllocateSupervisor = ({navigation}) => {
  const [projectList, setProjectList] = useState([]);
  const [filteredProjectList, setFilteredProjectList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/Groups/GetProjects?`);
      const data = await response.json();
      console.log(data);
      setProjectList(data);
      setFilteredProjectList(data); // Initialize filtered list with all projects
    } catch (error) {
      ToastAndroid.show('Error fetching Projects', ToastAndroid.SHORT);
      console.error('Error fetching Projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectPress = item => {
    navigation.navigate('SupervisorReAllocationScreen', {projectData: item});
  };

  const handleSearch = text => {
    setSearchQuery(text);
    // Filter project list based on search query
    const filteredProjects = projectList.filter(project =>
      project.project_title.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredProjectList(filteredProjects);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#74A2A8'}}>
      <View
        style={{
          backgroundColor: '#C0C0C0',
          width: '93%',
          height: '100%',
          alignSelf: 'center',
          alignItems: 'center',
          marginTop: 10,
          borderRadius: 20,
        }}>
        <TextInput
          style={{
            height: 40,
            width: '90%',
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 20,
            paddingHorizontal: 10,
            marginVertical: 10,
          }}
          onChangeText={handleSearch}
          value={searchQuery}
          placeholder="Search Group"
        />
        <FlatList
          data={filteredProjectList}
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
              onPress={() => handleProjectPress(item)}>
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
                      {item.project_title}
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

export default ReAllocateSupervisor;
