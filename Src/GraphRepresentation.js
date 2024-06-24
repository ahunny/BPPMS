import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ToastAndroid,
  View,
  Dimensions,
  SafeAreaView,
  Text,
} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import API_URL from '../apiConfig';
import {SelectList} from 'react-native-dropdown-select-list';

const screenWidth = Dimensions.get('window').width;

const GraphRepr = () => {
  const [criteria, setCriteria] = useState([]);
  const [percentageScores, setPercentageScores] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [ProjectList, setProjectList] = useState([]);
  const [StudentList, setStudentList] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/Groups/GetProjects`);
      const data = await response.json();
      const formattedData = data.map(item => ({
        key: item.project_id.toString(),
        value: item.project_title,
      }));
      setProjectList(formattedData);
    } catch (error) {
      ToastAndroid.show('Error fetching Projects', ToastAndroid.SHORT);
      console.error('Error fetching Projects:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        `${API_URL}/Groups/GetStudentsbyProjectID?projectid=${selectedProject}`,
      );
      const data = await response.json();
      const students = data.map(item => ({
        key: item.StudentId.toString(),
        value: `${item.StudentName} (${item.AridNo})`,
      }));
      setStudentList(students);
    } catch (error) {
      ToastAndroid.show('Error fetching Students', ToastAndroid.SHORT);
      console.error('Error fetching Students:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      fetchStudents();
    }
  }, [selectedProject]);

  const fetchGrades = async () => {
    try {
      const response = await fetch(
        `${API_URL}/Grading/GetGradesforGraph?student_id=${selectedStudent}`,
      );
      const data = await response.json();
      console.log(data);
      if (Array.isArray(data.Scores)) {
        const criteria = [];
        const percentageScores = [];

        data.Scores.forEach(score => {
          const key = score.Criteria;
          const percentage = (score.AverageScore / score.ScoreWeight) * 100;
          criteria.push(key);
          percentageScores.push(percentage.toFixed(2)); // Round to two decimal places
        });

        setCriteria(criteria);
        setPercentageScores(percentageScores);
      } else {
        setCriteria([]);
        setPercentageScores([]);
        ToastAndroid.show('No scores data found', ToastAndroid.SHORT);
      }
    } catch (error) {
      setCriteria([]);
      setPercentageScores([]);
      ToastAndroid.show('Error fetching grades', ToastAndroid.SHORT);
      console.error('Error fetching grades:', error);
    }
  };

  useEffect(() => {
    if (selectedStudent) {
      fetchGrades();
    }
  }, [selectedStudent]);

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0.5,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(71, 255, 89, ${opacity})`,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForBackgroundLines: {
      strokeDasharray: '',
    },
    yAxisLabel: '',
    yAxisSuffix: '%',
    yAxisInterval: 20,
    formatYLabel: yValue => `${yValue}`,
    decimalPlaces: 0, // ensure Y-axis labels are whole numbers
  };

  // Custom function to render labels at the end of each bar
  const CustomBarLabel = ({data}) => {
    return data.datasets.map((dataset, index) =>
      dataset.data.map((value, i) => (
        <Text
          key={`${index}-${i}`}
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 14,
            fontWeight: 'bold',
            marginTop: 8,
          }}>
          {value}%
        </Text>
      )),
    );
  };

  const data = {
    labels: criteria.length > 0 ? criteria : ['No Data'],
    datasets: [
      {
        data: percentageScores.length > 0 ? percentageScores : [0],
        color: (opacity = 1) => `rgba(71, 255, 89, ${opacity})`,
      },
    ],
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#74A2A8'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 20,
        }}>
        <SelectList
          setSelected={val => setSelectedProject(val)}
          data={ProjectList}
          save="key"
          searchPlaceholder="Search Project"
          dropdownTextStyles={{color: 'black'}}
          boxStyles={styles.selectListStyle}
          placeholder="Select Project"
          inputStyles={styles.selectListInput}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 20,
        }}>
        <SelectList
          setSelected={val => setSelectedStudent(val)}
          data={StudentList}
          save="key"
          searchPlaceholder="Search Student"
          dropdownTextStyles={{color: 'black'}}
          boxStyles={styles.selectListStyle}
          placeholder="Select Student"
          inputStyles={styles.selectListInput}
        />
      </View>
      <View style={styles.container}>
        <BarChart
          data={data}
          width={screenWidth}
          height={300}
          yAxisLabel=""
          yAxisSuffix="%"
          yAxisInterval={20}
          chartConfig={chartConfig}
          fromZero={true} // Ensure bars start from the bottom
          yMin={0} // Ensure Y-axis starts from 0
          yMax={100} // Ensure Y-axis ends at 100
          yLabelsOffset={10}
          verticalLabelRotation={10}
          formatYLabel={yValue => `${yValue}`}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          renderBarLabel={CustomBarLabel} // Custom function to render labels at the end of each bar
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#74A2A8',
    marginTop: 20,
  },
  selectListStyle: {
    backgroundColor: '#E5E5E5',
    borderColor: '#E5E5E5',
    borderRadius: 20,
    width: 220,
    height: 50,
  },
  selectListInput: {color: 'black', fontSize: 18},
});

export default GraphRepr;
