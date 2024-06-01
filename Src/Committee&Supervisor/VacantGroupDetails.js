import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {useNavigation} from '@react-navigation/native';
import API_URL from '../../apiConfig';

const VacantGroupDetail = props => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [Studentlist, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [availablePlatforms, setAvailablePlatforms] = useState([]);

  const {ProjectData} = props.route.params;
  const projectid = ProjectData.project_id;

  const Technology = [
    {key: '1', value: 'IOS'},
    {key: '2', value: 'React-Native'},
    {key: '3', value: 'WEB'},
    {key: '4', value: 'Android'},
    {key: '5', value: 'Flutter'},
  ];

  useEffect(() => {
    const fetchData = async () => {
      await fetchStudents(projectid);
      await fetchAllStudents();
    };

    fetchData();
  }, [projectid]);

  useEffect(() => {
    if (students.length > 0) {
      filterPlatforms();
    }
  }, [students]);

  const fetchAllStudents = async () => {
    try {
      const response = await fetch(
        `${API_URL}/Student/GetAllUnasignedAndAsignedStudent?projectId=${projectid}`,
      );
      if (response.ok) {
        const data = await response.json();
        const formattedData = data.map(item => ({
          key: item.student_id.toString(),
          value: item.student_name + ' (' + item.arid_no + ')',
        }));

        setStudentList(formattedData);
      } else {
        throw new Error('Failed to fetch student data');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filterPlatforms = () => {
    const assignedPlatforms = students.map(student => student.Platform);
    const filteredPlatforms = Technology.filter(
      platform => !assignedPlatforms.includes(platform.value),
    );
    setAvailablePlatforms(filteredPlatforms);
  };

  const fetchStudents = async projectid => {
    try {
      const response = await fetch(
        `${API_URL}/Groups/GetStudentsbyProjectID?projectid=${projectid}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        throw new Error('Failed to fetch student data');
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const handleAddMember = async () => {
    if (!selectedStudent || !selectedPlatform) {
      ToastAndroid.show(
        'Please select Student and Platform',
        ToastAndroid.SHORT,
      );
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/AssignProject/AddMembertoExistingProject?student_id=${selectedStudent}&project_id=${projectid}&tech=${selectedPlatform}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        ToastAndroid.show('Member Added successfully!', ToastAndroid.SHORT);

        navigation.goBack();
      } else {
        const error = await response.text();
        console.error('Error Adding Member:', error);
        ToastAndroid.show(
          'Error Adding Member. Please try again.',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.error('Error Adding Member:', error);
      ToastAndroid.show(
        'Error Adding Member. Please try again.',
        ToastAndroid.SHORT,
      );
    }
  };

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
          data={students}
          renderItem={({item, index}) => (
            <View
              style={[styles.itemContainer, {marginTop: index === 0 ? 20 : 0}]}>
              <View style={styles.itemContent}>
                <View style={styles.column}>
                  <Text style={styles.boldText}>{item.StudentName}</Text>
                  <Text style={{color: 'black'}}>{item.AridNo}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={{color: 'black'}}>
                    {'Platform: ' + item.Platform}
                  </Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.student_id}
        />
        <View style={styles.selectContainer}>
          <View>
            <Text style={[styles.boldText, {marginLeft: 10}]}>Student</Text>
            <SelectList
              setSelected={val => {
                setSelectedStudent(val);
              }}
              data={Studentlist}
              save="key"
              onSelect={() => {
                console.log(selectedStudent);
              }}
              searchPlaceholder="Search Student"
              dropdownTextStyles={{color: 'black'}}
              boxStyles={styles.selectListStyle}
              placeholder="Select Student"
              inputStyles={styles.selectListInput}
            />
          </View>
          <View>
            <Text style={[styles.boldText, {marginLeft: 10}]}>Platform</Text>
            <SelectList
              setSelected={val => {
                setSelectedPlatform(val);
              }}
              data={availablePlatforms}
              save="value"
              searchPlaceholder="Search Platform"
              dropdownTextStyles={{color: 'black'}}
              boxStyles={[styles.selectListStyle, {width: 100, marginLeft: 5}]}
              placeholder="Select Platform"
              inputStyles={styles.selectListInput}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddMember}>
          <Text style={styles.buttonText}>Add Member</Text>
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
  selectListStyle: {
    backgroundColor: '#E5E5E5',
    borderColor: '#E5E5E5',
    borderRadius: 20,
    width: 200,
    height: 50,
  },

  selectContainer: {
    flexDirection: 'row',
  },
  selectListInput: {color: 'black', fontSize: 18},
  addButton: {
    marginTop: 20,
    marginBottom: 100,
    backgroundColor: 'lightgrey',
    borderRadius: 40,
    height: 40,
    width: 150,
    alignItems: 'center',
    alignContent: 'center',
  },
  itemContainer: {
    elevation: 5,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    marginBottom: 10,
    width: 320,
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
    alignContent: 'center',
  },
  column: {
    flexDirection: 'column',
  },

  buttonText: {
    color: 'black',
    fontSize: 16,
    marginTop: 10,
  },
});

export default VacantGroupDetail;
