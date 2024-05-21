import {useFocusEffect} from '@react-navigation/native';
import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  ScrollView,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper'; // Import for Search Input
import API_URL from '../../apiConfig';

const RestrictedStudent = props => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [filteredStudentList, setFilteredStudentList] = useState([]); // State for filtered students
  const [searchText, setSearchText] = useState(''); // State for search term

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${API_URL}/Student/GetAllStudent?`);
      const data = await response.json();
      setStudentList(data);
      setFilteredStudentList(data); // Set initial filtered list to all students
    } catch (error) {
      ToastAndroid.show('Error fetching Students', ToastAndroid.SHORT);
      console.error('Error fetching Students:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleSearch = text => {
    setSearchText(text);
    if (!text) {
      setFilteredStudentList(studentList); // Reset filtered list if search is empty
      return;
    }
    const filteredData = studentList.filter(
      item =>
        item.student_name.toLowerCase().includes(text.toLowerCase()) ||
        item.arid_no.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredStudentList(filteredData);
  };

  useFocusEffect(
    useCallback(() => {
      fetchStudents();
    }, []),
  );

  return (
    <View style={styles.container}>
      <TextInput // Search Input
        label="Search Students"
        value={searchText}
        onChangeText={handleSearch}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredStudentList}
        renderItem={({item}) => (
          <ScrollView style={{marginTop: 20}}>
            <TouchableOpacity style={styles.itemContainer}>
              <View style={styles.itemContent}>
                <View style={styles.column}>
                  <Text style={styles.boldText}>{item.student_name}</Text>
                  <Text style={{color: 'black'}}>{item.arid_no}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={{color: 'black'}}>{'Cgpa: ' + item.cgpa}</Text>
                  <Text style={{color: 'black'}}>
                    {'Platform: ' + item.platform}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        )}
        keyExtractor={item => item.id}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          fetchStudents();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#74A2A8',
    paddingHorizontal: 20,
  },
  searchInput: {
    marginTop: 10,
    marginBottom: 10,
  },
  itemContainer: {
    elevation: 5,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    width: '100%',
  },
  selectContainer: {
    marginTop: 10,
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
    width: 220,
    height: 50,
  },
  selectListInput: {color: 'black', fontSize: 18},
  button: {
    backgroundColor: '#D9D9D9',
    padding: 8,
    borderRadius: 40,
    height: 40,
    width: 130,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 50,
    marginBottom: 50,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default RestrictedStudent;
