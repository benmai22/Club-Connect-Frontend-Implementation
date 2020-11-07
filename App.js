import React from 'react';
import Login from './src/components/login';
import Welcome from './src/components/welcome';
import SignUp from './src/components/signup';
import SignUpStep from './src/components/signupstep';
import LoginInfo from './src/components/logininfo';
import Home from './src/components/home';
import Contact from './src/components/contact';
import AddInterst from './src/components/Addinterest';
import ProfileDetail from './src/components/tabbar/profileDetail';
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'; 

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="welcome">
          <Stack.Screen
            name="welcome"
            component={Welcome}
            navigation={this.props.navigation}
            options={{title: 'Welcome'}}
          />
          <Stack.Screen
            name="login"
            component={Login}
            navigation={this.props.navigation}
            options={{title: 'Login'}}
          />
          <Stack.Screen
            name="signup"
            component={SignUp}
            options={{title: 'Sign up'}}
          />
          <Stack.Screen
            name="logininfo"
            component={LoginInfo}
            options={{title: 'Login info'}}
          />
          <Stack.Screen
            name="signupstep"
            component={SignUpStep}
            options={{title: 'Sign up'}}
          />
          <Stack.Screen
            name="home"
            component={Home}

            options={{title: 'Home'}}
          />
          <Stack.Screen
            name="contact"
            component={Contact}
            options={{title: 'Contact'}}
          />
          <Stack.Screen
            name="addinterest"
            component={AddInterst}
            options={{title: 'Add interest'}}
          />
          <Stack.Screen
            name="profileDetail"
            component={ProfileDetail}
            options={{title: 'Profile Detail'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
