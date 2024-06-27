import { SafeAreaView, ScrollView, StatusBar, Text, View, Image, TouchableOpacity, PermissionsAndroid, Platform, ActivityIndicator } from "react-native";
import images from '../constants/images';
import icons from '../constants/icons';
import CustomButton from "../components/CustomButton";
import { useEffect, useState } from "react";

export default function Index() {

  const ws = new WebSocket('ws://192.168.60.11:8080');
  const [connected, setConnected] = useState(false);

  const requestBluetoothPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Bluetooth Scanning Permission',
            message: 'This app needs access to your location to scan for Bluetooth devices.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Bluetooth permission granted');
        } else {
          console.log('Bluetooth permission denied');
        }
      } catch (error) {
        console.error('Error requesting Bluetooth permission:', error);
      }
    }
  };

  const sendMoveForward = () => {
    ws.send('1');
  };

  const sendMoveRight = () => {
    ws.send('4');
  };

  const sendMoveLeft = () => {
    ws.send('3');
  };

  const sendMoveBackward = () => {
    ws.send('2');
  };

  const connectSocket = () => {
    ws.onopen = () => {
      console.log('Connected to socket');
      ws.send('Hello from the app!');
    }
  }

  useEffect(() => {
    connectSocket();
    console.log('hi')

    ws.onmessage = (message) => {
      console.log('Received message:', message.data);
    }
  }, []);

  return (
    <SafeAreaView className="h-full bg-white px-2 py-4 flex flex-col items-center">
      <View className="mt-6 px-4 space-y-6 w-full">
        <View className="flex justify-center items-center flex-col my-4">

          <View className="mt-1.5">
            <Image
              source={images.logo}
              className="w-16 h-16"
              resizeMode='contain' />
          </View>

          <Text className="text-lg font-bold text-secondary-200">
            IEMA R&D
          </Text>
        </View>

      </View>

      <View className="flex flex-col justify-center items-start min-h-[120px] bg-main shadow-xl shadow-black pl-10 rounded-lg w-[95%]">
        <Text className="text-lg font-medium text-white">Device Name: Robotic Dog</Text>
        <View className='flex flex-row justify-center items-center'>
          <Text className='text-lg text-white'>Status: Connected</Text>
        </View>

      </View>

      <View className="flex flex-col justify-center items-center mt-16 space-y-16 w-full">
        <CustomButton handlePress={sendMoveForward} icon={icons.up} />

        <View className="flex flex-row justify-between items-center w-[88%]">
          <CustomButton handlePress={sendMoveLeft} icon={icons.left} />

          {/* <TouchableOpacity onPressIn={disconnectSocket} activeOpacity={0.6} className="bg-main rounded-full w-32 h-32 flex justify-center items-center">
            <Image source={icon} className="w-8 h-8" resizeMode='contain' />
          </TouchableOpacity> */}

          <CustomButton handlePress={sendMoveRight} icon={icons.right} />
        </View>

        <View className="flex flex-row justify-center">
          <CustomButton handlePress={sendMoveBackward} icon={icons.down} />
        </View>

      </View>
    </SafeAreaView>
  );
}
