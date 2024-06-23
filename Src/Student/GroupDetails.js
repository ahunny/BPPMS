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
import {useFocusEffect} from '@react-navigation/native';
import API_URL from '../../apiConfig';

const GroupDetail = props => {
  const {userid} = props.route.params;
  const [users, setUsers] = useState([]);
  const [projectTitle, setProjectTitle] = useState('');

  const fetchGroupDetails = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_URL}/Groups/GetGroupDetails?student_id=${userid}`,
      );
      const data = await response.json();

      if (response.ok) {
        setUsers(data.members || []);
        setProjectTitle(data.projectdetail?.project_title || '');
      } else {
        throw new Error(data);
      }
    } catch (error) {
      ToastAndroid.show('Error fetching Group Details', ToastAndroid.SHORT);
      console.error('Error fetching Group Details:', error);
    }
  }, [userid]);

  useFocusEffect(
    useCallback(() => {
      fetchGroupDetails();
    }, [fetchGroupDetails]),
  );

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text
          style={{
            color: 'black',
            marginTop: 7,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {projectTitle}
        </Text>
      </View>
      <FlatList
        data={users}
        renderItem={({item}) => (
          <ScrollView style={{marginTop: 20}}>
            <View style={styles.itemContainer}>
              <View style={styles.itemContent}>
                <View style={styles.column}>
                  <Text style={styles.boldText}>
                    {item.user.student.student_name}
                  </Text>
                  <Text style={{color: 'black'}}>
                    {item.user.student.arid_no}
                  </Text>
                </View>
                <View style={styles.column}>
                  <Text style={{color: 'black'}}>
                    {'CGPA: ' + item.user.student.cgpa}
                  </Text>
                  <Text style={{color: 'black'}}>
                    {'Platform: ' + item.user.platform}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
        keyExtractor={item => item.id.toString()} // Assuming 'id' is unique for each user
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
  title: {
    elevation: 5,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    width: '100%',
    height: 40,
    marginTop: 20,
    alignItems: 'center',
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
});

export default GroupDetail;
