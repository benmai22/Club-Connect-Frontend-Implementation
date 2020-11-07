import React from 'react';
import {ApplicationProvider, Layout, Text, Button} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import {gray} from 'color-name';

import * as eva from '@eva-design/eva';


class SignUp extends React.Component {
  render() {
    return (
      <ApplicationProvider {...eva} theme={eva.light}>
        <Layout style={styles.layout}>
          <React.Fragment>
            <View style={styles.row}>
              <Text style={styles.text} category="h2">
                Sign Up
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text} category="h5">
                Before we sign you up, tell us about your club interests
              </Text>
            </View>
            <View style={styles.buttonLogin} level="1">
              <Button
                style={styles.btnOneLine}
                onPress={() => this.props.navigation.navigate('Login')}
                size="small"
                status="basic">
                Technology
              </Button>
            </View>
            <View style={styles.container} level="2">
              <Button
                onPress={() => this.props.navigation.navigate('Login')}
                size="small"
                style={styles.btnOneLine}
                status="basic">
                Photography
              </Button>
              <Button
                onPress={() => this.props.navigation.navigate('Login')}
                size="small"
                style={styles.btnOneLine}
                status="basic">
                Greek life
              </Button>
            </View>
            <View style={styles.buttonLogin} level="1">
              <Button
                style={styles.btnOneLine}
                onPress={() => this.props.navigation.navigate('home')}
                size="small"
                status="basic">
                Humanities
              </Button>
            </View>
            <View style={styles.buttonRefresh} level="3">
              <Button
                onPress={() => this.props.navigation.navigate('home')}
                size="medium"
                status="success">
                Refresh
              </Button>
            </View>
            <View style={styles.buttonLogin} level="4">
              <Button
                onPress={() => this.props.navigation.navigate('signupstep')}
                size="large"
                status="success">
                Ready to go!
              </Button>
            </View>
          </React.Fragment>
        </Layout>
      </ApplicationProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 60,
    marginRight: 60,
  },
  buttonLogin: {
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    color: '#dcdcdc',
  },
  buttonRefresh: {
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120,
    color: '#dcdcdc',
  },
  text: {
    marginLeft: 10,
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSignUp: {
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnOneLine: {
    width: '50%',
    height: 40,
    marginRight: 5,
  },
});

export default SignUp;
