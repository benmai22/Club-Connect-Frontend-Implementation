import React from 'react';
import {
  ApplicationProvider,
  Input,
  Button,
  Layout,Datepicker,Icon
} from '@ui-kitten/components';
import {StyleSheet, View, Text} from 'react-native';
import * as eva from '@eva-design/eva';
import moment from 'moment';
import axios from 'axios';
import {BASE_URL} from '../helper/utilities';
import AsyncStorage from '@react-native-community/async-storage'



class AddInterest extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      date:new Date(),
      title:"",
      name:"",
      description:"",
      errorMsg:""
    }
  }

   CalendarIcon = (props) => (
    <Icon {...props} name='calendar'/>
  );

   handleSubmit = async () => {

    let userDetails = await AsyncStorage.getItem('user_details')
    let userObject = JSON.parse(userDetails);
    console.log('**********', userObject.user.id)
    let today = moment();

     if(this.state.title === '' || this.state.name === '' || this.state.description === ''){
       this.setState({errorMsg:'All fields are required'})
    } else if(moment(this.state.date).isBefore(today)){
      this.setState({errorMsg:'invalid date'})
     }else{
       
          this.setState({errorMsg:''})
          data={
            name: this.state.name,
            title: this.state.title,
            description: this.state.description,
            date: this.state.date,
            user: userObject.user.id
          }

          axios.post(`${BASE_URL}post/create`, data)
          .then(response => {
            console.log('====', response.data)
            if(response.data){
                this.setState({
                  title:"",
                  name:"",
                  description:"",
                  errorMsg:""
              })
              this.props.navigation.navigate('home')
            }
            
          })
          .catch(err =>{
            console.log('ERR: ', err.response.data)
          })
     }
    //  if(this.state.title === '' || this.state.name === '' || this.state.description === ''){
    //    this.setState({errorMsg:''})
    //  }
   }

  render() {
    return (
      <ApplicationProvider {...eva} theme={eva.light}>
        <Layout style={styles.layout}>
         <Text style={styles.errorMsg}>{this.state.errorMsg}</Text>
          <React.Fragment>
            <Input style={styles.input} 
            multiline={true} placeholder="Title"
            onChangeText={title=>this.setState({title})} />
            <Input style={styles.input} multiline={true} 
            placeholder="Name"   
             onChangeText={name=>this.setState({name})} />
            <Datepicker
            placeholder='Pick Date'
            style={{width:'95%'}} 
            date={this.state.date}
            onSelect={nextDate => this.setState({date:nextDate})}
          />
            <Input
              style={styles.input}
              multiline={true}
              placeholder="Description"
              onChangeText={description=>this.setState({description})}
              textStyle={{minHeight: 200}}
            />
            <Button style={styles.btn} 
            onPress={this.handleSubmit}
            status="basic">
              Submit
            </Button>
          </React.Fragment>
        </Layout>
      </ApplicationProvider>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00FA9A',
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
    alignItems: 'flex-end',
  },
  errorMsg:{
    paddingBottom:10,
    color:'red',
    fontSize:16
  }
});

export default AddInterest;
