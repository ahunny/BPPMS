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
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

function Login() {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = () => {
    // Check if the entered email and password match the default values
    if (username === 'student') {
      navigation.navigate('StudentDashboard');
    } else if (username === 'com') {
      navigation.navigate('CommitteeDashboard');
    } else {
      console.error('Invalid Credentials');
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#74A2A8'}}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', flex: 1}}>
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
              style={styles.input}
              placeholder="Enter your username"
              onChangeText={text => setusername(text)}
              value={username}
            />

            <Text style={styles.SmallLabels}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry={true} // Mask the password
              onChangeText={text => setPassword(text)}
              value={password}
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.forgotPasswordlabel}>Forget Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

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
      height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 10,
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
    color: 'blue',
  },
  AppNameLabel1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 2, height: 6},
    textShadowRadius: 10,
    marginTop: 40,
  },
  AppNameLabel2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 2, height: 6},
    textShadowRadius: 10,
  },
  WelcomeLabel: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 2, height: 6},
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
  loginButton: {
    backgroundColor: '#74A2A8',
    padding: 8,
    borderRadius: 5,
    height: 40,
    width: 100,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 2, height: 4},
    textShadowRadius: 10,
  },
  logo: {
    marginLeft: '4%',
    marginTop: '5%',
    width: 120,
    height: 130,
    resizeMode: 'contain',
  },
});

export default Login;
