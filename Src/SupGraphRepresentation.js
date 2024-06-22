import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ToastAndroid,
  View,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import API_URL from '../apiConfig';
import {SelectList} from 'react-native-dropdown-select-list';

const screenWidth = Dimensions.get('window').width;

const SupGraphRepr = props => {
  const {userid} = props.route.params;

  const [criteria, setCriteria] = useState([]);
  const [averageScores, setAverageScores] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [ProjectList, setProjectList] = useState([]);
  const [StudentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        `${API_URL}/Groups/GetSupervisorProjects?userid=${userid}`,
      );
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        const formattedData = data.map(item => ({
          key: item.project_id.toString(),
          value: item.project_title,
        }));
        setProjectList(formattedData);
        console.log(data);
      } else {
        setProjectList([]);
        ToastAndroid.show('No Project Allocated', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Error fetching Projects', ToastAndroid.SHORT);
      console.error('Error fetching Projects:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
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
        `${API_URL}/Grading/GetCalculatedGrades?student_id=${selectedStudent}`,
      );
      const data = await response.json();
      console.log(data);

      if (Array.isArray(data.Scores)) {
        const criteria = data.Scores.map(score => score.Criteria);
        const averageScores = data.Scores.map(score => score.AverageScore);
        setCriteria(criteria);
        setAverageScores(averageScores);
      } else {
        setCriteria([]);
        setAverageScores([]);
        ToastAndroid.show('No scores data found', ToastAndroid.SHORT);
      }
    } catch (error) {
      setCriteria([]);
      setAverageScores([]);
      ToastAndroid.show('Error fetching grades', ToastAndroid.SHORT);
      console.error('Error fetching grades:', error);
    }
  };

  useEffect(() => {
    if (selectedStudent) {
      fetchGrades();
    }
  }, [selectedStudent]);

  // Function to calculate cumulative scores
  const calculateCumulativeScores = () => {
    if (averageScores.length === 0) return [0];

    let cumulativeSum = 0;
    return averageScores.map(score => {
      cumulativeSum += score;
      return cumulativeSum;
    });
  };

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0.5,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => {
      const hexOpacity = Math.round(opacity * 255)
        .toString(16)
        .padStart(2, '0');
      return `#47FF59${hexOpacity}`;
    },
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    propsForBackgroundLines: {
      strokeDasharray: '', // solid background lines with no dashes
    },
  };

  const cumulativeScores = calculateCumulativeScores();

  const data = {
    labels: criteria.length > 0 ? criteria : ['No Data'],
    datasets: [
      {
        data: cumulativeScores.length > 0 ? cumulativeScores : [0],
        strokeWidth: 2, // optional
        color: (opacity = 1) => `rgba(71, 255, 89, ${opacity})`, // line color
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
        <LineChart
          data={data}
          width={screenWidth}
          height={300}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={20} // interval of 20
          chartConfig={chartConfig}
          bezier
          fromZero // start the y-axis from zero
          yLabelsOffset={10} // offset for the y-axis labels
          verticalLabelRotation={10} // rotate x-axis labels if necessary
          formatYLabel={yValue => `${yValue}`} // format Y-axis labels
          segments={5} // Number of segments to divide the Y axis into (100 / 20 = 5 segments)
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

export default SupGraphRepr;
