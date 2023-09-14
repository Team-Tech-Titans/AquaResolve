import React from 'react';
import { View } from 'react-native';
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";

const MainContainer = ({ children, renderBars }) => {
  return (
    <View style={{ flex: 1 }}>
      {renderBars && <TopBar />}
      {children}
      {renderBars && <BottomBar />}
    </View>
  );
};
export default MainContainer;
