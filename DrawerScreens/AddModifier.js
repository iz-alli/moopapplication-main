import React, { Component } from 'react';
 
import { StyleSheet, Alert, View, Button, Picker,Text,TextInput,TouchableOpacity,Modal} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
 
export default class AddMenuType extends Component{
 
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
    modifierGroupName: '',
    minRequired:'',
    maxAllowed:'',
    modifierName:'',
    modifierPrice:'',
    modifierAltName:'',
  }  
  buttonClickListener = () =>{
    const { TextInputValue }  = this.state;       
    const {TextInputValue1} = this.state;
}

addOrder =()=>{
  console.log('AddMenuType'+ this.state.tableNo)
  var dataToSend = {
    user_id:251,
    rest_id:3,
    seats:3,
    status:1,
    modifier_group_name:this.state.modifierGroupName,
    parentid:0,
    min_required:this.state.minRequired,
    max_allowed:3,
    modifier_name:this.state.modifierName,
    modifier_alt_name:this.state.modifierAltName,
    modifier_price:this.state.modifierPrice,
  };
  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');

  fetch('http://testweb.izaap.in/moop/api/index.php/service/modifiers/add?X-API-KEY=MoopApp2021@!', {
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
        Alert.alert('Modifier has been Added successfully');
        console.log('Modifier has been Added successfully');
        this.props.navigation.navigate('ModifierStack',{Screen:'Modifier'})
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
                    <Text style={{  flex: 1, padding: 3, fontSize:18, fontWeight:'bold'}}>
                    {'Modifier Group Name'}
                    </Text>   
                    <TextInput
                        placeholder='Modifier Group Name'
                        placeholderTextColor='#303030'
                        onChangeText={(title) => this.setState({ title })}
                        value={this.state.modifierGroupName}
                        style={{
                        borderWidth: 1,
                        borderRadius:10,
                        borderColor: '#000',
                        flex: 1,
                        padding: 15,
                        //right:70,
                        width:100,
                        height:50   
                        }}
                    />
              </View>

              <View style={{height: 10}} />

              <View style={{flexDirection: 'row',top:20}}>
                    <Text style={{  flex: 1, padding: 3, fontSize:18, fontWeight:'bold'}}>
                    {'Minimum Required'}
                    </Text>   
                    <TextInput
                        placeholder='Minimum Required'
                        placeholderTextColor='#303030'
                        onChangeText={(minRequired) => this.setState({ minRequired })}
                        value={this.state.minRequired}
                        style={{
                        borderWidth: 1,
                        borderRadius:10,
                        borderColor: '#000',
                        flex: 1,
                        padding: 15,
                        //right:70,
                        width:100,
                        height:50   
                        }}
                    />
              </View>

              <View style={{height: 10}} />

              <View style={{flexDirection: 'row',top:20}}>
                    <Text style={{  flex: 1, padding: 3, fontSize:18, fontWeight:'bold'}}>
                    {'Maximum Allowed'}
                    </Text>   
                    <TextInput
                        placeholder='Maximum Allowed'
                        placeholderTextColor='#303030'
                        onChangeText={(maxAllowed) => this.setState({ maxAllowed })}
                        value={this.state.maxAllowed}
                        style={{
                        borderWidth: 1,
                        borderRadius:10,
                        borderColor: '#000',
                        flex: 1,
                        padding: 15,
                        //right:70,
                        width:100,
                        height:50   
                        }}
                    />
              </View>

              <View style={{height: 10}} />


              <View style={{flexDirection: 'row',top:20}}>
                    <Text style={{  flex: 1, padding: 3, fontSize:18, fontWeight:'bold'}}>
                    {'Modifier Name'}
                    </Text>   
                    <TextInput
                        placeholder='Modifier Name'
                        placeholderTextColor='#303030'
                        onChangeText={(modifierName) => this.setState({ modifierName })}
                        value={this.state.modifierName}
                        style={{
                        borderWidth: 1,
                        borderRadius:10,
                        borderColor: '#000',
                        flex: 1,
                        padding: 15,
                        //right:70,
                        width:100,
                        height:50   
                        }}
                    />
              </View>

              <View style={{height: 10}} />

              <View style={{flexDirection: 'row',top:20}}>
                    <Text style={{  flex: 1, padding: 3, fontSize:18, fontWeight:'bold'}}>
                    {'Modifier Price'}
                    </Text>   
                    <TextInput
                        placeholder='Modifier Price'
                        placeholderTextColor='#303030'
                        onChangeText={(modifierPrice) => this.setState({ modifierPrice })}
                        value={this.state.modifierPrice}
                        style={{
                        borderWidth: 1,
                        borderRadius:10,
                        borderColor: '#000',
                        flex: 1,
                        padding: 15,
                        //right:70,
                        width:100,
                        height:50   
                        }}
                    />
              </View>

              <View style={{height: 10}} />

              <View style={{flexDirection: 'row',top:20}}>
                    <Text style={{  flex: 1, padding: 3, fontSize:18, fontWeight:'bold'}}>
                    {'Modifier Alt Name'}
                    </Text>   
                    <TextInput
                        placeholder='Modifier Alt Name'
                        placeholderTextColor='#303030'
                        onChangeText={(modifierAltName) => this.setState({ modifierAltName })}
                        value={this.state.modifierAltName}
                        style={{
                        borderWidth: 1,
                        borderRadius:10,
                        borderColor: '#000',
                        flex: 1,
                        padding: 15,
                        //right:70,
                        width:100,
                        height:50   
                        }}
                    />
              </View>

              <View style={{height: 10}} />

              <View style={{flexirection:'row', top:35}}>                         
        </View>

        
            <TouchableOpacity style={styles.btn1}>
                <Text style={styles.btnTxt} onPress = {this.addOrder}>Add/Update Modifier</Text>
            </TouchableOpacity>
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
 
