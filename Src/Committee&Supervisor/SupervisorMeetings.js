import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
  TextInput,
  ToastAndroid,
} from 'react-native';
import API_URL from '../../apiConfig';

const CommitteeMeetings = props => {
  const [MeetingList, setMeetingList] = useState([]);
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const {userid} = props.route.params;
  console.log(userid);

  const fetchMeetings = async () => {
    try {
      const response = await fetch(`${API_URL}/Meeting/GetSupervisorMeetings?`);
      const data = await response.json();
      setMeetingList(data);
      setFilteredMeetings(data); // Initialize filtered meetings with full list
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
    useCallback(() => {
      fetchMeetings();
    }, []),
  );

  const handleSearch = query => {
    setSearchQuery(query);
    if (query) {
      const filteredData = MeetingList.filter(meeting =>
        meeting.project_title.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredMeetings(filteredData);
    } else {
      setFilteredMeetings(MeetingList);
    }
  };
  const navigation = useNavigation();
  const handleMeetingPress = item => {
    // Navigate to 'uploadtask' screen and pass item data
    navigation.navigate('SupMeetDetails', {MeetDetails: item, userid: userid});
  };

  const renderMeeting = ({item, index}) => (
    <TouchableOpacity
      style={{
        elevation: 5,
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        width: '100%',
        marginBottom: 10,
        marginTop: index === 0 ? 50 : 0,
      }}
      onPress={() => handleMeetingPress(item)}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          padding: 10,
        }}>
        <View style={{flexDirection: 'column'}}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'left',
            }}>
            {item.project_title}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: 16,
              textAlign: 'left',
            }}>
            {'Description: ' + item.description}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
            <Image
              style={{
                width: 20,
                height: 20,
                borderRadius: 25,
                marginRight: 5,
              }}
              source={require('./Assets/icons8-person-50.png')}
            />
            <Text style={{textAlign: 'center', color: 'black', fontSize: 16}}>
              {item.is_with_supervisor ? 'Supervisor' : 'Committee'}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
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
              }}>{`${item.meeting_date.toString().substring(0, 10)}`}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
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
              source={require('./Assets/icons8-upcoming-event-24.png')}
              style={{
                width: 20,
                height: 20,
                marginLeft: 200,
                marginTop: -50,
              }}
            />
            <Text style={{marginLeft: -45, color: 'black'}}>upcoming</Text>
          </View>

          {/* Conditionally Render ScoreCriteria */}
          {item.ScoreCriteria.length > 0 && (
            <View style={{marginTop: 10}}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Meeting Criteria
              </Text>

              {item.ScoreCriteria.map((criteria, idx) => (
                <View
                  key={idx}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: 'black', fontSize: 14, marginRight: 5}}>
                    {criteria.score_criteria}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#74A2A8', alignItems: 'center'}}>
      <TextInput
        placeholder="Search by project title"
        placeholderTextColor={'lightgrey'}
        value={searchQuery}
        onChangeText={handleSearch}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 5,
          width: '90%',
          paddingLeft: 10,
          marginTop: 10,
          backgroundColor: 'white',
          color: 'black',
        }}
      />
      <FlatList
        data={filteredMeetings}
        renderItem={renderMeeting}
        keyExtractor={item => item.meeting_id.toString()}
        refreshing={refreshing}
        onRefresh={fetchMeetings}
      />
    </View>
  );
};

export default CommitteeMeetings;
