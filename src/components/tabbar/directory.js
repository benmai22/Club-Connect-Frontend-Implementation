import React,{useEffect, useState} from 'react';
import {ApplicationProvider} from '@ui-kitten/components';
import {StyleSheet, View, ScrollView} from 'react-native';
import * as eva from '@eva-design/eva';
import {Input, Layout, Button, Avatar, Card, Text} from '@ui-kitten/components';
import SearchBar from 'react-native-search-bar';
import {BASE_URL} from '../../helper/utilities';
import axios from 'axios';
import moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage'




export const Directory = () => {

  const [allPosts, setAllposts] = useState([])
  const [succ, setSucc] = useState('')
  const [errMsg, setErrMsg] = useState('')

  useEffect(async () => {
    axios.get(`${BASE_URL}post/fetchAll`)
    .then(response =>{
      let posts= response.data.posts
      setAllposts(posts)
    })
    .catch(err =>{
      console.log('ERR: ', err)
    })
    let userDetails = await AsyncStorage.getItem('user_details')
    console.log('?/////', userDetails)

  },[])

  const handleFollow=async (id)=>{
    let userDetails = await AsyncStorage.getItem('user_details')
    let newUser = JSON.parse(userDetails)
  
    axios.post(`${BASE_URL}post/subscribe`,{postId:id, user:newUser.user.id })
    .then(response =>{
      if(response){
        console.log('RES: ', response.data)
        setSucc(response.data.message) 
      }
    })
    .catch(err =>{
      console.log('ERR: ', err.response.data)
      setErrMsg(err)
    })
  }
  const Header = (props) => (
    <View {...props}>
      <Text category="h6">{props.title}</Text>
      <Text category="s1">Click to move club detail</Text>
    </View>
  );
  
  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button style={styles.footerControl} 
      onPress={()=>handleFollow(props.id)}
      size="small" status="success">
        FOLLOW
      </Button>
    </View>
  );
  
  return(
  <ApplicationProvider {...eva} theme={eva.light}>
    <Layout style={styles.layout} level="1">
      <React.Fragment>
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          status="info"
          placeholder="Search"
          style={{
            borderColor: '#333',
            backgroundColor: '#fff',
          }}
          textStyle={{color: '#000'}}
        />
        {/* <View style={styles.container}>
          <Button style={styles.btn} status="basic">
            Random club
          </Button>
          <Button style={styles.btn} status="basic">
            All club
          </Button>
        </View> */}
        {
          allPosts.length === 0 ? <Text>No Events</Text> :(
          
          <ScrollView horizontal={true}>
            <Text>{succ}</Text>
            {
              allPosts.map(item =>{
                return <Card style={styles.card}
                key={item._id}
                 header={(props) => <Header title={item.title}/>}
                footer={props => <Footer id={item._id}/>}>
                    <Text>Date: {moment(item.date_created).fromNow()}</Text>
                    <Text>{item.title}</Text>
                    <Avatar
                      style={styles.avatar}
                      size="giant"
                      source={require('../../assets/primary-logo.png')}
                    />
                    <Text>{item.description.substring(0, 40)}...</Text>
               </Card>
              })
            }
            
          
        </ScrollView>
          )
        }
        
      </React.Fragment>
    </Layout>
  </ApplicationProvider>
)
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
    padding:10,
    paddingLeft:20,
    borderRadius:10
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
    alignItems: 'center',
    backgroundColor: '#00FA9A',
  },
  input: {
    marginRight: 10,
    marginLeft: 10,
  },
  row: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  avatar: {
    width: 200,
    marginTop: 20,
    marginBottom: 20,
  },
  btn: {
    width: '40%',
    height: 40,
    marginRight: 1,
  },
});

export default Directory;
