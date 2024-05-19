import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  ToastAndroid,
} from 'react-native';
import API_URL from '../../apiConfig';
import {useFocusEffect} from '@react-navigation/native';

const Request_Details = ({route}) => {
  const {userid} = route.params;
  const [RequestList, setRequestList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRequests = async () => {
    try {
      const response = await fetch(
        `${API_URL}/AcceptReject/GetStudentRequests?userId=${userid}`,
      );
      const data = await response.json();
      console.log(data);
      //const filteredData = data.filter(item => item.user_id !== userid);
      setRequestList(data);
    } catch (error) {
      ToastAndroid.show('Error fetching Requests', ToastAndroid.SHORT);
      console.error('Error fetching Requests:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  useFocusEffect(
    // useCallback prevent unnecessary re-renders caused by creating a newfunction instance on every render.
    useCallback(() => {
      fetchRequests();
    }, []),
  );

  const handleAcceptReject = async (id, acceptReject) => {
    try {
      const response = await fetch(
        `${API_URL}/AcceptReject/acceptStudentRequest?userId=${userid}&isAccepted=${acceptReject}&requestId=${id}`,
      );
      const data = await response.json();
      console.log(data);
      fetchRequests();
    } catch (error) {
      ToastAndroid.show('Error Occured', ToastAndroid.SHORT);
      console.error('Error Occured:', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#74A2A8'}}>
      <FlatList
        data={RequestList}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={{
              elevation: 5,
              backgroundColor: 'lightgrey',
              borderRadius: 10,
              width: '90%',
              marginBottom: 10,
              marginLeft: 18,
              marginTop: index === 0 ? 50 : 0,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
              }}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    fontSize: 16,
                    marginBottom: 5,
                  }}>
                  {item.senderName + ' Has Requested you to join their group'}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    fontSize: 16,
                  }}>{`Platform: ${item.technology_preference}`}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#74A2A8',
                    padding: 10,
                    borderRadius: 5,
                    marginHorizontal: 5,
                  }}
                  onPress={() => {
                    handleAcceptReject(item.request_id, true);
                  }}>
                  <Text style={{color: 'white'}}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleAcceptReject(item.request_id, false);
                  }}
                  style={{
                    backgroundColor: 'grey',
                    padding: 10,
                    borderRadius: 5,
                    marginHorizontal: 5,
                  }}>
                  <Text style={{color: 'white'}}>Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Request_Details;
