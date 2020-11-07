import React from 'react';
import {
  ApplicationProvider,
  Layout,
  Text,
  Button,
  Input,
} from '@ui-kitten/components';
import {StyleSheet, View, ActivityIndicator, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import * as eva from '@eva-design/eva';
import axios from 'axios';

BASE_URL = 'http://localhost:13000/api/v1'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      email: 'User@gmail.com',
      password:'password',
      errorMsg:'',
      errorOccur: false,
      loading: false
    }
  }

 
  initiateLogin = () =>{
    
     let data={
       email: this.state.email,
       password:this.state.password
     }

     if(this.state.email === '' || this.state.password === ''){
      this.setState({errorMsg: 'Email and password is required', loading: false})
     }else{

     
     this.setState({loading: true, errorMsg:''})
     axios.post(`${BASE_URL}/user/login`,data)
     .then(response =>{
       this.setState({loading: false})
       console.log('!!!!!!!!!!!!!!', response.data)
       AsyncStorage.setItem('user_details', JSON.stringify(response.data))
       this.props.navigation.replace('home')

     }).catch(err =>{
       this.setState({errorMsg: err.response.data.message, loading: false})
       //console.log(err.response.data);
     })
    }
  // 
  }

  render() {
    return (
      <ApplicationProvider {...eva} theme={eva.light}>
        <Layout style={styles.layout}>
          <React.Fragment>
            <View style={styles.row}>
              <Text style={styles.text} category="h2">
                LOGIN
              </Text>
            </View>
            <View style={styles.username}>
              <Input label="User Name" placeholder="Your Username"
              onChangeText={email=>this.setState({email})} />
            </View>
            <View style={styles.password}>
              <Input
                label="Password"
                placeholder="Password"
                caption="Should contain at least 8 symbols"
                secureTextEntry
                onChangeText={password=>this.setState({password})}
              />
            </View>
            <Layout style={styles.forgotText} level="3">
              {/* <Text>Forgor username and password?</Text> */}
            </Layout>
            <Layout style={styles.buttonLogin} level="3">
              <Button
                onPress={this.initiateLogin}
                status="success">
                Login
              </Button>
              {
                this.state.loading ? <ActivityIndicator size='large' style={styles.indicator}/> : null
              }
              
             
            </Layout>
            {this.state.errorMsg.length > 0 ? <Text style={styles.errorText}>{this.state.errorMsg}</Text> : null}
          </React.Fragment>
          
          
        </Layout>
        <View style={styles.sign_up_container}>
            <Text>Don't have an account ?</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('signupstep')}><Text style={styles.sUp}>Sign up</Text></TouchableOpacity>
          </View>
      </ApplicationProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  input: {
    margin: 2,
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
  },
  password: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
  },
  forgotText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor:'transparent'
  },
  errorText:{
    paddingLeft:30,
    paddingBottom:15,
    paddingTop:15,
    paddingRight:30,
    color:'red'
  },
  indicator:{
    marginTop:10
  },
  sign_up_container:{
    flexDirection:'row',
    paddingLeft:15,
    paddingRight:15,
    paddingBottom:30,
    justifyContent:'center'
  },
  sUp:{
    fontWeight:'bold',
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:'transparent'
  }
});

export default Login;
