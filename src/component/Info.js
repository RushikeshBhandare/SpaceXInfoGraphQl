import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'

const Info = ({ title, description, isLoading = false }) => {
  return (
    <View
      style={styles.nameContainer}
    >
      <Text
        style={styles.title}
      >
        {title}
      </Text>
      {
        isLoading && (
          <ActivityIndicator />
        )
      }
      <Text
        style={styles.description}
      >
        {description}
      </Text>
    </View>
  )
}


const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: 'row'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'

  },
  description: {
    fontSize: 16,
    width: '70%',
    color: 'white'

  }
})


export default Info