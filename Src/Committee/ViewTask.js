import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from 'react-native';

const UploadedTasks = props => {
  const data = [
    {
      id: '1',
      title: 'Project Outline',
      description: 'Sir Azeem',
      time: '12-12-2023',
      image: require('./Assets/icons8-person-50.png'),
      imageclock: require('./Assets/icons8-clock-50.png'),
      imagedoor: require('./Assets/icons8-person-50.png'),
    },
    {
      id: '2',
      title: 'Mockups',
      description: 'Sir Hassan',
      time: '12-12-2023',
      image: require('./Assets/icons8-add-male-user-64.png'),
      imageclock: require('./Assets/icons8-clock-50.png'),
      imagedoor: require('./Assets/icons8-person-50.png'),
    },
    {
      id: '3',
      title: 'Features',
      description: 'Sir Zahid',
      time: '12-12-2023',
      image: require('./Assets/icons8-add-male-user-64.png'),
      imageclock: require('./Assets/icons8-clock-50.png'),
      imagedoor: require('./Assets/icons8-person-50.png'),
    },
    {
      id: '4',
      title: 'Completed Erd mockups and conceptual',
      description: 'sir Umer',
      time: '12-12-2023',
      image: require('./Assets/icons8-add-male-user-64.png'),
      imageclock: require('./Assets/icons8-clock-50.png'),
      imagedoor: require('./Assets/icons8-person-50.png'),
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
            }}
            onPress={() => props.navigation.navigate('uploadtask')}>
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
                    {item.title}
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
                    source={item.imagedoor}
                  />
                  <Text
                    style={{textAlign: 'center', color: 'black', fontSize: 16}}>
                    {' '}
                    {item.description}
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
                    source={item.imageclock}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'black',
                      fontSize: 16,
                    }}>{`Time: ${item.time}`}</Text>
                  <Image
                    source={require('./Assets/icons8-pending-30.png')} // Provide the local image path
                    style={{
                      width: 20,
                      height: 20,
                      marginLeft: 120,
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

export default UploadedTasks;