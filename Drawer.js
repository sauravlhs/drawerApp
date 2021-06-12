import React from 'react';
import { Block, Text, Button } from 'expo-ui-kit';
import { Image, StyleSheet } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from "@react-navigation/stack";
import { Feather, AntDesign } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient"; 

import Dashboard from "./screens/Dashboard";
import Messages from "./screens/Messages";
import Contact from "./screens/Contact";
import Animated from 'react-native-reanimated';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Screens = ({ navigation, style }) => {
    return(
      <Animated.View style={[{flex: 1, overflow: "hidden"} ,style]}>
    <Stack.Navigator screenOptions={{
        headerTransparent : true,
        headerTitle: null,
        headerLeft: () => (
            <Button padding transparent marginHorizontal
             onPress={() => navigation.openDrawer()}
              >
                <Feather name='menu' size={20}/>
            </Button>
        )
    }}
    >
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Messages" component={Messages} />
        <Stack.Screen name="Contact" component={Contact} />
    </Stack.Navigator>
    </Animated.View>
    );
};


const DrawerContent = props => {

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{flex:1}}>
      <Block>
          <Block flex={.04} margin={20} bottom>
              <Image source={{uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png', height: 60, width: 60}} 
              resizeMode = 'center'
              style={{ borderRadius: 30}}
              />
              <Text title marginTop="2x" white >React UI kit</Text>
              <Text size={9} marginTop white>contact: sauravlhs@gmail.com</Text>
          </Block>
          <Block>
      <DrawerItem
        label="Dashboard"
        labelStyle={{ color: "white", marginLeft: -20 }}
        onPress={() => props.navigation.navigate("Dashboard")}
        icon={() => <AntDesign name="dashboard" color="white" size={16}/>}
      />
      <DrawerItem
        label="Messages"
        labelStyle={{ color: "white", marginLeft: -20 }}
        onPress={() => props.navigation.navigate("Messages")}
        icon={() => <AntDesign name="message1" color="white" size={16}/>}

      />
      <DrawerItem
        label="Contact"
        labelStyle={{ color: "white", marginLeft: -20 }}
        onPress={() => props.navigation.navigate("Contact")}
        icon={() => <AntDesign name="phone" color="white" size={16}/>}

        />
       </Block>
      </Block>
      <Block noflex marginBottom="2x">
      <DrawerItem
        label="Logout"
        labelStyle={{ color: "white", marginLeft: -20 }}
        onPress={() => alert("Are you sure you want to logout?")}
        icon={() => <AntDesign name="logout" color="white" size={16}/>}

        />
      </Block>
      
    </DrawerContentScrollView>
    )
}

export default () => {
    const [progress, setProgress] = React.useState(new Animated.Value(0));

    const scale = Animated.interpolate(progress, {
      inputRange : [0,1],
      outputRange : [1,0.8]
    });

    
    const borderRadius = Animated.interpolate(progress, {
      inputRange : [0, 1],
      outputRange : [0, 10]
    });

    const screensStyles = {borderRadius ,transform: [{ scale }]};


    return (
      <LinearGradient style={{ flex: 1 }} colors={["red", "blue"]}>
      <Drawer.Navigator drawerType= "slide"
      overlayColor= "transparent"
      initialRouteName="Dashboard"
      drawerStyle={{width: "50%", backgroundColor: "transparent"}}
      
      drawerContentOptions ={{
        activeBackgroundColor: 'transparent',
        activeTintColor: 'green',
        inactiveTintColor: 'green'
      }}
      sceneContainerStyle={{backgroundColor: 'transparent'}}
      drawerContent={props => { 
        setProgress(props.progress); 
       return <DrawerContent {...props} />;
    }}
    >
        <Drawer.Screen name="Screens">
          {props => <Screens {...props} style={screensStyles} />}
          </Drawer.Screen>
      </Drawer.Navigator>
      </LinearGradient>
    );
};

