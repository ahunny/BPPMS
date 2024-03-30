import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from 'react-native';

const FypGroups = props => {
  const data = [
    {
      id: '1',
      Project: 'BIIT PROJECT PROGRESS MONITORING',
      Supervisor: 'Sir Azeem',
    },
    {
      id: '2',
      Project: 'KIDS ALPHABET Tutor',
      Supervisor: 'Sir Azeem',
    },
    {
      id: '3',
      Project: 'BUS PASS QR SCAN',
      Supervisor: 'Sir Azeem',
    },
    {
      id: '4',
      Project: 'ADVENTURE PLANNER',
      Supervisor: 'Sir Azeem',
    },
    {
      id: '5',
      Project: 'SECRET MESSAGE',
      Supervisor: 'Sir Azeem',
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
            onPress={() =>
              props.navigation.navigate('CommitteeProjectDetails')
            }>
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
                    {item.Project}
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                  <Text
                    style={{textAlign: 'center', color: 'black', fontSize: 16}}>
                    {' '}
                    {`Supervisor: ${item.Supervisor}`}
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

export default FypGroups;
