import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import API_URL from '../../apiConfig';

const MarkAttendance = ({route}) => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [supervisor, setSupervisor] = useState(null);

  const {MeetDetail} = route.params;
  const groupid = MeetDetail.group_id;

  console.log(MeetDetail);

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
          id: member.member_id,
          student_name: member.user.student.student_name,
          arid_no: member.user.student.arid_no,
          cgpa: member.user.student.cgpa,
          platform: member.user.platform,
        }));
        const supervisor = data.supervisors[0];
        setStudents(students);
        setSupervisor(supervisor);

        // Initialize attendance state
        const initialAttendance = students.map(student => ({
          meeting_id: MeetDetail.meeting_id,
          student_id: student.id,
          attendance1: 'a', // All students initially marked as absent
        }));
        setAttendance(initialAttendance);
      } else {
        throw new Error('Failed to fetch student data');
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  useEffect(() => {
    fetchStudents(groupid);
  }, [groupid]);

  const handleAttendanceToggle = studentId => {
    setAttendance(prevState =>
      prevState.map(att =>
        att.student_id === studentId
          ? {...att, attendance1: att.attendance1 === 'p' ? 'a' : 'p'}
          : att,
      ),
    );
  };

  const handleMarkAttendancePress = async () => {
    try {
      const attendanceData = {
        attendanceList: attendance,
      };

      console.log(attendanceData);

      const response = await fetch(`${API_URL}/FinalTask/MarkAttendance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendanceData.attendanceList),
      });

      if (response.ok) {
        ToastAndroid.show('Attendance marked successfully', ToastAndroid.SHORT);

        // Navigate back or show success message
      } else {
        ToastAndroid.show('Failed to mark attendance', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList
          data={students}
          renderItem={({item, index}) => (
            <View
              style={[styles.itemContainer, {marginTop: index === 0 ? 20 : 0}]}
              key={item.id}>
              <View style={styles.itemContent}>
                <View style={styles.column}>
                  <Text style={styles.boldText}>{item.student_name}</Text>
                  <Text style={styles.text}>{item.arid_no}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.text}>{'Cgpa: ' + item.cgpa}</Text>
                  <Text style={styles.text}>
                    {'Platform: ' + item.platform}
                  </Text>
                </View>
                <CheckBox
                  value={
                    attendance.find(att => att.student_id === item.id)
                      ?.attendance1 === 'p'
                  }
                  onValueChange={() => handleAttendanceToggle(item.id)}
                />
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
        <TouchableOpacity
          style={styles.markButton}
          onPress={handleMarkAttendancePress}>
          <Text style={styles.markButtonText}>Mark Attendance</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#74A2A8',
  },
  content: {
    backgroundColor: '#C0C0C0',
    width: '93%',
    height: '97%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 20,
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
    alignItems: 'center',
    padding: 10,
  },
  boldText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  text: {
    color: 'black',
  },
  column: {
    flexDirection: 'column',
  },
  markButton: {
    marginBottom: 100,
    backgroundColor: '#D9D9D9',
    padding: 8,
    borderRadius: 40,
    height: 60,
    width: 300,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  markButtonText: {
    color: 'black',
    fontSize: 20,
    marginTop: 10,
  },
});

export default MarkAttendance;
