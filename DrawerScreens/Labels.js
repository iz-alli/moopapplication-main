import React,{Component} from 'react';
import { TouchableOpacity } from 'react-native';
import{View,Image,ImageBackground,StyleSheet,Text}from 'react-native';


export default class Labels extends Component
{          
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return(
            <View style={{ flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>Labels Listing</Text>
                
            </View>
        );
    }

    delete = () => {
        fetch("http://testweb.izaap.in/moop/api/index.php/service/orders/remove?X-API-KEY=MoopApp2021@!&order_id=694", {
      method: 'GET',
      
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.text())
      .then((response) => {
        console.log("Text")
        console.log(response)
        return response.text();
     })
      .then((responseJson) => {
        //Hide Loader
        //setLoading(false);
        console.log(response.json())
        console.log(responseJson.status);
        // If server response message same as Data Matched
        if (responseJson.status === 'success') {
          // AsyncStorage.setItem('user_id', responseJson.data['id']);
          // console.log(responseJson.data['id']);
          // navigation.replace('DrawerNavigationRoutes');

        } else {          
          console.log('Error');
        }
      })
      .catch((error) => {
        //Hide Loader
        //setLoading(false);
        console.log("Error Catch")
        console.error(error);
      });
    }
}

const styles=StyleSheet.create(
    {
        txtt:{
            fontSize:40,
            top:150,
            color:'red',
            fontStyle:'italic',            
        },
    });