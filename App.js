import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native'
import React, { useState } from 'react'
import { RNCamera } from 'react-native-camera'

const PendingView = () => (
  <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{ fontSize:30, color: 'red'}}>Loading....</Text>
  </View>
)

const App = () => {

  const [image, setImage] = useState()
  const takePicture = async (camera) => {
    try {
      const option = {quality: 0.9, base64: false}
      const data = await camera.takePictureAsync(option)
      setImage(data.uri)
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <View style={styles.continue}>
      {image ? (
        <View style={styles.preview}>
          <Text style={styles.camtext}>Here is you new Profile Pic</Text>
          <Image style={styles.clicked} source={{uri: image, width: '100%', height: '80%'}} />
          <Button title='Click new image' onPress={() => {
            setImage(null)
          }}></Button>
        </View>
      ) : (
        <RNCamera 
        style={styles.preview} 
        type={RNCamera.Constants.Type.back} 
        captureAudio={false}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions= {{
          title: 'Permission to use camera',
          message: 'longer text to use camara',
          buttonPositive: 'ok',
          buttonNegative: 'Cancell'
        }}
        androidRecordAudioPermissionOptions= {{
          title: 'Permission to use audio',
          message: 'longer text to use audio',
          buttonPositive: 'ok',
          buttonNegative: 'Cancell'
        }}
        >
          {({camera, status}) => {
            if (status !== 'READY') return <PendingView/>
            return(
              <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => {takePicture(camera)}} style={styles.capture}>
                  <Text>
                    SNAP
                  </Text>
                </TouchableOpacity>
              </View>
            )
          }}
        </RNCamera>
      )}
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  continue : {
    flex:1,
    flexDirection: 'column',
    backgroundColor: '#0a79df'
  },
  preview : {
    flex:1,
    justifyContent:'space-around',
    alignItems: 'center'
  },
  capture: {
    flex:0 ,
    backgroundColor:'#ffa500',
    padding: 20,
    alignSelf:'center'
  },
  camtext : {
    backgroundColor: '#3498db',
    color: '#fff',
    marginBottom: 10,
    width : '100%',
    textAlign: 'center',
    paddingVertical: 20,
    fontSize: 25
  },
  clicked: {
    width: 300,
    height: 300,
    borderRadius: 150
  }
})