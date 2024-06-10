// App Navigation Container
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AppNavigator from './AppNavigator';

const AppContainer = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default AppContainer;
