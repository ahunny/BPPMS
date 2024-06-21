import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import API_URL from '../../apiConfig';

const SupViewComments = ({route}) => {
  const [Comments, setComments] = useState([]);

  const {Data} = route.params;
  const groupid = Data.GroupId;
  console.log('details', Data);
  console.log('id', groupid);

  const fetchComments = async groupid => {
    try {
      const response = await fetch(
        `${API_URL}/Remarks/GetSupervisorRemarks?groupid=${groupid}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setComments(data);
        console.log(data);
      } else {
        throw new Error('Failed to fetch student data');
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchComments(groupid);
    };

    fetchData();
  }, [groupid]);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <FlatList
          data={Comments}
          renderItem={({item, index}) => (
            <View
              style={[styles.itemContainer, {marginTop: index === 0 ? 20 : 0}]}>
              <View style={styles.itemContent}>
                <View style={styles.column}>
                  <Text style={styles.boldText}>
                    {item.student_name + ' (' + item.arid_no + ')'}
                  </Text>
                  <Text style={styles.text}>
                    {'Meet Description: ' + item.description}
                  </Text>
                  <Text style={styles.text}>{'Comment: ' + item.comment}</Text>
                  <Text style={styles.text}>
                    {'Date: ' +
                      new Date(item.date_of_comment).toLocaleDateString()}
                  </Text>
                  <Text style={styles.text}>
                    {item.is_with_supervisor ? '' : 'Commented by Committee'}
                  </Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.comment_id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#74A2A8',
  },
  innerContainer: {
    backgroundColor: '#C0C0C0',
    width: '93%',
    height: '97%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 20,
  },
  itemContainer: {
    elevation: 5,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    marginBottom: 10,
    width: 320,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  boldText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  column: {
    flexDirection: 'column',
  },
  text: {
    color: 'black',
  },
});

export default SupViewComments;
