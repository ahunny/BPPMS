import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from 'react-native';

const StudentMeeting = props => {
  const data = [
    {
      id: '1',
      meetingby: 'Committee',
      date: '04-30-2024',
      time: '10:00:00 Am',
      image: require('./Assets/icons8-person-50.png'),
      imageclock: require('./Assets/icons8-clock-50.png'),
      imagedoor: require('./Assets/icons8-schedule-64.png'),
    },
    {
      id: '2',
      meetingby: 'Committee',
      date: '04-30-2024',
      time: '10:00:00 Am',
      image: require('./Assets/icons8-person-50.png'),
      imageclock: require('./Assets/icons8-clock-50.png'),
      imagedoor: require('./Assets/icons8-schedule-64.png'),
    },
    {
      id: '3',
      meetingby: 'Committee',
      date: '04-30-2024',
      time: '10:00:00 Am',
      image: require('./Assets/icons8-person-50.png'),
      imageclock: require('./Assets/icons8-clock-50.png'),
      imagedoor: require('./Assets/icons8-schedule-64.png'),
    },
  ];

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
                    source={item.image}
                  />
                  <Text
                    style={{textAlign: 'center', color: 'black', fontSize: 16}}>
                    {item.meetingby}
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
                    source={item.imagedoor}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'black',
                      fontSize: 16,
                    }}>{`${item.date}`}</Text>
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
                    source={item.imageclock}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'black',
                      fontSize: 16,
                    }}>
                    {item.time}
                  </Text>
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
  );
};

export default StudentMeeting;
