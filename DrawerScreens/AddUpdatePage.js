import React, { Component } from 'react';
 
import { StyleSheet, Alert, View, Button, Picker,Text,TextInput,TouchableOpacity,Modal} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
 
export default class AddUpdatePage extends Component{
 
  constructor(props){ 
    super(props); 
    this.state={ 
      PickerValueHolder : '' 
    }
    this.state = {
      TextInputValue: ''
    }
    this.state = {
      TextInputValue1: '',      
    }    
  }
 
  GetSelectedPickerItem=()=>{ 
    Alert.alert(this.state.PickerValueHolder);
  }

  state = {  
    isVisible: true, //state of modal default false  
    specialIns: '',
    tableNo:'',
  }  
  buttonClickListener = () =>{
    const { TextInputValue }  = this.state ;
    //Alert.alert(TextInputValue);    
    const {TextInputValue1} = this.state;
}

addOrder =()=>{
  console.log('AddOrder'+ this.state.tableNo)
  var dataToSend = {
    user_id:'251',
    rest_id:'3',
    table_id:this.state.tableNo,
    seats:'3',
    menujson:[{}],
    paymentjson:[{}],
    amount:'500',
    paymentmode:'Apple',
    status:this.state.PickerValueHolder,
    transactionid:'1',
    transactiontag:'1',
    comments:'2345',
    orderjson:[{}],
    orderfee :'100',
    special_instruction:this.state.specialIns,
    tip_amount:10,    
  };
  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');

  fetch('http://testweb.izaap.in/moop/api/index.php/service/orders/place?X-API-KEY=MoopApp2021@!', {
    method: 'POST',
    body: formBody,
    headers: {
      //Header Defination
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      //Hide Loader
      //setLoading(false);
      console.log(responseJson);
      // If server response message same as Data Matched
      if (responseJson.status == "success") {
        Alert.alert('Order has been placed successfully');
        console.log('Order has been placed successfully');
        this.props.navigation.navigate('orderScreenStack',{Screen:'orderScreen'})

      } else {
        setErrortext('Error');
      }
    })
    .catch((error) => {
      //Hide Loader
      //setLoading(false);
      console.error(error);
    });
}

 render() {
   return (
        <View style={styles.container}>
        <View>
        <ScrollView> 
          <View style={{flexDirection: 'row',top:20}}>
             <Text style={{  flex: 1, padding: 10, fontSize:18, fontWeight:'bold'}}>
               {'Table No :'}
             </Text>   
             <TextInput
                placeholder='Enter Table No'
                placeholderTextColor='#303030'
                onChangeText={(tableNo) => this.setState({ tableNo })}
                value={this.state.tableNo}
                style={{
                 borderWidth: 3,
                 borderRadius:10,
                 borderColor: '#000',
                 flex: 1,
                 padding: 15,
                 right:70,
                 width:100,
                 height:50   
                }}/>
          </View>

              <View style={{flexirection:'row',
              top:35}}>
              <Text style={{padding: 10,fontSize:18,fontWeight:'bold',right:40,left:20}}>
                {'Status :'}
              </Text>
    
            <View style={{width:186,height:50,bottom:50,borderWidth:3,borderRadius:10,left:100,}}>
            <Picker 
                
            selectedValue={this.state.PickerValueHolder}
    
            onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} >
    
            <Picker.Item label="Active" value="Active" />        
            <Picker.Item label="Completed" value="Completed" />
            
          </Picker>
          </View>
      
        </View>

        <View style={{flexDirection:'row',}}>
          <Text style={{fontSize:18,left:10,top:10,fontWeight:'bold'}}>
            Special Instructions
          </Text>
          <TextInput
              placeholder='Enter Instructions Here '
                placeholderTextColor='#303030'                
                onChangeText={(specialIns) => this.setState({ specialIns })}
                value={this.state.specialIns}
                style={{
                  borderWidth: 2,
                  borderRadius:10,
                  flexDirection:'row',
                  borderColor: '#000',
                  padding: 15,
                  width:300,
                  height:100,
                  right:160,
                  top:60,
                  fontWeight:'bold',
                  fontSize:18,                  
                }}
                />
      
        </View>

    <View>
    <TouchableOpacity style={styles.btn} onPress = {() => {this.setState({ isVisible: true})}}>

    <Text style={styles.btnTxt}>AddItem</Text>
    </TouchableOpacity>

    </View>
    <View style={styles.MainContainer}>

    <Text style={{fontSize:20}}>ITEM:{this.state.TextInputValue}</Text>
    <Text style={{fontSize:20,top:10}}>PRICE: ${this.state.TextInputValue1}</Text>

    </View>

    <TouchableOpacity style={styles.btn1}>
        <Text style={styles.btnTxt} onPress = {this.addOrder}>Add/Update</Text>
    </TouchableOpacity>

    <View style = {styles.conta}>  
        <Modal animationType = {"fade"} transparent = {true} visible = {this.state.isVisible}  
          onRequestClose = {() =>{ console.log("Modal has been closed.") } }>  
              <View style = {styles.modal}>  
                <Text style = {styles.text}>ADD ITEM PRICE</Text> 
                <TextInput 
                  style={{height:40,width:200,borderWidth:1,bottom:20,borderRadius:10}}
                  onChangeText={TextInputValue => this.setState({TextInputValue})}
                  placeholder="Item">
                </TextInput>

                <TextInput 
                    style={{height:40,width:200,borderWidth:1,bottom:10,borderRadius:10}}
                    onChangeText={TextInputValue1 => this.setState({TextInputValue1})}
                    placeholder="Price">
                </TextInput>

                <Button 
                    style={styles.bu} title="ADD" onPress = {() => {this.setState({ isVisible:!this.state.isVisible})}}                 
                />  
              </View>  
        </Modal>  

        </View>
        </ScrollView>
        </View>

	    </View>
    );
   }
  }        
 

 
const styles = StyleSheet.create({ 
  MainContainer: 
  {
    top:20,
     width:250,
    height:120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius:10,
    borderColor: 'black',
    left:50,
    marginTop: (Platform.OS === 'ios') ? 20 : 0
  },
 container: {
  flex: 1,
  alignItems: 'center',
  backgroundColor: 'white',
  //marginTop: 10,
  marginRight:1, 
},
btn1:{
  height:40,
  width:250,    
  fontWeight:'bold',        
  borderWidth:2,
  borderRadius:10,
  marginLeft:50,
  bottom:20,
  marginTop:100,
  justifyContent:'center',
  alignItems:'center',
},
btnTxt:{
color:'black',
fontWeight:'bold',
fontSize:20,
},
btn:{
    height:40,
    width:120,            
    borderWidth:2,
    borderRadius:80,
    fontWeight:'bold',        
    marginLeft:100,
    marginTop:90,
    justifyContent:'center',
    alignItems:'center',
},
conta: {  
  alignItems: 'center',  
  justifyContent: 'center',  
  backgroundColor: '#ecf0f1',  
},  
modal: {  
justifyContent: 'center',  
alignItems: 'center',   
backgroundColor : "#00BCD4",   
height: 250 ,  
width: '70%',  
borderRadius:10,  
borderWidth: 2,  
borderColor: '#fff',    
marginTop: 80,  
marginLeft: 40,  
top:50, 
 },  
 text: {  
    color: '#3f2949',  
    marginTop: 10 ,
    bottom:30,
    fontSize:20,    
   } ,
});
 
