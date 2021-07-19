import React, { useState, useEffect, Component} from 'react';

import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, Modal,Dimensions, Alert} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';
import {Card} from 'react-native-shadow-cards';

const { width } = Dimensions.get("window");


export default function Basic({navigation}) {
  const [isModalVisible, setModalVisible] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const toggleModalVisibility = () => {
		setModalVisible(!isModalVisible);
    };

  const [listData, setListData] = useState([]);


  useEffect(() => {                   
    const unsubscribe = navigation.addListener('focus', () => {
      fetch('http://testweb.izaap.in/moop/api/index.php/service/orders/lists?X-API-KEY=MoopApp2021@!&user_id=251',{
        method: 'GET'
        //Request Type 
        })
        .then((response) => response.json())
        .then((responseJson) => {
          //console.log(responseJson);
          return responseJson.data;
        })
        .then( data  => {
              setListData(data);    
              console.log('data 1',data);
              if(data != undefined){ 
                      data.map((item, index)=>{  
                        
                      //const obj = JSON.parse(item.menujson);      
                  //     obj.map((objitem, index)=>{       
                   })       
                 // })
              }
              else
              {
                console.log('No Data Found');
                Alert.alert('No Data Found');
              } 
        })
        .catch((error) => {
          console.error(error);
        });
    });  
return unsubscribe;      
}, [navigation]);


  const closeItem = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };


  const onItemOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  
  const ItemView = ({item}) => 
  {        
    let id="", tableid="",seats="",amount="",orderdatetime="",updatedatetime="",completeddatetime="",specialInstruction="", comments="", tipAmount=""; 
    try{   
      tableid=item.tableid;
      seats=item.seats;
      amount=item.amount;
      orderdatetime=item.orderdatetime;
      updatedatetime=item.updatedatetime;
      completeddatetime=item.completeddatetime;
      specialInstruction=item.special_instruction;
      comments=item.comments;
      tipAmount=item.tip_amount;
      id=item.id;
            
    } catch(e) { console.error(e); } 
    return (      
      
        <View>
                
                <Card style={{width: '95%', padding: 10, margin: 10, backgroundColor:'#F6FAFE'}}>
          <TouchableOpacity onPress={() =>{toggleModalVisibility}} style={styles.rowFront} underlayColor={'#fff'}>
            <Text style={styles.itemStyle}>{"Table No : "+ tableid }</Text>  
            <Text style={styles.itemStyle}>{"Seats : "+ seats}</Text>
            <Text style={styles.itemStyle}>{"Amount : "+ amount }</Text>
            <Text style={styles.itemStyle}>{"Comments : "+ comments }</Text>            
            <Text style={styles.itemStyle}>{"Special Instruction : "+ specialInstruction}</Text>
            <Text style={styles.itemStyle}>{"Tip Amount : "+ tipAmount}</Text>
            <Text style={styles.itemStyle}>{"Order Date Time : "+ orderdatetime}</Text>
            <Text style={styles.itemStyle}>{"Update Date Time : "+ updatedatetime}</Text>
            <Text style={styles.itemStyle}>{"Completed Date Time : "+ completeddatetime}</Text>
          </TouchableOpacity>
          </Card>
          
        </View>
    );
  };


  const deleteOrder = (data) => {      
    console.log('Delete Order',data.item.id);
    let dataToSend = {order_id: data.item.id};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch(`http://testweb.izaap.in/moop/api/index.php/service/orders/remove?X-API-KEY=MoopApp2021@!&order_id=${data.item.id}`, {
      method: 'GET',
      
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        
        console.log(responseJson);        
        if (responseJson.status === 'success') {         

        } else {          
          if(responseJson.message === 'No Orders Found!')
          {
            Alert.alert('Order Deleted Successfully')
          }            
        }
      })
      .catch((error) => {
        //Hide Loader
       // setLoading(false);
        Alert.alert(error)
        console.error(error);
      });
  };
 

  const deleteItem = (rowMap, rowKey, data) => { 
    console.log('RowKey delete item**-',data.item.id)
    closeItem(rowMap, rowKey);
    const newData = [...listData];    
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    console.log(rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);    
    deleteOrder(data);
  };



  const renderHiddenItem = (data, rowMap) => {
    console.log(data.item.id);
    console.log(rowMap, data);
    return(
    <View style={styles.rowBack}>
      <TouchableOpacity style={[styles.actionButton, styles.closeBtn]} onPress={() =>navigation.navigate('AddUpdatePageStack',{Screen:'AddUpdatePage'})}>      
        <Text style={styles.btnText}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.actionButton, styles.deleteBtn]} onPress={() => {
        
        Alert.alert(
          'Alert',
          'Are you sure you want to delete ?',
          [
            {text:'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text:'Yes', onPress: ()=> {
              deleteItem(rowMap, data.item.key, data);
            }}
          ],
          { cancelable: true}
        );
        }
      }
      >
        <Text style={styles.btnText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}


  return (
    <View style={styles.container}>
      <SwipeListView
            data={listData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ItemView}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-150}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onItemOpen}
            
      />
      <TouchableOpacity style={styles.addButton} onPress={() =>navigation.navigate('AddUpdatePageStack',{Screen:'AddUpdatePage'})}>
          <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  list: {
    color: '#FFF',
  },

  btnText: {
    color: '#FFF',
    textShadowColor: 'white',    
  },

  rowFront: {
    //alignItems: 'center',
    //backgroundColor: 'lightcoral',
    //borderBottomColor: 'black',
    //borderBottomWidth: 0.5,
    //justifyContent: 'center',
    height: 180,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
  },
  actionButton: {
    alignItems: 'center',
    bottom: 20,
    justifyContent: 'center',
    position: 'absolute',
    top: 20,
    right:60,
    width: 75,
  },
  closeBtn: {
    backgroundColor: 'blue',
    //bottom: 40,
    right: 80,
    //width: 75,
    
    //top: 20,
    // height: '100%'
  },
  deleteBtn: {
    backgroundColor: 'red',
    right: 10,
  },
  
  addButton:{
    position:'absolute',
    zIndex:11,
    right:20,
    bottom:50,
    backgroundColor:'green',
    width:80,
    height:80,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center',
    elevation:8,
  },
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    right:"25%",
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) },
          { translateY: -90 }],
    height: 370,
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  itmtxt:{
    fontSize:20
},
itemStyle: {
  padding: 3,
  fontSize: 10,
},
});
