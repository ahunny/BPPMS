import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {useNavigation} from '@react-navigation/native';
import API_URL from '../../apiConfig';

const ViewTaskComments = ({route}) => {
  const [Comments, setComments] = useState([]);
  const [supervisor, setSupervisor] = useState([]);

  const {Data} = route.params;
  groupid = Data.GroupId;
  console.log('details', Data);
  console.log('id', groupid);

  const fetchComments = async groupid => {
    try {
      const response = await fetch(
        `${API_URL}/Remarks/GetCommitteeTaskRemarks?groupid=${groupid}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        const data = await response.json();

        setComments(data);
        console.log(data);
      } else {
        throw new Error('Failed to fetch student data');
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchComments(groupid);
    };

    fetchData();
  }, [groupid]);

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
          data={Comments}
          renderItem={({item, index}) => (
            <View
              style={[styles.itemContainer, {marginTop: index === 0 ? 20 : 0}]}>
              <View style={styles.itemContent}>
                <View style={styles.column}>
                  <Text style={styles.boldText}>
                    {item.student_name + ' (' + item.arid_no + ')'}
                  </Text>
                  <Text style={{color: 'black'}}>
                    {'Task Description: ' + item.task_description}
                  </Text>
                  <Text style={{color: 'black'}}>
                    {'Comment: ' + item.comment}
                  </Text>
                  <Text style={{color: 'black'}}>
                    {'Date: ' +
                      new Date(item.date_of_comment).toLocaleDateString()}
                  </Text>
                  {/* <Text style={styles.text}>
                    {item.is_with_supervisor ? '' : 'Commented by Supervisor'}
                  </Text> */}
                  {/* <Text style={{color: 'black'}}>
                    {'Public: ' + (item.ispublic ? 'Yes' : 'No')}
                  </Text> */}
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.comment_id.toString()}
        />
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

export default ViewTaskComments;
