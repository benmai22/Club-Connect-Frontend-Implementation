import React from 'react';
import {
  ApplicationProvider,
  Layout,
  Text,
  Button,
  Avatar,
} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';

import * as eva from '@eva-design/eva';

class Welcome extends React.Component {
  render() {
    return (
      <ApplicationProvider {...eva} theme={eva.light}>
        <Layout style={styles.layout}>
          <React.Fragment>
            <View style={styles.row}>
              <Avatar
                style={styles.avatar}
                size="giant"
                source={require('../assets/primary-logo.png')}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.text} category="h2">
                Club connect
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text} category="h6">
                Make by computer Science Society
              </Text>
            </View>
            <View style={styles.buttonLogin} level="3"> 
              <Button
                onPress={() => this.props.navigation.replace('login')}
                // onPress={() => this.props.navigation.navigate('logininfo')}
                status="success">
                LOGIN
              </Button>
            </View>
            <View style={styles.buttonSignUp} level="3">
              <Button
                onPress={() => this.props.navigation.navigate('signupstep')}
                // onPress={() => this.props.navigation.navigate('signup')}
                status="success">
                SIGN UP
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
  },
  avatar: {
    width: 200,
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLogin: {
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonSignUp: {
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default Welcome;
