import React from 'react';
import {View, Text, TouchableOpacity, FlatList, Alert} from 'react-native';

const Request_Details = props => {
  const data = [
    {
      id: '1',
      title: 'Armaghan has requested you to join this group ',
      description: 'React native ',
    },
    {
      id: '2',
      title: 'Armaghan has requested you to join this group ',
      description: 'React native ',
    },
    {
      id: '3',
      title: 'Armaghan has requested you to join this group ',
      description: 'React native ',
    },
  ];

  const handleAccept = () => {
    Alert.alert(
      'Congratulations',
      'You have Created Fyp Group with Armughan Ul Haq Your Platform Is React Native',
    );
  };
  const handleReject = () => {
    Alert.alert('Sorry', 'Your request has been rejected');
  };

  return (
    <View style={{flex: 1, backgroundColor: '#74A2A8'}}>
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={{
              elevation: 5,
              backgroundColor: 'lightgrey',
              borderRadius: 10,
              width: 370,
              marginBottom: 10,
              marginTop: index === 0 ? 50 : 0,
              marginLeft: 20,
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
                  {item.title}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    fontSize: 16,
                  }}>{`Platform: ${item.description}`}</Text>
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
                  onPress={handleAccept}>
                  <Text style={{color: 'white'}}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleReject}
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
