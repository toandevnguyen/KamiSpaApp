import 'react-native-gesture-handler';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
// import { ActivityIndicator, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// import DrawerNavigator from './src/components/cpnLab2/DrawerNavigator';
import useAuth from '../KamiSpaApp/src/hooks/useAuth'; //hook onAuthStateChanged
import MaterialBottomTab from '../KamiSpaApp/src/navigation/GiuaKyKamiSpaNvg/MaterialBottomTab';
import LoginScreen from '../KamiSpaApp/src/screens/GiuaKyKamiSpaScr/LoginScreen';
import WelcomeScreen from './src/screens/GiuaKyKamiSpaScr/WelcomeScreen';
import SignUpScreen from './src/screens/GiuaKyKamiSpaScr/SignUpScreen';

// import { FIRE_BASE_AUTH } from '../App_expo/src/firebase/firebaseConfig'; //getAuth
const NativeStack = createNativeStackNavigator();
const App = () => {
  const userLoginEmail = useAuth();
  console.log(' file: App.js:35 ~ App ~ userLoginEmail:', userLoginEmail.user);
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          {userLoginEmail.user ? (
            <NativeStack.Navigator>
              <NativeStack.Screen
                name="HomeScreen"
                component={MaterialBottomTab}
                // children={({prop}) => <MaterialBottomTab {...prop} infoUserLogin={userLoginEmail.user} />}
                options={{
                  headerShown: false,
                }}
                // console.log("userLoginEmail"),
              />
            </NativeStack.Navigator>
          ) : (
            <NativeStack.Navigator>
              <NativeStack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={{
                  headerShown: false,
                }}
                // children={(props) => <LoginScreen {...props} promptAsync={promptAsync} />}

                // options={{ headerShown: false }}
              />
              <NativeStack.Screen
                name="LoginScreen"
                component={LoginScreen}
                // children={(props) => <LoginScreen {...props} promptAsync={promptAsync} />}

                // options={{ headerShown: false }}
              />
              <NativeStack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                // children={(props) => <LoginScreen {...props} promptAsync={promptAsync} />}

                // options={{ headerShown: false }}
              />
            </NativeStack.Navigator>
          )}
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;

// //Todo: để mai làm
// //? tao làm gì?
// //! cẩn thận mày
