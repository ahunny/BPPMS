import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {useNavigation} from '@react-navigation/native';
import API_URL from '../../apiConfig';

const SupMeetDetails = ({route}) => {
  const [students, setStudents] = useState([]);
  const [supervisor, setSupervisor] = useState([]);

  const {MeetDetails} = route.params;
  console.log(MeetDetails);
  var groupid = MeetDetails.group_id;
  console.log(groupid);
  const {userid} = route.params;
  console.log(userid);
  const fetchStudents = async groupid => {
    try {
      const response = await fetch(
        `${API_URL}/AssignProject/GetGroupdetailsByProject?group_id=${groupid}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        const students = data.members.map(member => ({
          student_name: member.user.student.student_name,
          arid_no: member.user.student.arid_no,
          cgpa: member.user.student.cgpa,
          platform: member.user.platform,
        }));
        const supervisor = data.supervisors[0];
        setStudents(students);
        setSupervisor(supervisor);
        console.log(students);
        console.log(supervisor);
      } else {
        throw new Error('Failed to fetch student data');
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchStudents(groupid);
    };

    fetchData();
  }, [groupid]);

  const handleSetGradePress = item => {
    // Navigate to 'uploadtask' screen and pass item data
    navigation.navigate('SetMeetGrades', {
      MeetDetail: MeetDetails,
      userid: userid,
    });
  };
  const handleAddCommentPress = item => {
    // Navigate to 'uploadtask' screen and pass item data
    navigation.navigate('Addremarks', {
      MeetDetail: MeetDetails,
      userid: userid,
    });
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
            <TouchableOpacity
              style={[styles.itemContainer, {marginTop: index === 0 ? 20 : 0}]}>
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
          )}
          keyExtractor={item => item.id}
        />

        {/* <TouchableOpacity style={[styles.itemContainer]}>
          <View style={styles.itemContent}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'black',
              }}>
              Supervisor: {supervisor.SupervisorName}
            </Text>
          </View>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          style={{
            marginBottom: 20,
            backgroundColor: '#D9D9D9',
            padding: 8,
            borderRadius: 40,
            height: 60,
            width: 300,
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
          }}
          onPress={() => handleSetGradePress(MeetDetails)}>
          <Text style={styles.buttonText}>SetGrade</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={{
            marginBottom: 300,
            backgroundColor: '#D9D9D9',
            padding: 8,
            borderRadius: 40,
            height: 60,
            width: 300,
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
          }}
          onPress={() => handleAddCommentPress(supervisor)}>
          <Text style={styles.buttonText}>Add Comment</Text>
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
  },
  column: {
    flexDirection: 'column',
  },

  buttonText: {
    color: 'black',
    fontSize: 20,
    marginTop: 10,
  },
});

export default SupMeetDetails;
