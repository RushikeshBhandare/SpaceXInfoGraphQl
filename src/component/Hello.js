import { Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/react-hooks'
import { TextInput } from 'react-native-gesture-handler'

const query = gql`
query($userName: String!){
	helo(name:$userName)
}
`

const Hello = () => {

  const [name, setName] = useState("Sunny")
  const userName = name

  const { loading, data, error } = useQuery(query, {
    variables: {
      userName: userName
    }
  }, { useErrorBoundary: false })

  useEffect(() => {
    console.log("Error ", error)
    console.log("isloading ", loading)
    console.log("sunny ", data)

  }, [loading, data])

  return (
    <View
      style={styles.container}
    >
      <View
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(v) => { setName(v) }}
        />
      </View>
      <View
        style={styles.textContainer}
      >
        {
          loading ? (
            <ActivityIndicator />
          ) : (

            <Text
              style={styles.mainText}
            >
              {data?.hello}
            </Text>
          )
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center'
  },
  inputContainer: {
    flex: 1,
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderWidth: 1,
    width: '90%',
    fontSize: 24,
    paddingLeft: 10,
    borderRadius: 10,
    fontWeight: 'bold'
  },
  textContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },
  mainText: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})
export default Hello