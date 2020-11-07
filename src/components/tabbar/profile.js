import React from 'react';
import {ApplicationProvider, Text, Button} from '@ui-kitten/components';
import {StyleSheet, View, Image, Alert} from 'react-native';
import * as eva from '@eva-design/eva';
import {Avatar, Layout} from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import {BASE_URL} from '../../helper/utilities'
import axios from 'axios';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      user:{},
      imagePath:'../../assets/user.png',
      msg:"",

      type: "",
      image: null,
      files: '',
    }
  }

async componentDidMount (){
    let name=''
   let uDetails = await AsyncStorage.getItem('user_details')
   let xu = JSON.parse(uDetails);
   console.log('=======KKK=======', xu.user)
   this.setState({user: xu.user, imagePath: xu.user.image})


  }

  handleLogout =()=> {
   // AsyncStorage.setItem('user_details',"");
    this.props.navigation.replace('home')
    
 }

 opengallery=()=>{

  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true
  }).then(image => {
    console.log('**', image)
    let formdata = new FormData();



    var data = new FormData();

    data.append('image', image.path );


    var config = {
      method: 'post',
      url: `${BASE_URL}user/upload2`,
      headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data; boundary=some string",
      },
      data: {image:data, user: this.state.user.id},
  };

  axios(config)
      .then((response) => {
          console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
          console.log(error);
      });







    // formdata.append("image", image.path)
    // formdata.append("user", this.state.user.id)

    // console.log('?????',Object.keys(image));
    // console.log('???==1==??',image.path);
    // this.setState({imagePath: image.path})
    // axios.post(`${BASE_URL}user/upload`, formdata).then(response =>{
    //   if(response){
    //     this.setState({msg:"upload success"})
    //   }
    // }).catch(err =>{
    //   console.log('ERR: ', err.response.data)
    //   this.setState({msg:"error uploading image"})
    // })

  });
 }

  pickMultipleImages =() => {
  ImagePicker.openPicker({
    multiple: true,
    mediaType: "photo",
    // waitAnimationEnd: false,
    // includeExif: true,
    // forceJpg: true,
  }).then(images => {
    // console.log('received images', images);
    console.log('received images mime:=>', images.mime);
    this.setState({
      type: "image/jpeg",
      image: null,
      files: images,
      images: images.map(i => {
        // console.log('received image', i);
        console.log('received images mime::::', i.mime);
        return { uri: i.path, width: i.width, height: i.height, mime: i.mime };
      })
    });
  }).catch(error => {
    console.log(error);
    Alert.alert(error.message ? error.message : error);
  });
}

renderImage(image) {
  return <Image style={{ width: '100%', height: 500, resizeMode: 'cover', marginBottom: 6, borderRadius: 2, borderColor: 'green', borderWidth: 1, }} source={image} />
}
renderAsset(image) {
  if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
    return this.renderVideo(image);
  }
  return this.renderImage(image);
}
  render() {
    return (
      <ApplicationProvider {...eva} theme={eva.light}>
        <Layout style={styles.layout} level="1">
          <React.Fragment>
            <View style={styles.avatarrow}>
              <Image
                style={styles.avatar}
                source={{uri:this.state.imagePath}}
              />
              <Text onPress={this.pickMultipleImages}>Change</Text>
            </View>
            {this.state.image ? this.renderAsset(this.state.image) : null}

            <View style={styles.nameRow}>
              <Text style={styles.text}>
                {this.state.user.username}
              </Text>
              <Text style={styles.text} category="h4">
                {this.state.user.name}
              </Text>
            </View>
            <View style={styles.row}>
              
              {/* <Button
               style={styles.button}
                onPress={() => this.props.navigation.navigate('contact')}
                status="basic">
                Notification Settings
              </Button> */}
              <Button
              style={styles.button}
                onPress={() => this.props.navigation.navigate('profileDetail')}
                status="basic">
                User Settings
              </Button>
              <Button
               style={styles.button}
                onPress={() => this.props.navigation.navigate('addinterest')}
                status="basic">
                Add more interests
              </Button>
              <Button style={styles.btn} 
                  onPress={this.handleLogout}
                  status="basic">
               Logout
            </Button>
            </View>
           
          </React.Fragment>
        </Layout>
      </ApplicationProvider>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#00FA9A',
    padding:10
  },
  avatar: {
     width: 100,
     height:100,
     borderRadius:100
  },
  row: {
    marginTop: 20,
    width:'100%',
  },
  nameRow: {
    marginTop: 5,
    width:'100%',
    paddingLeft:20
  },
  avatarrow: {
    justifyContent:'center',
    alignItems:'center',
    marginTop: 20,
    backgroundColor:'#F9F9F9',
    borderRadius:100,
    width:150,
    height:150
  },
  button:{
    width:'100%',
    padding:5,
    marginTop:5
  },
  text:{
    fontWeight:'bold'
  }
});

export default Profile;
