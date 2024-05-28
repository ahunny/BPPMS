import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Addmembers = props => {
  const groupsList = props.route.params.groupsList;
  const selectedGroup = props.route.params.selectedGroup;
  const [updatedGroup, setUpdatedGroup] = useState(selectedGroup);
  const [studentsToAdd, setStudentsToAdd] = useState(() =>
    groupsList.reduce((acc, item) => {
      if (
        item.ProjectName !== selectedGroup.ProjectName &&
        item.Fyp_Type === selectedGroup.Fyp_Type
      ) {
        item.Students.forEach(student => {
          if (
            !selectedGroup.Students.some(s => s.Platform === student.Platform)
          ) {
            acc.push(student);
          }
        });
      }
      return acc;
    }, []),
  );

  const navigation = useNavigation();

  const [searchTerm, setSearchTerm] = useState('');

  const addNewMember = newMember => {
    const platformExists = updatedGroup.Students.some(
      student => student.Platform === newMember.Platform,
    );

    if (platformExists) {
      Alert.alert(
        'Error',
        'A student with this platform already exists in the group.',
      );
      return;
    }

    if (updatedGroup.Students.length >= 5) {
      Alert.alert('Error', 'You cannot add more than 5 students to the group.');
      return;
    }

    setUpdatedGroup(prevGroup => ({
      ...prevGroup,
      Students: [...prevGroup.Students, newMember],
    }));

    setStudentsToAdd(prevStudents =>
      prevStudents.filter(student => student.Platform !== newMember.Platform),
    );
  };

  const filteredData = studentsToAdd.filter(
    item =>
      item.StudentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.AridNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Name, Platform, Supervisor"
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
        />
        <FlatList
          data={filteredData}
          renderItem={({item, index}) => (
            <View
              style={[styles.itemContainer, {marginTop: index === 0 ? 20 : 0}]}>
              <View style={styles.itemContent}>
                <View style={styles.column}>
                  <Text style={styles.boldText}>
                    {'Name : ' +
                      item.StudentName +
                      ' (' +
                      item.AridNumber +
                      ') '}
                  </Text>
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    {'Platform : ' + item.Platform}
                  </Text>
                </View>
              </View>
              <View style={styles.buttonWrapper}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addNewMember(item)}>
                  <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          //console.log(updatedGroup);
          navigation.navigate('ProjectReAllocation', {
            updatedGroup: updatedGroup,
          });
        }}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
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
    height: '90%', // Reduced height to accommodate floating button
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
    justifyContent: 'center',
  },
  addButton: {
    marginBottom: 10,
    backgroundColor: '#C0C0C0',
    borderRadius: 40,
    height: 40,
    width: 100,
    alignItems: 'center',
    alignContent: 'center',
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

export default Addmembers;
