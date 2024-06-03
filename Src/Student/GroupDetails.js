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
import {SelectList} from 'react-native-dropdown-select-list';
import API_URL from '../../apiConfig';

const GroupDetail = props => {
  const userid = props.route.params;
  const user_id = userid;
  console.log(user_id);
  const [users, setUsers] = useState([]);

  const fetchGroupDetails = async () => {
    try {
      const response = await fetch(
        `${API_URL}/Groups/GetGroupDetails?student_id=${userid}`,
      );
      const data = await response.json();

      if (response.ok) {
        const members = data.members || [];
        const userList = members.map(member => member.user);
        setUsers(userList);
      } else {
        throw new Error(data);
      }
    } catch (error) {
      ToastAndroid.show('Error fetching Group Details', ToastAndroid.SHORT);
      console.error('Error fetching Group Details:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchGroupDetails();
    }, []),
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({item}) => (
          <ScrollView style={{marginTop: 20}}>
            <TouchableOpacity style={styles.itemContainer}>
              <View style={styles.itemContent}>
                <View style={styles.column}>
                  <Text style={styles.boldText}>
                    {item.student.student_name}
                  </Text>
                  <Text style={{color: 'black'}}>{item.student.arid_no}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={{color: 'black'}}>
                    {'Cgpa: ' + item.student.cgpa}
                  </Text>
                  <Text style={{color: 'black'}}>
                    {'Platform: ' + item.platform}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        )}
        keyExtractor={item => item.id} // Assuming 'id' is unique for each user
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
    width: 140,
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

export default GroupDetail;
