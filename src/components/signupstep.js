import React from 'react';
import {
  ApplicationProvider,
  Layout,
  Text,
  Button,
  Input,
  Icon,
} from '@ui-kitten/components';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import * as eva from '@eva-design/eva';
import {TouchableWithoutFeedback} from 'react-native';
import axios from 'axios';
import {BASE_URL} from '../helper/utilities'

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

class SignUpStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      userNameValue: '',
      name:'',
      email:'',
      username:'',
      password:'',
      errorMsg:'',
      loading: false
    };
  }

  handleSignup=()=>{
  //  this.props.navigation.navigate('home')

  let data={
    email: this.state.email,
    password:this.state.password,
    name:this.state.name,
    username:this.state.username
  }
  console.log('===================', data)

  if(this.state.email === '' || this.state.password === '' || this.state.username === ''|| this.state.fullname === ''){
   this.setState({errorMsg: 'All fields are required', loading: false})
  }else{

  
  this.setState({loading: true, errorMsg:''})
  axios.post(`${BASE_URL}user/signup`,data)
  .then(response =>{
    this.setState({loading: false})
    ///AsyncStorage.setItem('user_details', JSON.stringify(response.data))
    this.props.navigation.replace('login')

  }).catch(err =>{
    this.setState({errorMsg: err.response.data.message, loading: false})
    console.log(this.state.errorMsg);
  })
 }
  }
  render() {
    return (
      <ApplicationProvider {...eva} theme={eva.light}>
        <Layout style={styles.layout}>
          <React.Fragment>
            <View style={styles.row}>
              <Text style={styles.text} category="h2">
                Great!
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text} category="h5">
                Now let's set up your account details
              </Text>
            </View>
            <View style={styles.username}>
              <Input label="Full name" placeholder="Name"   
              onChangeText={name => this.setState({name})}/>
            </View>
            <View style={styles.username}>
              <Input label="Email" placeholder="Email" 
                onChangeText={email => this.setState({email})}/>
            </View>
            <View style={styles.username}>
              <Input label="User Name" placeholder="User Name" 
                onChangeText={username => this.setState({username})}/>
            </View>
            <View style={styles.username}>
              <Input label="Password" placeholder="Password" 
                onChangeText={password => this.setState({password})}/>
            </View>
            <Layout style={styles.buttonLogin} level="3">
              <Button
                onPress={this.handleSignup}
                status="success">
                Finish sign up
              </Button>
              {
                this.state.loading ? <ActivityIndicator size='large' style={styles.indicator}/> : null
              }
              
            </Layout>
            {this.state.errorMsg.length > 0 ? <Text style={styles.errorText}>{this.state.errorMsg}</Text> : null}
          </React.Fragment>

        </Layout>
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
  text: {
    marginRight: 10,
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
  },
});

export default SignUpStep;
