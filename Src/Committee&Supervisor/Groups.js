import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
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

const Groups = props => {
  const [GroupList, setGroupList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUnAssignedGroups = async () => {
    try {
      const response = await fetch(`${API_URL}/AssignProject/GetAllGroups`);
      const data = await response.json();
      setGroupList(data);
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
      fetchUnAssignedGroups();
    }, []),
  );

  const navigateToProjectAllocation = groupId => {
    props.navigation.navigate('ProjectAllocation', {groupId});
  };

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
          data={GroupList}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                elevation: 5,
                backgroundColor: 'lightgrey',
                borderRadius: 10,
                width: 300,
                height: 50,
                marginBottom: 10,
                marginTop: index === 0 ? 20 : 0,
              }}
              onPress={() => navigateToProjectAllocation(item)}>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    marginLeft: 20,
                    marginTop: 13,
                  }}>{`Group Number:${item}`}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default Groups;
