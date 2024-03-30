import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from 'react-native';

const Groups = props => {
  const data = [
    {
      id: '1',
    },
    {
      id: '2',
    },
    {
      id: '3',
    },
    {
      id: '4',
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
              height: 50,
              marginBottom: 10,
              marginTop: index === 0 ? 50 : 0,
              marginLeft: 20,
            }}
            onPress={() => props.navigation.navigate('ProjectAllocation')}>
            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  marginLeft: 20,
                  marginTop: 13,
                }}>{`Group:${item.id}`}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Groups;
