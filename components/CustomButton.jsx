import { TouchableOpacity, Image } from 'react-native'
import React from 'react'

const CustomButton = ({ handlePress, icon }) => {
  return (
    <TouchableOpacity onPressIn={handlePress} activeOpacity={0.6} className="bg-main rounded-full w-16 h-16 flex justify-center items-center">
      <Image source={icon} className="w-8 h-8" resizeMode='contain' />
    </TouchableOpacity>
  )
}

export default CustomButton