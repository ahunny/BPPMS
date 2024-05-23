import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import API_URL from '../apiConfig';

const Login = props => {
  const [username, setusername] = useState('Azeem');
  const [password, setPassword] = useState('123');

  const navigation = useNavigation();

  const handleLoginPress = async () => {
    try {
      if (!username.trim() || !password.trim()) {
        ToastAndroid.show(
          'Please provide necessary credentials.',
          ToastAndroid.SHORT,
        );
        return;
      }

      const response = await fetch(
        `${API_URL}/Auth/Login?username=${username.trim()}&password=${password.trim()}`,
      );

      if (!response.ok) {
        ToastAndroid.show(
          'Incorrect credentials. Please try again.',
          ToastAndroid.SHORT,
        );
        return;
      }

      const data = await response.json();
      let role = data.role;
      console.log(data);

      if (role == 'Student') {
        props.navigation.navigate('StudentDashboard', {data});
      } else if (role == 'Supervisor') {
        props.navigation.navigate('SupervisorDashboard', {data});
      } else if (role == 'Committee') {
        props.navigation.navigate('CommitteeDashboard');
      } else if (role == 'datacell') {
        props.navigation.navigate('Datacell Dashboard');
      } else {
        ToastAndroid.show(
          'Incorrect credentials. Please try again.',
          ToastAndroid.SHORT,
        );
        return;
      }
      setusername('');
      setPassword('');
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  const handleUsernameChange = text => {
    setusername(text);
  };

  const handlePasswordChange = text => {
    setPassword(text);
  };

  return (
    <ScrollView style={{backgroundColor: '#74A2A8'}}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', flex: 1, marginTop: 60}}>
            <Image source={require('./Assets/logo.png')} style={styles.logo} />
            <View style={styles.container1}>
              <Text style={styles.AppNameLabel1}>BIIT PROJECT PROGRESS</Text>
              <Text style={styles.AppNameLabe2}>MONITORING SYSTEM</Text>
            </View>
          </View>
          <View style={styles.container1}>
            <Text style={styles.WelcomeLabel}>Welcome Back!</Text>
            <Text style={styles.LogintoLabel}>
              Login To Continue Your Account
            </Text>
          </View>
          <View style={styles.container2}>
            <Text style={styles.SmallLabels}>Username</Text>
            <TextInput
              placeholderTextColor={'grey'}
              style={styles.input}
              placeholder="Enter your username"
              onChangeText={handleUsernameChange}
              value={username}
            />

            <Text style={styles.SmallLabels}>Password</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={'grey'}
              placeholder="Enter your password"
              secureTextEntry={true} // Mask the password
              onChangeText={handlePasswordChange}
              value={password}
            />

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLoginPress}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#74A2A8',
    flex: 1,
    justifyContent: 'center',
  },
  container1: {
    marginTop: 65,
  },
  container2: {
    width: 340,
    height: 270,
    backgroundColor: '#C9C9C9',
    borderRadius: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 70,
    marginTop: 30, // Adjusted margin top
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },

  SmallLabels: {
    fontSize: 16,
    marginLeft: 35,
    fontWeight: 'bold',
    color: 'black',
  },
  forgotPasswordlabel: {
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  AppNameLabel1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10,
    marginTop: 40,
  },
  AppNameLabel2: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10,
  },
  WelcomeLabel: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 2, height: 1},
    textShadowRadius: 10,
    marginLeft: 20,
    //paddingBottom:5,
  },
  LogintoLabel: {
    fontSize: 15,
    color: 'white',
    marginLeft: 20,
    //paddingBottom:10
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#E5E5E5',
    marginBottom: 10,
    paddingHorizontal: 8,
    width: 280,
    alignSelf: 'center',
    borderRadius: 10, // 10-degree curve
    shadowColor: '#000',
    color: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
  loginButton: {
    backgroundColor: '#74A2A8',
    padding: 8,
    borderRadius: 15,
    height: 40,
    width: '50%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 2, height: 1},
    textShadowRadius: 10,
  },
  logo: {
    marginLeft: '4%',
    marginTop: '5%',
    width: 95,
    height: 130,
    resizeMode: 'contain',
  },
});

export default Login;
