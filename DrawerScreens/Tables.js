// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, {useState, useEffect,Component} from 'react';
       
// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Modal,
  Button,
  Alert,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Card} from 'react-native-shadow-cards';

const Tablesscreen = ({navigation}) => 
{  
  const [isModalVisible, setModalVisible] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const toggleModalVisibility = () => {
		setModalVisible(!isModalVisible);
    };
  const [count, setCount] = React.useState(0);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [menuitem, setMenuitems] = useState([]);

    const item=()=>{
      Alert.alert('hi')
    }


    
    useEffect(() => {       
            
      const unsubscribe = navigation.addListener('focus', () => {
        fetch('http://testweb.izaap.in/moop/api/index.php/service/tables/lists?X-API-KEY=MoopApp2021@!&user_id=251',{
          method: 'GET'
          //Request Type 
          })
          .then((response) => response.json())
          .then((responseJson) => {
            return responseJson.data;
          })
          .then( data  => {
                setMasterDataSource(data);  
          })
          .catch((error) => {
            console.error(error);
          });
      });
  
  return unsubscribe;
      
  }, [navigation]);


    

  
  const ItemView = ({item}) => 
  {  
    let  tableid="", tablename="", seats="", userid="", restid="", status="", isavailable="", seatsbooked="", bookedtime=""; 
    try{   
      tableid=item.id;
      tablename=item.tablename;
      seats=item.seats;
      userid=item.userid;
      restid=item.restid;
      status=item.status;
      isavailable=item.isavailable;
      seatsbooked=item.seatsbooked;
      bookedtime=item.bookedtime; 
    } catch(e) { console.error(e); } 

    return (      
        <View>
          <Card style={{width: '95%', padding: 10, margin: 10, backgroundColor:'#F6FAFE'}}>
          <TouchableOpacity onPress={() => getItem(item)} >                        
            <Text style={styles.itemStyle}>{"TableName : "+ tablename }</Text>
            <Text style={styles.itemStyle}>{"Seats : "+ seats }</Text>
            <Text style={styles.itemStyle}>{"User Id : "+ userid }</Text>
            <Text style={styles.itemStyle}>{"Status : "+ status }</Text>   
            <Text style={styles.itemStyle}>{"Is Available : "+ isavailable }</Text>   
            <Text style={styles.itemStyle}>{"Seats Booked : "+ seatsbooked }</Text>   
            <Text style={styles.itemStyle}>{"Booked Time : "+ bookedtime }</Text>   
          </TouchableOpacity>
          </Card>
        </View>
    );
  };

  const ItemSeparatorView = () => 
  {
    return (
      <View style={{height: 0,width: '100%',backgroundColor: '#C8C8C8'}}/> 
    );
  };

  const getItem=(item)=>
  {
    Alert.alert('TableName : ' + item.tablename + '\n' +'Seats Booked : ' + item.seatsbooked + '\n' +'TableNo : ' + item.table);
  };


  return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>          
          <FlatList
            data={masterDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />
        </View>

      <TouchableOpacity style={styles.addButton} onPress={() =>navigation.navigate('AddTableStack',{Screen:'AddTable'})}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
    itemStyle: {
      padding: 10,
    },
    textInputStyle: {
      height: 40,
      borderWidth: 3,
      paddingLeft: 20,
      borderRadius:10,
      margin: 5,
      borderColor: '#009688',
      backgroundColor: 'yellow',
    },
    container2:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    txt:{
      paddingLeft:100,
      fontSize:22,
      fontWeight:'bold'
    },
    addButton:{
      position:'absolute',
      zIndex:11,
      right:20,
      bottom:50,
      backgroundColor:'#307ecc',
      width:80,
      height:80,
      borderRadius:50,
      alignItems:'center',
      justifyContent:'center',
      elevation:8,
    },
    addButtonText:{
    color:'#fff',
    fontSize:24,
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      height:450,
      width:360,
      alignSelf:'center'
    },
    note: {
      position:'relative',
      padding:20,
      paddingRight:100,
      borderBottomWidth:2,
      borderBottomColor:'#bdb76b',    
    },
});

export default Tablesscreen;