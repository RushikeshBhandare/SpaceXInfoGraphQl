import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import YouTubePlayer from 'react-native-youtube-iframe'
import Info from './Info'
import moment from 'moment'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/react-hooks'



const ID = "9D1B7E0"
const getDiscription = gql`
query($id: ID!){
  mission(id:$id) {
    description

  }
}
`
const Card = ({ item }) => {
  const { loading, data, error } = useQuery(getDiscription, {
    variables: {
      id: item?.mission_id[0]
    }
  })

  const [extended, setExtended] = useState(true)

  const onPressTitle = () => {
    setExtended(!extended)
  }
  let link = ''

  if (item.links.video_link.includes("https://www.youtube.com/watch?v=")) {
    link = item.links.video_link.replace('https://www.youtube.com/watch?v=', '')
  } else {
    link = item.links.video_link.replace('https://youtu.be/', '')
  }

  const date = moment(new Date(item.launch_date_local)).format('MMMM Do YYYY, h:mm a')


  return (
    <View style={styles.rootContainer}>
      <View
        style={styles.container}
      >
        <TouchableOpacity
          onPress={onPressTitle}
        >
          <Text
            style={styles.titleText}
          >
            {item.mission_name}
          </Text>
        </TouchableOpacity>
        {
          extended && (
            <View
              style={styles.extendedContainer}
            >
              <View
                style={styles.YoutubeContainer}
              >
                <YouTubePlayer
                  height={180}
                  width={"90%"}
                  videoId={link}
                />
              </View>
              <Info
                title={"Launch Date : "}
                description={date}
              />

              <Info
                title={"Launch Site : "}
                isLoading={loading}
                description={item?.launch_site?.site_name}
              />

              <Info
                title={"Description : "}
                description={data?.mission?.description}
              />

            </View>
          )
        }
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '90%',
    borderRadius: 4,
    marginVertical: 10,
    backgroundColor: 'white',
    // backgroundColor: '#ffbd66',
    backgroundColor: 'rgba(247, 171, 7, 0.4)'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    color: 'white'
  },
  extendedContainer: {
    width: '100%',
    borderTopColor: 'white',
    borderTopWidth: 0.5,
    padding: 10
  },
  YoutubeContainer: {
    width: '100%',
    alignItems: 'center'
  }
})

export default Card