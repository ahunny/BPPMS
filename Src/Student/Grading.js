import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Text,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {SelectList} from 'react-native-dropdown-select-list';
import API_URL from '../../apiConfig';

const StudentGrading = props => {
  const navigation = useNavigation();

  const {userid} = props.route.params;
  console.log(userid);

  const [grades, setGrades] = useState([]);
  const [scores, setScores] = useState([]);

  const fetchGrades = async () => {
    try {
      const response = await fetch(
        `${API_URL}/Grading/GetCalculatedGradesForStudent?userid=${userid}`,
      );
      const data = await response.json();

      // Ensure that Grades and Scores properties exist before setting them
      if (data.Grades) {
        setGrades(data.Grades);
      } else {
        ToastAndroid.show('no data Found', ToastAndroid.SHORT);
      }

      if (data.Scores) {
        setScores(data.Scores);
      } else {
        ToastAndroid.show('no data Found', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Error fetching Grades', ToastAndroid.SHORT);
      console.error('Error fetching Grades:', error);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, []);

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
        {scores.map((scoreItem, index) => (
          <View
            key={scoreItem.ScoreId}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            <View
              style={{
                backgroundColor: '#D9D9D9',
                width: 200,
                height: 50,
                borderRadius: 10,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  alignSelf: 'center',
                }}>
                {scoreItem.Criteria}
              </Text>
            </View>
            <Text
              style={{
                backgroundColor: '#D9D9D9',
                width: 100,
                height: 50,
                borderRadius: 10,
                color: 'black',
                textAlign: 'center',
                textAlignVertical: 'center',
                marginLeft: 10,
              }}>
              {scoreItem.AverageScore + '/' + scoreItem.ScoreWeight}
            </Text>
          </View>
        ))}
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            marginTop: 20,
          }}>
          Cumulative Grade:
        </Text>
        <Text
          style={{
            backgroundColor: '#D9D9D9',
            width: 100,
            height: 50,
            borderRadius: 10,
            color: 'black',
            textAlign: 'center',
            textAlignVertical: 'center',
            marginTop: 10,
          }}>
          {grades}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  selectListStyle: {
    backgroundColor: '#E5E5E5',
    borderColor: '#E5E5E5',
    borderRadius: 20,
    width: 220,
    height: 50,
  },
  platFormSelect: {
    backgroundColor: '#E5E5E5',
    borderColor: '#E5E5E5',
    borderRadius: 20,
    width: 130,
    height: 50,
  },
  selectListInput: {color: 'black', fontSize: 18},

  Button: {
    backgroundColor: '#D9D9D9',
    padding: 8,
    borderRadius: 20,
    height: 40,
    width: 130,
    alignItems: 'center',
  },

  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  optionStyle: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 10,
    width: 100,
  },
  radioContainer: {
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    backgroundColor: '#c5e3e1',
    padding: 30,
    borderRadius: 600,
    position: 'absolute',
    top: 40,
    height: 100,
    width: 100,
  },
  design: {
    backgroundColor: '#2E81FE',
    height: 92,
    width: '100%',
    borderBottomRightRadius: 60000,
    borderBottomLeftRadius: 60000,
    marginBottom: 55,
  },
  whiteDesign: {
    backgroundColor: 'white',
    borderRadius: 600,
    position: 'absolute',
    height: 110,
    width: 110,
    top: 35,
  },
});
export default StudentGrading;
