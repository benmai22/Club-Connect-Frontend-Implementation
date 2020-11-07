import React,{useEffect, useState} from 'react';
import {
  ApplicationProvider,
  Card,
  Text,
  Layout,
  Input,
  Button,
  Avatar,
} from '@ui-kitten/components';
import {StyleSheet, View, ScrollView} from 'react-native';
import * as eva from '@eva-design/eva';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {BASE_URL} from '../../helper/utilities';
import moment from 'moment';

const Header = (props) => (
  <View {...props}>
    <Text category="h6">{props.title}</Text>
    <Text category="s1">Click to move club detail</Text>
  </View>
);

export const Profile = () => {

  const [subs, setSubs] = useState([])
  const [subs2, setSubs2] = useState([])
  const [errorMsg, setErrorMsg] = useState('')
  const [userDetail, setUserDetails] = useState({})

  useEffect(async() => {

    let user = await AsyncStorage.getItem('user_details');
    let parsedUser = JSON.parse(user)
    setUserDetails(parsedUser.user)
    fetchInterest(parsedUser.user.id )
    

  },[])

  onSearchChange=(text)=> {
    const filteredAssets = subs.filter(asset => asset.title.toLowerCase().indexOf(text.toLowerCase()) !== -1);
   
		if (filteredAssets) {
      setSubs(filteredAssets)
    }
     else {
			setSubs(setSubs2);
		}
  }
  

  const fetchInterest=(user)=>{
    axios.post(`${BASE_URL}post/fetchInterest`,{user: user })
    .then(event => {
      setSubs(event.data.subscription)
      setSubs2(event.data.subscription)
     AsyncStorage.setItem('interest',JSON.stringify(event.data.subscription))
    }).catch(err =>{
      setErrorMsg(err.message)
    })
  }
  const handleUnfollow =(postId)=>{

    data={
      user:userDetail.id,
      postId:postId
    }

    axios.post(`${BASE_URL}post/unsubscribe`,data)
    .then(event => {
      console.log('Unsub success')
     fetchInterest(userDetail.id)
    }).catch(err =>{
      let errms = err.response.data
      setErrorMsg(err.response.data.message)
    })

  }
  
  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button size="small" status="success" onPress={()=>handleUnfollow(props.postId)}>Unfollow</Button>
    </View>
  );
  
  return (<ApplicationProvider {...eva} theme={eva.light}>
    <Layout style={styles.layout} level="1">
      <React.Fragment>
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={onSearchChange}
          status="info"
          placeholder="Search"
          style={{
            borderColor: '#333',
            backgroundColor: '#fff',
          }}
          textStyle={{color: '#000'}}
        />
        <View style={styles.row}>
        <Text>{errorMsg}</Text>
          <Text style={styles.text} category="h4">
            Base on my interested
          </Text>
        </View>
        {
            subs.length === 0 ? (<Text>No Interest</Text>) : (
              <ScrollView horizontal={false}>
                  { subs.map((item) => {
                    return(
                      <Card style={styles.card} header={() => <Header title={item.title}/> } footer={()=> <Footer postId={item._id}/>}>
                      <Text>Date: {moment(item.date_created).format('YYYY-MM-DD hh:mm')}</Text>
                      <Text>{item.name}</Text>
                      <Avatar
                        style={styles.avatar}
                        size="giant"
                        source={require('../../assets/primary-logo.png')}
                      />
                      <Text>{item.description.substring(0, 45)}...</Text>
                    </Card>
                    )
                })} 
             </ScrollView>
            )

        }
       
      </React.Fragment>
    </Layout>
  </ApplicationProvider>
)};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
    padding:10
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00FA9A',
  },
  avatar: {
    width: 200,
    marginTop: 20,
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: '#FFFFFF',
    color: '#FFFFFF',
  },
  container: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    textAlign: 'right',
  },
  row: {
    marginTop: 20,
  },
});

export default Profile;
