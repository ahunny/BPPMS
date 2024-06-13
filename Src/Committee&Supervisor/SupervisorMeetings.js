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

const SupervisorMeetings = props => {
  const [MeetingList, setMeetingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMeetings = async () => {
    try {
      const response = await fetch(`${API_URL}/Meeting/GetSupervisorMeetings?`);
      const data = await response.json();
      setMeetingList(data);
      console.log(data);
    } catch (error) {
      ToastAndroid.show('Error fetching Meetings', ToastAndroid.SHORT);
      console.error('Error fetching meetings:', error);
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
          data={MeetingList}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                elevation: 5,
                backgroundColor: 'lightgrey',
                borderRadius: 10,
                width: 320,
                marginBottom: 10,
                marginTop: index === 0 ? 20 : 0,
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
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: 'black',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      {item.projectTitle}
                    </Text>
                  </View>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'black',
                      fontSize: 16,
                      fontWeight: 'bold',
                      textAlign: 'left',
                    }}>
                    {item.description}
                  </Text>
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
                        borderRadius: 5,
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
                      {`${item.meetingDate.toString().substring(0, 10)}`}
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
                      }}>{`${item.meetingStartTime}`}</Text>
                    <Image
                      source={require('./Assets/icons8-upcoming-event-24.png')} // Provide the local image path
                      style={{
                        width: 20,
                        height: 20,
                        marginLeft: 150,
                        marginTop: -50,
                      }} // Set the width and height of the image
                    />
                    <Text style={{marginLeft: -65, color: 'black'}}>
                      upcoming event
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

export default SupervisorMeetings;
