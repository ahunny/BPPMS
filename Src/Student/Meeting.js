import {useFocusEffect} from '@react-navigation/native';
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

const StudentMeeting = ({route}) => {
  const {roles} = route.params;
  const {groupid} = route.params;

  const [MeetingList, setMeetingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMeetings = async () => {
    try {
      const response = await fetch(
        `${API_URL}/Meeting/GetMeetings?groupId=${groupid}&isForStudent=true`,
      );
      const data = await response.json();
      setMeetingList(data);
      console.log(data);
    } catch (error) {
      ToastAndroid.show('Error fetching Students', ToastAndroid.SHORT);
      console.error('Error fetching Students:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  useFocusEffect(
    // useCallback prevent unnecessary re-renders caused by creating a newfunction instance on every render.
    useCallback(() => {
      fetchMeetings();
    }, []),
  );

  return (
    <View style={{flex: 1, backgroundColor: '#74A2A8', alignItems: 'center'}}>
      <FlatList
        data={MeetingList}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={{
              elevation: 5,
              backgroundColor: 'lightgrey',
              borderRadius: 10,
              width: '100%',
              marginBottom: 10,
              marginTop: index === 0 ? 50 : 0,
            }}>
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
                    {item.is_with_supervisor ? 'Supervisor' : 'Committee'}
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: 5,
                    }}
                    source={require('./Assets/icons8-clock-50.png')}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'black',
                      fontSize: 16,
                    }}>{`${item.meeting_date}`}</Text>
                </View>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 1,
                      marginRight: 5,
                    }}
                    source={require('./Assets/icons8-schedule-64.png')}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'black',
                      fontSize: 16,
                    }}>
                    {item.meeting_starttime}
                  </Text>
                  <Image
                    source={require('./Assets/icons8-upcoming-event-24.png')} // Provide the local image path
                    style={{
                      width: 20,
                      height: 20,
                      marginLeft: 200,
                      marginTop: -50,
                    }} // Set the width and height of the image
                  />
                  <Text style={{marginLeft: -45, color: 'black'}}>
                    upcoming
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

export default StudentMeeting;
