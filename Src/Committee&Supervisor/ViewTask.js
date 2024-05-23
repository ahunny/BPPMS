import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';
import API_URL from '../../apiConfig';

const Viewtask = ({route}) => {
  const {Taskdata} = route.params;
  console.log(Taskdata);

  const downloadFile = async () => {
    const fileName = Taskdata.submittedFile;
    const dirs = RNFetchBlob.fs.dirs;
    const downloadDir = dirs.DownloadDir;
    const getMimeType = fileName => {
      const extension = fileName.split('.').pop().toLowerCase();
      switch (extension) {
        case 'pdf':
          return 'application/pdf';
        case 'ppt':
          return 'application/vnd.ms-powerpoint';
        case 'pptx':
          return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        case 'zip':
          return 'application/zip';
        default:
          return 'application/octet-stream'; // Default for binary data
      }
    };
    const mimeType = getMimeType(fileName);

    try {
      const folderPath = `${downloadDir}/TaskFiles`;

      // Check if the folder exists, create it if not
      const isFolderExists = await RNFetchBlob.fs.isDir(folderPath);
      if (!isFolderExists) {
        await RNFetchBlob.fs.mkdir(folderPath); // Create the folder
      }

      // Construct the file path within the folder
      const filePath = `${folderPath}/${encodeURIComponent(fileName)}`;

      RNFetchBlob.config({
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          mime: mimeType,
          title: 'Task File',
          description: 'Downloading Task File',
          path: filePath,
        },
        fileCache: true,
      })
        .fetch(
          'GET',
          `${API_URL.split('/api')[0]}/TasksFiles/${encodeURIComponent(
            fileName,
          )}`,
          {
            // 'Content-Type': 'application/zip',
          },
        )
        .then(res => {
          ToastAndroid.show('Download Successful.', ToastAndroid.SHORT);
          console.log('The file saved to ', res.path());
        });
    } catch (error) {
      console.error('Download failed:', error);
      ToastAndroid.show('Download Failed.', ToastAndroid.SHORT);
    }
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
        <View style={{marginTop: 50, width: 300}}>
          <Text style={[styles.label]}>Task Description</Text>
          <View
            style={{
              backgroundColor: '#D9D9D9',
              width: 360,
              height: 50,
              borderRadius: 10,
              alignSelf: 'center',
              width: 300,
            }}>
            <Text style={[styles.label, {marginLeft: 15, marginTop: 10}]}>
              {Taskdata.task_description}
            </Text>
          </View>

          <Text style={[styles.label]}>Task File:</Text>
          <View
            style={{
              backgroundColor: '#D9D9D9',
              width: 360,
              height: 50,
              borderRadius: 10,
              alignSelf: 'center',
              width: 300,
            }}>
            <Text style={[styles.label, {marginLeft: 15, marginTop: 10}]}>
              {Taskdata.submittedFile}
            </Text>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={downloadFile}>
            <Text style={styles.buttonText}>Download File</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => props.navigation.navigate('Add Remarks')}>
            <Text style={styles.buttonText}>Add Remarks</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  datePickerButton: {
    backgroundColor: '#D9D9D9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 20,
    width: '50%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  input: {
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#D9D9D9',
  },
  selectContainer: {
    marginTop: 10,
    marginLeft: 20,
  },
  boldText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  selectListStyle: {
    backgroundColor: '#E5E5E5',
    borderColor: '#E5E5E5',
    borderRadius: 20,
    width: 220,
    height: 50,
  },
  selectListInput: {color: 'black', fontSize: 18},
  button: {
    backgroundColor: '#D9D9D9',
    padding: 8,
    borderRadius: 40,
    height: 40,
    width: 130,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 50,
    marginBottom: 50,
  },
  uploadButton: {
    backgroundColor: '#C0C0C0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 15,
    width: '50%',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'black',
  },
  radioContainer: {
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#D9D9D9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 40,
    marginLeft: 160,
    width: '50%',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Viewtask;
