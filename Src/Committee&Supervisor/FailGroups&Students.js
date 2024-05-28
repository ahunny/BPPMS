import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import API_URL from '../../apiConfig';

const FailGroups = props => {
  const [GroupList, setGroupList] = useState([]);
  console.log(GroupList);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFailGroups = async () => {
    try {
      const response = await fetch(
        `${API_URL}/Groups/GetFailProjectAndMembers`,
      );
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
      fetchFailGroups();
    }, []),
  );

  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#74A2A8',
      }}>
      <View
        style={{
          backgroundColor: '#C0C0C0',
          width: '97%',
          height: '97%',
          alignSelf: 'center',
          marginTop: 10,
          borderRadius: 20,
        }}>
        {Array.isArray(GroupList) ? (
          <FlatList
            data={GroupList}
            renderItem={({item, index}) => (
              <ScrollView>
                <View
                  style={[
                    styles.itemContainer,
                    {marginTop: index === 0 ? 20 : 0},
                  ]}>
                  <View style={styles.itemContent}>
                    <View style={styles.column}>
                      <Text style={styles.boldText}>
                        {item.ProjectName + ' (' + item.Fyp_Type + ')'}{' '}
                      </Text>
                      <Text style={{color: 'black'}}>
                        {'Supervisor By : ' + item.SupervisorName}
                      </Text>
                      <Text style={{color: 'red', fontWeight: 'bold'}}>
                        {'\n'}
                        {'Failed Members: '}
                        {item.Students?.length || 0}
                      </Text>
                      {item.Students?.map((student, index) => (
                        <Text style={{color: 'black'}} key={index}>
                          {student.StudentName}
                          {' ('}
                          {student.AridNumber}
                          {')'}
                          {'\n'}
                          {'Platform: '}
                          {student.Platform}
                          {index !== item.Students.length - 1 && '\n'}
                        </Text>
                      ))}
                    </View>
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() =>
                        props.navigation.navigate('Addmember', {
                          groupsList: GroupList,
                          selectedGroup: item,
                        })
                      }>
                      <Text style={styles.buttonText}>Re-Allocate</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            )}
            keyExtractor={item => item.id.toString()}
            refreshing={refreshing}
            onRefresh={fetchFailGroups}
          />
        ) : (
          <Text style={styles.errorText}>No Failed Student Found!</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#74A2A8',
    paddingHorizontal: 20,
  },
  itemContainer: {
    elevation: 5,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    marginBottom: 10,
    width: '95%',
    marginLeft: 9,
  },
  itemContainer2: {
    elevation: 5,
    backgroundColor: '#C0C0C0',
    borderRadius: 10,
    marginBottom: 10,
    width: 310,
  },

  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  itemContent1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boldText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  column: {
    flexDirection: 'column',
  },
  input: {
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#D9D9D9',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },

  buttonText: {
    color: 'black',
    fontSize: 15,
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default FailGroups;
