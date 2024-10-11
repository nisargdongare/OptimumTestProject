import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, Alert, Platform, Image } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';

const App = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleScreenshot = async () => {
    setLoading(true);
    try {
      const status = !isActivated ? 'Activated' : 'Deactivated';
      
      const deviceDetails = {
        OS: Platform.OS,
        deviceName: await DeviceInfo.getDeviceName(),
        // macAddress: await DeviceInfo.getMacAddress(),
        imei: await DeviceInfo.getUniqueId(), // This might require additional permissions
        // location: await DeviceInfo.getLastKnownLocation(),
        publicIP: await DeviceInfo.getIpAddress(),
        screenshotStatus: !isActivated,
      };
      Alert.alert(`Screenshot is now ${status} deviceDetails:`, JSON.stringify(deviceDetails));

      await CallAPI(deviceDetails);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to toggle screenshot.');
    } finally {
      setLoading(false);
      setIsActivated(!isActivated);
    }
  };

  const CallAPI = (data:any)=>{
    axios.post('<dummy link to your api>', data)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    }).finally(() => {
      setLoading(false);
    })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Image source={require('./src/images/image003.png')} />
      <Text>{isActivated ? 'Activated' : 'Activate'}</Text>
      <Button title={isActivated ? 'Deactivate' : 'Activate'} onPress={toggleScreenshot} />
      {loading && <ActivityIndicator />}
    </View>
  );
};

export default App;

