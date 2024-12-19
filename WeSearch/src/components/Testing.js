import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const Testing = () => {
  const [testname, setTestname] = useState('');
  const [testpassword, setTestpassword] = useState('');
  const [image, setImage] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  const handleChooseImage = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: 'photo', includeBase64: false },
      (response) => {
        if (response.didCancel) {
          Alert.alert('Cancelled image selection');
        } else if (response.errorMessage) {
          Alert.alert('Error: ' + response.errorMessage);
        } else {
          setImage(response.assets[0]);
        }
      }
    );
  };

  const handleSubmit = async () => {
    if (!testname || !testpassword || !image) {
      Alert.alert('Please fill all fields and choose an image');
      return;
    }

    const formData = new FormData();
    formData.append('testname', testname);
    formData.append('testpassword', testpassword);
    formData.append('image', {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });

    console.log(formData)

    try {
      const response = await fetch('http://10.0.2.2:8000/api/v1/test', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage('Success: ' + JSON.stringify(data));
      } else {
        setResponseMessage('Error: ' + JSON.stringify(data));
      }
    } catch (error) {
      setResponseMessage('Network Error: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Test Name:</Text>
      <TextInput
        style={styles.input}
        value={testname}
        onChangeText={setTestname}
        placeholder="Enter test name"
      />
      <Text style={styles.label}>Test Password:</Text>
      <TextInput
        style={styles.input}
        value={testpassword}
        onChangeText={setTestpassword}
        placeholder="Enter test password"
        secureTextEntry
      />
      <Button title="Choose Image" onPress={handleChooseImage} />
      {image && <Image source={{ uri: image.uri }} style={styles.preview} />}
      <Button title="Submit" onPress={handleSubmit} />
      {responseMessage ? <Text style={styles.response}>{responseMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  preview: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginBottom: 15,
  },
  response: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default Testing;
