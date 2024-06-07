import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import API_URL from '../../apiConfig';

const SupervisorGroups = props => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [FypGrouplist, setFypGrouplist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const {userid} = props.route.params;
  console.log(userid);

  const fetchProjectsOfSupervisor = async () => {
    try {
      const response = await fetch(
        `${API_URL}/Groups/GetProjectsbySpervisor?userid=${userid}`,
      );
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        // const formattedData = data.map(item => ({
        //   key: item.GroupId.toString(),
        //   value: item.ProjectTitle,
        // }));
        setFypGrouplist(data);
        console.log(data);
      } else {
        setFypGrouplist([]);
        ToastAndroid.show('No Project Available', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Error fetching Projects', ToastAndroid.SHORT);
      console.error('Error fetching Projects:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProjectsOfSupervisor();
    }, []),
  );
  const handleProjectPress = item => {
    // Navigate to 'uploadtask' screen and pass item data
    navigation.navigate('chat', {Data: item, userid: userid});
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
          data={FypGrouplist}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                elevation: 5,
                backgroundColor: 'lightgrey',
                borderRadius: 10,
                width: 300,
                marginBottom: 10,
                marginTop: index === 0 ? 20 : 0,
              }}
              onPress={() => handleProjectPress(item)}>
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
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: 'black',
                        fontSize: 16,
                      }}>
                      {item.ProjectTitle}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.GroupId}
        />
      </View>
    </View>
  );
};

export default SupervisorGroups;
