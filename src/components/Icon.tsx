import { StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren } from 'react'

type IconProps=PropsWithChildren<{
    name:string
}>

const Icon = ({name}:IconProps) => {
  switch (name) {
    case "cross": 
        return <Text style={styles.cross}>X</Text>
        break;
    case "circle":
        return <Text style={styles.circle}>O</Text>
        break;
    default:
        return <Text style={{color:'#ffffff'}}>?</Text>
        break;
  }
}

export default Icon

const styles = StyleSheet.create({
    cross:{
        color:'red',
        fontSize:38,
        fontWeight:'bold'
    },
    circle:{
        color:'green',
        fontSize:38,
        fontWeight:'bold'
    }
})