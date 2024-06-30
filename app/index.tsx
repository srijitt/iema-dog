import { SafeAreaView, ScrollView, StatusBar, Text, View, Image, TouchableOpacity, PermissionsAndroid, Platform, ActivityIndicator } from "react-native";
import images from '../constants/images';
import icons from '../constants/icons';
import CustomButton from "../components/CustomButton";
import { useEffect, useState } from "react";

export default function Index() {

  const ws = new WebSocket('ws://192.168.110.129:8765');
  const [connected, setConnected] = useState(false);

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

  const sendHandshake = () => {
    ws.send('0');
  }

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

          <Text className="text-lg font-pextrabold text-secondary-200">
            IEMA R&D
          </Text>
        </View>

      </View>

      <View className="flex flex-col justify-center items-start min-h-[120px] bg-main shadow-xl shadow-black pl-10 rounded-lg w-[95%]">
        <Text className="text-lg font-pmedium text-white">Device Name: Robotic Dog</Text>
        <View className='flex flex-row justify-center items-center'>
          <Text className='text-lg font-pregular text-white'>Status: Connected</Text>
        </View>

      </View>

      <View className="flex flex-col justify-center items-center mt-16 space-y-12 w-full">
        <CustomButton handlePress={sendMoveForward} icon={icons.up} />

        <View className="flex flex-row justify-between items-center w-[88%]">
          <CustomButton handlePress={sendMoveLeft} icon={icons.sit} />

          <TouchableOpacity onPressIn={sendHandshake} activeOpacity={0.6} className="bg-main rounded-full w-28 h-28 flex justify-center items-center">
            <Image source={icons.hand} className="w-12 h-12" resizeMode='contain' />
          </TouchableOpacity>

          <CustomButton handlePress={sendMoveRight} icon={icons.stand} />
        </View>

        <View className="flex flex-row justify-center">
          <CustomButton handlePress={sendMoveBackward} icon={icons.down} />
        </View>

      </View>
    </SafeAreaView>
  );
}
