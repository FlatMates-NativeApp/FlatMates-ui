import React from 'react'
import {
  Text
} from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';

// * STYLES IMPORT
import drawerStyles from '../components/drawerMenu/drawerStyles';
import {palette} from '../styles/theme'

// * COMPONENTS IMPORT
import DrawerMenu from '../components/drawerMenu/DrawerMenu';
import Calculator from '../screens/calculator/Calculator';
import Calendar from '../screens/calendar/Calendar';
import Tasks from '../screens/tasks/Tasks';
import Dashboard from '../screens/dashboard/Dashboard';
import Settings from '../screens/settings/Settings';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator initialRouteName="Dashboard"
    drawerContent={props=><DrawerMenu {...props}/>}
    screenOptions={{
      headerShown: false,
      drawerActiveBackgroundColor: palette.dark,
      drawerActiveTintColor: "black",
      drawerInactiveTintColor: "black"
    }}>
      <Drawer.Screen component={Calculator} name="Calculator" options={
        {drawerIcon: (()=>{
          return <Text style={drawerStyles.icons}>🧮</Text>
        })}
      }/>

      <Drawer.Screen component={Calendar} name="Calendar" options={
        {drawerIcon: (()=>{
          return <Text style={drawerStyles.icons}>🗓</Text>
        })}
      }/>

      <Drawer.Screen component={Tasks} name="Tasks" options={
        {drawerIcon: (()=>{
          return <Text style={drawerStyles.icons}>📋</Text>
        })}
      }/>

      <Drawer.Screen component={Dashboard} name="Dashboard" options={
        {drawerIcon: (()=>{
          return <Text style={drawerStyles.icons}>🛋</Text>
        })}
      }/>
      <Drawer.Screen component={Settings} name="Settings" options={
        {drawerIcon: (()=>{
          return <Text style={drawerStyles.icons}>⚙️</Text>
        })}
      }/>

    </Drawer.Navigator>
  )
}

export default AppStack;
