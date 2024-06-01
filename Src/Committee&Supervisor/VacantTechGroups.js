import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  Alert,
  ToastAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import API_URL from '../../apiConfig';
import SearchBarComponent from './SearchComponent';

const VacantTechGroups = props => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ProjectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const data = {};

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/Groups/GetProjects?`);
      const data = await response.json();

      setProjectList(data);
      console.log(data);
    } catch (error) {
      ToastAndroid.show('Error fetching Projects', ToastAndroid.SHORT);
      console.error('Error fetching Projects:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  const handleSearch = text => {
    fetchSearchedProject(text);
  };

  const fetchSearchedProject = async text => {
    try {
      const response = await fetch(
        `${API_URL}/AssignProject/GetVacantProject?tech=${text}`,
      );
      const data = await response.json();
      console.log('sad', data);
      setProjectList(data);
      console.log(data);
    } catch (error) {
      ToastAndroid.show('Error fetching Projects', ToastAndroid.SHORT);
      console.error('Error fetching Projects:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  const navigation = useNavigation();
  const handleAddMember = item => {
    // Navigate to 'uploadtask' screen and pass item data
    navigation.navigate('vacantgroupsdetails', {ProjectData: item});
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <SearchBarComponent
          onSearch={handleSearch}
          placeHolder="Search Group"
        />
        <FlatList
          data={ProjectList}
          renderItem={({item, index}) => (
            <View
              style={[styles.itemContainer, {marginTop: index === 0 ? 20 : 0}]}>
              <View style={styles.itemContent}>
                <View style={styles.column}>
                  <Text style={styles.boldText}>{item.project_title}</Text>
                </View>
              </View>
              <View style={styles.buttonWrapper}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => {
                    handleAddMember(item);
                  }}>
                  <Text style={styles.buttonText}>Add Member</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  },
  innerContainer: {
    backgroundColor: '#C0C0C0',
    width: '97%',
    height: '100%', // Reduced height to accommodate floating button
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 20,
  },
  itemContainer: {
    elevation: 5,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    marginBottom: 10,
    width: '95%',
    marginLeft: 9,
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
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  addButton: {
    marginBottom: 10,
    backgroundColor: '#C0C0C0',
    borderRadius: 40,
    height: 40,
    width: 100,
    alignItems: 'center',
    alignContent: 'left',
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
  floatingButton: {
    backgroundColor: 'lightgrey',
    borderRadius: 40,
    height: 40,
    width: 100,
    alignItems: 'center',
    alignContent: 'center',
    elevation: 5,
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
});

export default VacantTechGroups;
