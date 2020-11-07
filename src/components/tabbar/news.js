import React,{useEffect} from 'react';
import {
  ApplicationProvider,
  Layout,
  Input,
  Button,
  Calendar,
} from '@ui-kitten/components';
import {StyleSheet, View, Text} from 'react-native';
import SearchBar from 'react-native-search-bar';
import * as eva from '@eva-design/eva';
import axios from 'axios';
import {BASE_URL} from '../../helper/utilities'
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment'

// const DayCell = async ({ date }, style) => {

// let interest = AsyncStorage.getItem('interest')
// console.log('=================++', JSON.parse(interest))
//   return (
//   <View
//     style={[styles.dayContainer, style.container]}>
//     <Text style={style.text}>{`${date.getDate()}`}</Text>
//     <Text style={[style.text, styles.value]}>
//       {`${100 * date.getDate() + Math.pow(date.getDate(), 2)}$`}
//     </Text>
//   </View>
// )};




class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      setDate: new Date(),
      iVent:[]
    };
  }

  async componentWillMount(){    
    let interest =  await AsyncStorage.getItem('interest')
    this.setState({iVent:JSON.parse(interest) })

  }

   DayCell = ({ date }, style) => {
    return( <View
    style={[style.dayContainer, style.container]}>
    <Text style={style.text}>{`${date.getDate()}`}</Text>
    {
      this.state.iVent.map(item => {
         return <Text style={[style.text, styles.value]}>
               {moment(item.date_created).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD') ? "A" : null}
            </Text>
      })
    }
    
  </View>
  )
};
  render() {
    return (
      <ApplicationProvider {...eva} theme={eva.light}>
        <Layout style={styles.layout}>
          <React.Fragment>
            {/* <Input
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={this.handleSearch}
              status="info"
              placeholder="Search"
              style={{
                borderColor: '#333',
                backgroundColor: '#fff',
              }}
              textStyle={{color: '#000'}}
            /> */}
            {/* <View style={styles.container}>
              <SearchBar ref="searchBar" placeholder="Search" />
              <Button style={styles.btn} status="basic">
                All events
              </Button>
              <Button style={styles.btn} status="basic">
                Following
              </Button>
            </View> */}
            <View style={styles.row}>
              <Calendar
                style={styles.calendar}
                date={new Date()}
                onSelect={(nextDate) => {}}
                renderDay={this.DayCell}
              />
              {/* <Calendar
                style={styles.calendar}
                date={new Date()}
                onSelect={(nextDate) => {}}
                renderDay={DayCell}
              /> */}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00FA9A',
  },
  container: {
    flexDirection: 'column',
    color:'red',
    // justifyContent: 'space-between',
    // marginTop: 5,
  },
  dayContainer:{
    color:'red'
  },
  calendar: {
    backgroundColor: '#FFFFFF',
    height:'80%',
    // width:'100%'
    // marginBottom: 80,
  },
  btn: {
    width: '40%',
    height: 40,
    marginRight: 1,
  },
});

export default News;
