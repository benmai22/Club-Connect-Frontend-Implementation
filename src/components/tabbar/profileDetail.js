import React from 'react';
import {
  ApplicationProvider,
  Input,
  Button,
  Layout
} from '@ui-kitten/components';
import {StyleSheet, View, Text,ScrollView,ActivityIndicator} from 'react-native';
import * as eva from '@eva-design/eva';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../helper/utilities';

class ProfileDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      oldPassword:'',
      newPassword:'',
      confirmNewPassword:'',
      errorMsg:'',
      successMsg:'',
      updatePasswordLoading:false
    }
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({errorMsg:''})
      this.setState({successMsg:''})
    }, 3000);
  }

  componentWillReceiveProps(nextProps){
    console.log('***************', nextProps)
  }


  handleUpdatePassword =async ()=> {

    let userDetails = await AsyncStorage.getItem('user_details');
    let newUser = JSON.parse(userDetails)
    let email = newUser.user.email

    if(this.state.oldPassword === '' || 
    this.state.newPassword === '' || 
    this.state.confirmNewPassword === ''){
      this.setState({errorMsg:"All fields are required"})
    }else{
      if(this.state.newPassword !== this.state.confirmNewPassword){
        this.setState({errorMsg:"new password and confirm password do not match", updatePasswordLoading:false})
      }else{
        this.setState({updatePasswordLoading:false})
        axios.post(`${BASE_URL}user/updatePassword`,{
          oldPassword:this.state.oldPassword,
          newPassword:this.state.newPassword,
          email:email
        })
        .then(response =>{
          if(response){
            this.setState({successMsg:"Password updated",updatePasswordLoading:false})
          }
        })
        .catch(err =>{
          this.setState({errorMsg:err.response.data.message,updatePasswordLoading:false})
        })

      }
    }

  }

  
  render() {
    return (
      <ApplicationProvider {...eva} theme={eva.light}>
        <Layout style={styles.layout}>
          <ScrollView style={styles.scrolStyle}>
          <React.Fragment>
            {/* <Input
              style={styles.input}
              multiline={true}
              placeholder="Account name:"
            /> */}
            <Text style={styles.text} category="h4">
          Change password: {this.state.successMsg ? <Text style={styles.ssuccessMsg}>{this.state.successMsg}</Text> : <Text style={styles.errorMsg}>{this.state.errorMsg}</Text>}
            </Text>
            <Input
              style={styles.input}
              multiline={true}
              placeholder="Current password"
              onChangeText={oldPassword=>this.setState({oldPassword})}
            />
            <Input
              style={styles.input}
              multiline={true}
              placeholder="New password"
              onChangeText={newPassword=>this.setState({newPassword})}
            />
            <Input
              style={styles.input}
              multiline={true}
              placeholder="Confirm New password"
              onChangeText={confirmNewPassword=>this.setState({confirmNewPassword})}
            />
            <Button 
            onPress={this.handleUpdatePassword}
            style={styles.btn} status="basic">
              Update
             {this.state.updatePasswordLoading ? <ActivityIndicator size="small"/> : null } 
              
            </Button>
          </React.Fragment>
          {/* <React.Fragment>
        
            <Text style={styles.text} category="h4">
              Change username:
            </Text>
            <Input
              style={styles.input}
              multiline={true}
              placeholder="Current password"
            />
            <Button style={styles.btn} status="basic">
              Update
            </Button>
          </React.Fragment> */}
          {/* <React.Fragment>
            <Text style={styles.text} category="h4">
              Change Name:
            </Text>
            <Input
              style={styles.input}
              multiline={true}
              placeholder="Current password"
            />
            <Button style={styles.btn} status="basic">
              Update
            </Button>
          </React.Fragment> */}
         
          {/* <React.Fragment>
            <Text style={styles.text} category="h4">
              Change Name:
            </Text>
            <Input
              style={styles.input}
              multiline={true}
              placeholder="Current password"
            />
            <Button style={styles.btn} status="basic">
              Update
            </Button>
          </React.Fragment> */}
          
          </ScrollView>
        </Layout>
      </ApplicationProvider>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#00FA9A',
  },
  errorMsg:{
    color:'red'
  },
  ssuccessMsg:{
    color:'green'
  },
  scrolStyle:{
    width:'100%'
  },
  text: {
    marginBottom: 5,
    paddingLeft:10,
    fontWeight:'bold',
    paddingTop:10
  },
  input: {
    marginTop: 0,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  row: {
    marginTop: 0,
    marginLeft: 10,
    marginRight: 10,
  },
  btn: {
    margin: 10,
    alignItems: 'flex-end',
    width:'95%'
  },
});

export default ProfileDetail;
