import React from 'react';
import { useRoute } from '@react-navigation/native';
import MainContainer from './MainContainer';

const Layout = (Component) => {
  return (props) => {
    const route = useRoute();
    const renderBars = route.name !== 'Login' && route.name !== 'Signup';

    return (
      <MainContainer renderBars={renderBars}>
        <Component {...props} />
      </MainContainer>
    );
  };
};

export default Layout;
