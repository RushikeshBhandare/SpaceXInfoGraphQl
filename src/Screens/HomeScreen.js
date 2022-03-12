import { View, Text, ActivityIndicator, FlatList, StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/react-hooks'
import Card from '../component/Card'
import Images from '../helper/Images'

const launchesPast = gql`
{
  launchesPast {
    id
    mission_name
    mission_id
    launch_date_local
    links {
      video_link
      article_link
      wikipedia
    }
    launch_site {
      site_name_long
      site_name
      site_id
    }
  }
}

`


const HomeScreen = () => {

  const { loading, data, error } = useQuery(launchesPast)

  useEffect(() => {
    console.log("loading ", loading)
    console.log("Data ", data)
    console.log("error ", error)
  }, [loading, data, error])



  return (
    <ImageBackground
      source={Images.spaceX1}
      resizeMode="cover"
      style={{ flex: 1 }}
      blurRadius={3}
    >
      <View
        style={styles.titleContainer}
      >
        <Text style={styles.title}>Spce X Past Launches </Text>
      </View>
      {
        loading &&
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size={'large'} />
        </View>
      }
      <FlatList
        data={data?.launchesPast}
        renderItem={({ item }) => {
          return (
            <Card
              item={item}
            />
          )
        }}
        showsVerticalScrollIndicator={false}
      />

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 30
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    padding: 10,
    color: 'white',
    fontFamily: 'Roboto'
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    marginVertical: 30
  }
})

export default HomeScreen