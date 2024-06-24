import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {TextInput} from 'react-native-paper'; // Import for Search Input
import {useFocusEffect} from '@react-navigation/native';
import API_URL from '../../apiConfig';

const DropStudent = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [filteredStudentList, setFilteredStudentList] = useState([]); // State for filtered students
  const [searchText, setSearchText] = useState(''); // State for search term

  const fetchDroppedStudents = async () => {
    try {
      const response = await fetch(`${API_URL}/DataCell/GetDroppedStudents`);
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

  const handleEnroll = async student => {
    const enroll = true;
    const data = {
      student_id: student.student_id,
      status: enroll,
    };

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/DataCell/EnrollStudent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setLoading(false);
        ToastAndroid.show(
          errorData?.message || 'Failed to enroll student',
          ToastAndroid.SHORT,
        );
        return;
      }

      const responseData = await response.json();
      ToastAndroid.show('Enrolled Successfully', ToastAndroid.SHORT);
      setLoading(false);
      fetchDroppedStudents(); // Refresh the list after enrollment
    } catch (error) {
      setLoading(false);
      console.error('Failed to enroll student:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDroppedStudents();
    }, []),
  );

  return (
    <View style={styles.container}>
      <TextInput
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
                  <Text style={styles.boldText}>
                    {item.student_name + ' (' + item.arid_no + ') '}
                  </Text>
                  <Text style={{color: 'black'}}>{'Cgpa: ' + item.cgpa}</Text>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleEnroll(item)}>
                  <Text style={styles.buttonText}>Enroll</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </ScrollView>
        )}
        keyExtractor={item => item.student_id} // Ensure key is string
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          fetchDroppedStudents();
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
  button: {
    backgroundColor: '#D9D9D9',
    padding: 8,
    borderRadius: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default DropStudent;
