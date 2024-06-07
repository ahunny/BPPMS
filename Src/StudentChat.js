import React, {useCallback, useState} from 'react';
import {Alert, StyleSheet, ToastAndroid, View} from 'react-native';
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';
import API_URL from '../apiConfig';
import {useFocusEffect} from '@react-navigation/native';

const StudentChat = props => {
  const {userid} = props.route.params; // Get userid from route params
  console.log(userid);
  const {Data} = props.route.params;
  receiverid = Data.group_id;

  console.log('id', receiverid);

  const [name, setName] = useState('');
  const [isEnter, setIsEnter] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Parse date string to Date object
  const parseDateString = dateString => {
    const [datePart, timePart] = dateString.split(' ');
    const [month, day, year] = datePart.split('/').map(Number);
    let [hours, minutes, seconds] = timePart.split(':').map(Number);
    const ampm = dateString.split(' ')[2];

    if (ampm === 'PM' && hours < 12) {
      hours += 12;
    } else if (ampm === 'AM' && hours === 12) {
      hours = 0;
    }

    return new Date(year, month - 1, day, hours, minutes, seconds);
  };

  // Function to send chat message
  const SendChat = async newMessage => {
    if (loading) {
      Alert.alert('Please wait', 'Sending Chat');
      return;
    }

    const data = {
      sender_id: userid, // Use the sender's ID from props
      receiver_id: receiverid, // Hardcoded receiver ID, change if needed
      chat: newMessage.text, // Text from the new message
    };

    setLoading(true); // Set loading state

    try {
      const response = await fetch(`${API_URL}/Chat/AddChat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error submitting Message:', errorData);
        setLoading(false); // Reset loading state on error
        ToastAndroid.show(
          errorData?.message || 'Error submitting Message. Please try again.',
          ToastAndroid.SHORT,
        );
        return;
      }

      const responseData = await response.json();
      console.log('Response data:', responseData);
      ToastAndroid.show('Sent Successfully', ToastAndroid.SHORT);

      setLoading(false); // Reset loading state on success
    } catch (error) {
      console.error('Error:', error);
      setLoading(false); // Reset loading state on error
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  // Function to fetch chat messages
  const fetchChat = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/Chat/GetChats?groupid=${receiverid}`,
      );
      const data = await response.json();
      console.log(data);

      const transformedMessages = data
        .map(item => {
          const createdAt = parseDateString(item.created_at);
          if (isNaN(createdAt.getTime())) {
            console.error('Invalid date format:', item.created_at);
            ToastAndroid.show(
              'Invalid date format detected',
              ToastAndroid.SHORT,
            );
            return null;
          }
          return {
            _id: item.id,
            text: item.chat,
            createdAt, // Use the parsed Date object
            user: {
              _id: item.sender_id,
              name: item.SenderName,
              avatar:
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
            },
          };
        })
        .filter(message => message !== null);

      // Sort messages in descending order
      transformedMessages.sort((a, b) => b.createdAt - a.createdAt);

      setMessages(transformedMessages);
    } catch (error) {
      ToastAndroid.show('Error fetching messages', ToastAndroid.SHORT);
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchChat();
    }, []),
  );

  const onSend = newMessages => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
    newMessages.forEach(message => SendChat(message)); // Send each new message
  };

  // Custom renderBubble function to conditionally style messages
  const renderBubble = props => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: 'lightgrey',
        },
        right: {
          backgroundColor: '#366C73',
        },
      }}
    />
  );

  // Custom input toolbar to apply styles to the text input
  const renderInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbar}
        primaryStyle={styles.textInput}
      />
    );
  };

  const user = {
    _id: userid, // Use the sender's ID from props
    name,
    avatar:
      'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png',
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={user}
        renderUsernameOnMessage
        renderBubble={renderBubble} // Use custom bubble render
        renderInputToolbar={renderInputToolbar} // Use custom input toolbar
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#74A2A8', // Change the background color here
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    color: 'black',
    width: '100%',
  },
  inputToolbar: {
    borderTopWidth: 1,
    backgroundColor: 'lightgrey',
    color: 'black',
    padding: 5,
  },
});

export default StudentChat;
