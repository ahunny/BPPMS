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

const Tasklist = ({route}) => {
  const {roles} = route.params;
  const {groupid} = route.params;

  console.log(roles);

  const [TaskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `${API_URL}/Tasks/GetTask?groupId=${groupid}&role=${roles}`,
      );
      const data = await response.json();
      setTaskList(data);
      console.log(data);
    } catch (error) {
      ToastAndroid.show('Error fetching Tasks', ToastAndroid.SHORT);
      console.error('Error fetching Tasks:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  useFocusEffect(
    // useCallback prevent unnecessary re-renders caused by creating a newfunction instance on every render.
    useCallback(() => {
      fetchTasks();
    }, []),
  );

  //const {userid} = route.params;

  const handleTaskPress = item => {
    // Navigate to 'uploadtask' screen and pass item data
    navigation.navigate('uploadtask', {taskData: item});
  };

  return (
    <View style={{flex: 1, backgroundColor: '#74A2A8', alignItems: 'center'}}>
      <FlatList
        data={TaskList}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={{
              elevation: 5,
              backgroundColor: 'lightgrey',
              borderRadius: 10,
              width: '100%',
              marginBottom: 10,
              marginTop: index === 0 ? 50 : 0,
            }}
            onPress={() => handleTaskPress(item)}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                padding: 10,
              }}>
              <View style={{flexDirection: 'column'}}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
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
                  style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 25,
                      marginRight: 5,
                    }}
                    source={require('./Assets/icons8-person-50.png')}
                  />
                  <Text
                    style={{textAlign: 'center', color: 'black', fontSize: 16}}>
                    {' '}
                    {item.is_from_supervisor ? 'Supervisor' : 'Committee'}
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
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
                    }}>{`Deadline: ${item.deadline.split('T')[0]}`}</Text>
                  <Image
                    source={require('./Assets/icons8-pending-30.png')} // Provide the local image path
                    style={{
                      width: 20,
                      height: 20,
                      marginLeft: 100,
                      marginTop: -50,
                    }} // Set the width and height of the image
                  />
                  <Text style={{marginLeft: -35, color: 'black'}}>
                    pending{' '}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Tasklist;
