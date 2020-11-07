import React from 'react';
import {ApplicationProvider, Layout, Text, Button} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';

import * as eva from '@eva-design/eva';

class LoginInfo extends React.Component {
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
            <View style={styles.row}>
              <Text style={styles.text} category="h4">
                Are you logging in as a ...
              </Text>
            </View>
            <View style={styles.buttonLogin} level="3">
              <Button
                onPress={() => this.props.navigation.navigate('login')}
                status="success">
                Student
              </Button>
            </View>
            <View style={styles.buttonSignUp} level="3">
              <Button
                onPress={() => this.props.navigation.navigate('login')}
                status="success">
                Club
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
  buttonLogin: {
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
});

export default LoginInfo;
