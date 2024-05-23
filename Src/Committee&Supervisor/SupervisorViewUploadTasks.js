import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
  ToastAndroid,
} from 'react-native';
import API_URL from '../../apiConfig';

const SupervisorViewUploadedTasks = ({route}) => {
  const {Groupdata} = route.params;
  groupid = Groupdata.GroupId;
  console.log('GroupID:', groupid);

  const [TaskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `${API_URL}/Tasks/GetTask?groupId=${groupid}&role=Supervisor`,
      );
      const data = await response.json();
      duedate = data.deadline;
      console.log(duedate);
      setTaskList(data);
      console.log(TaskList);
    } catch (error) {
      ToastAndroid.show('Error fetching Tasks', ToastAndroid.SHORT);
      console.error('Error fetching Tasks:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  const handleViewTaskPress = item => {
    // Navigate to 'uploadtask' screen and pass item data
    navigation.navigate('View Task', {Taskdata: item});
  };
  useFocusEffect(
    // useCallback prevent unnecessary re-renders caused by creating a newfunction instance on every render.
    useCallback(() => {
      fetchTasks();
    }, []),
  );

  return (
    <View style={{flex: 1, backgroundColor: '#74A2A8'}}>
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
          data={TaskList}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                elevation: 5,
                backgroundColor: 'lightgrey',
                borderRadius: 10,
                width: 320,
                marginBottom: 10,
                marginTop: index === 0 ? 20 : 0,
              }}
              onPress={() => handleViewTaskPress(item)}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  padding: 10,
                }}>
                <View style={{flexDirection: 'column', width: 200}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: 'black',
                        fontSize: 16,
                      }}>
                      {item.task_description}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 25,
                        marginRight: 5,
                      }}
                      source={require('./Assets/icons8-clock-50.png')}
                    />
                    <Text
                      style={{
                        textAlign: 'center',
                        color: 'black',
                        fontSize: 16,
                      }}>{`Due Date: ${item.deadline
                      .toString()
                      .substring(0, 10)}`}</Text>

                    <Text
                      style={{
                        marginLeft: 60,
                        marginBottom: 20,
                        color: 'black',
                      }}>
                      {item.task_status}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default SupervisorViewUploadedTasks;
