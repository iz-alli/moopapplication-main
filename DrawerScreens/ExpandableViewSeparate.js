import * as React from 'react';
import {
    LayoutAnimation,
    StyleSheet,
    View,
    Text,
    ScrollView,
    UIManager,
    TouchableOpacity,
    Platform,
    Alert,
    Image
  } from 'react-native';
//import CustomSidebarMenu from '../Components/CustomSidebarMenu';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-community/async-storage';


class ExpandableItemComponent extends React.Component {
    //Custom Component for the Expandable List
    constructor() {
      super();
      this.state = {
        layoutHeight: 0,
      };
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.item.isExpanded) {
        this.setState(() => {
          return {
            layoutHeight: null,
          };
        });
      } else {
        this.setState(() => {
          return {
            layoutHeight: 0,
          };
        });
      }
    }
    shouldComponentUpdate(nextProps, nextState) {
      if (this.state.layoutHeight !== nextState.layoutHeight) {
        return true;
      }
      return false;
    }
  

    


    render() {
        const context = this;
        console.log('test', this.props.item.category_name);
        console.log('SubCategory', this.props.item.subcategory.val)
        if(this.props.item.category_name === 'Menu')
        {
          console.log('Menu');
          
          return (
        
            <View>
              {/*Header of the Expandable List Item*/}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.props.onClickFunction}
                style={styles.header}>
                <Text style={styles.headerText}>{this.props.item.category_name}</Text>
              </TouchableOpacity>
              <View
                style={{
                  height: this.state.layoutHeight,
                  overflow: 'hidden',
                }}>
                {/*Content under the header of the Expandable List Item*/}
                {
                    this.props.item.subcategory.map((item, key) => (   
                      //console.log('test', key, item.val),                     
                      //Menu Pages to be added here
                      item.val === 'Menu Type' ? 
                    
                     <TouchableOpacity
                      key={key}
                      style={styles.content}
                      onPress={() => context.props.navObj.navigate('MenuTypeStack',{Screen:'MenuType'})}>
                      <Text style={styles.text}>
                        {item.val}
                      </Text>
                      <View style={styles.separator} />
                    </TouchableOpacity>

                     :

                     item.val === 'Menu Item' ? 

                     <TouchableOpacity
                      key={key}
                      style={styles.content}
                      onPress={() => context.props.navObj.navigate('MenuItemStack',{Screen:'MenuItem'})}>
                      <Text style={styles.text}>
                         {item.val}
                      </Text>
                      <View style={styles.separator} />
                    </TouchableOpacity>
                   
                   :

                   item.val === 'Modifier' ? 

                   <TouchableOpacity
                      key={key}
                      style={styles.content}
                      onPress={() => context.props.navObj.navigate('ModifierStack',{Screen:'Modifier'})}>
                      <Text style={styles.text}>
                         {item.val}
                      </Text>
                      <View style={styles.separator} />
                    </TouchableOpacity>

                    :

                    item.val === 'Categories' ? 

                    <TouchableOpacity
                      key={key}
                      style={styles.content}
                      onPress={() => context.props.navObj.navigate('CategoriesStack',{Screen:'Categories'})}>
                      <Text style={styles.text}>
                        {item.val}
                      </Text>
                      <View style={styles.separator} />
                    </TouchableOpacity>

                      :

                      item.val === 'Labels' ? 

                      <TouchableOpacity
                      key={key}
                      style={styles.content}
                      onPress={() => context.props.navObj.navigate('LabelsStack',{Screen:'Labels'})}>
                      <Text style={styles.text}>
                         {item.val}
                      </Text>
                      <View style={styles.separator} />
                    </TouchableOpacity>

                      :

                   <Text>Data</Text>
                    
                  ))
                }
              </View>
            </View>
          );
        }
        else if(this.props.item.category_name === 'Home'){
          console.log('Home');
          return (
        
            <View>
              {/*Header of the Expandable List Item*/}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => context.props.navObj.navigate('homeScreenStack',{Screen:'HomeScreen'})}
                style={styles.header}>
                <Text style={styles.headerText}>{this.props.item.category_name}</Text>
              </TouchableOpacity>
              <View
                style={{
                  height: this.state.layoutHeight,
                  overflow: 'hidden',
                }}>
                {/*Content under the header of the Expandable List Item*/}
                {
                    this.props.item.subcategory.map((item, key) => (              
                    <TouchableOpacity
                      key={key}
                      style={styles.content}
                      onPress={() => context.props.navObj.navigate('homeScreenStack',{Screen:'HomeScreen'})}>
                      <Text style={styles.text}>
                        {key}. {item.val}
                      </Text>
                      <View style={styles.separator} />
                    </TouchableOpacity>
                  ))
                }
              </View>
            </View>
          );
        }
        else if(this.props.item.category_name === 'Order'){
          console.log('Order');
          return (
        
            <View>
              {/*Header of the Expandable List Item*/}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => context.props.navObj.navigate('orderScreenStack',{Screen:'orderScreen'})}
                style={styles.header}>
                <Text style={styles.headerText}>{this.props.item.category_name}</Text>
              </TouchableOpacity>
              <View
                style={{
                  height: this.state.layoutHeight,
                  overflow: 'hidden',
                }}>
                {/*Content under the header of the Expandable List Item*/}
                {
                    this.props.item.subcategory.map((item, key) => (              
                    <TouchableOpacity
                      key={key}
                      style={styles.content}
                      onPress={() => context.props.navObj.navigate('orderScreenStack',{Screen:'orderScreen'})}>
                      <Text style={styles.text}>
                        {key}. {item.val}
                      </Text>
                      <View style={styles.separator} />
                    </TouchableOpacity>
                  ))
                }
              </View>
            </View>
          );
        }
        else if(this.props.item.category_name === 'Tables'){
          console.log('Tables');
          return (
        
            <View>
              {/*Header of the Expandable List Item*/}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => context.props.navObj.navigate('tablesStack',{Screen:'Tables'})}
                style={styles.header}>
                <Text style={styles.headerText}>{this.props.item.category_name}</Text>
              </TouchableOpacity>
              <View
                style={{
                  height: this.state.layoutHeight,
                  overflow: 'hidden',
                }}>
                {/*Content under the header of the Expandable List Item*/}
                {
                    this.props.item.subcategory.map((item, key) => (              
                    <TouchableOpacity
                      key={key}
                      style={styles.content}
                      onPress={() => context.props.navObj.navigate('tablesStack',{Screen:'Tables'})}>
                      <Text style={styles.text}>
                        {key}. {item.val}
                      </Text>
                      <View style={styles.separator} />
                    </TouchableOpacity>
                  ))
                }
              </View>
            </View>
          );
        }
        else if(this.props.item.category_name === 'Reports'){
          console.log('Reports');
          return (
        
            <View>
              {/*Header of the Expandable List Item*/}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => context.props.navObj.navigate('reportsScreenStack',{Screen:'ReportsScreen'})}
                style={styles.header}>
                <Text style={styles.headerText}>{this.props.item.category_name}</Text>
              </TouchableOpacity>
              <View
                style={{
                  height: this.state.layoutHeight,
                  overflow: 'hidden',
                }}>
                {/*Content under the header of the Expandable List Item*/}
                {
                    this.props.item.subcategory.map((item, key) => (              
                    <TouchableOpacity
                      key={key}
                      style={styles.content}
                      onPress={() => context.props.navObj.navigate('reportsScreenStack',{Screen:'ReportsScreen'})}>
                      <Text style={styles.text}>
                        {key}. {item.val}
                      </Text>
                      <View style={styles.separator} />
                    </TouchableOpacity>
                  ))
                }
              </View>
            </View>
          );
        }
        else if(this.props.item.category_name === 'Transaction'){
          console.log('Transactions');
          return (
        
            <View>
              {/*Header of the Expandable List Item*/}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => context.props.navObj.navigate('transactionScreenStack',{Screen:'Transaction'})}
                style={styles.header}>
                <Text style={styles.headerText}>{this.props.item.category_name}</Text>
              </TouchableOpacity>
              <View
                style={{
                  height: this.state.layoutHeight,
                  overflow: 'hidden',
                }}>
                {/*Content under the header of the Expandable List Item*/}
                {
                    this.props.item.subcategory.map((item, key) => (              
                    <TouchableOpacity
                      key={key}
                      style={styles.content}
                      onPress={() => context.props.navObj.navigate('transactionScreenStack',{Screen:'Transaction'})}>
                      <Text style={styles.text}>
                        {key}. {item.val}
                      </Text>
                      <View style={styles.separator} />
                    </TouchableOpacity>
                  ))
                }
              </View>
            </View>
          );
        }
        else if(this.props.item.category_name === 'Employee'){
          console.log('Order');
          return (
        
            <View>
              {/*Header of the Expandable List Item*/}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => context.props.navObj.navigate('employeeStack',{Screen:'Employee'})}
                style={styles.header}>
                <Text style={styles.headerText}>{this.props.item.category_name}</Text>
              </TouchableOpacity>
              <View
                style={{
                  height: this.state.layoutHeight,
                  overflow: 'hidden',
                }}>
                {/*Content under the header of the Expandable List Item*/}
                {
                    this.props.item.subcategory.map((item, key) => (              
                    <TouchableOpacity
                      key={key}
                      style={styles.content}
                      onPress={() => context.props.navObj.navigate('employeeStack',{Screen:'Employee'})}>
                      <Text style={styles.text}>
                        {key}. {item.val}
                      </Text>
                      <View style={styles.separator} />
                    </TouchableOpacity>
                  ))
                }
              </View>
            </View>
          );
        }
        else if(this.props.item.category_name === 'Logout'){
          console.log('Logout');
          return (        
            <View>
              {/*Header of the Expandable List Item*/}              
              <TouchableOpacity onPress={()=>
              Alert.alert(
                'Log out',
                'Do you want to logout?',
                [
                  {text: 'Cancel', onPress: () => {return null}},
                  {text: 'Confirm', onPress: () => {
                    AsyncStorage.clear();
                    context.props.navObj.replace('Auth');
                  }},
                ],
                { cancelable: false }
              )  
            }>
            <Text style={styles.headerTextLog}>{this.props.item.category_name}</Text>
            </TouchableOpacity>
            </View>
          );
        }
        else{
          return (
        
            <View>
              {/*Header of the Expandable List Item*/}
              
              <View
                style={{
                  height: this.state.layoutHeight,
                  overflow: 'hidden',
                }}>
                {/*Content under the header of the Expandable List Item*/}
                {
                    this.props.item.subcategory.map((item, key) => (              
                    <TouchableOpacity
                      key={key}
                      style={styles.content}
                      onPress={() => context.props.navObj.navigate('OrderScreenStack',{Screen:'OrderScreen'})}>
                      <Text style={styles.text}>
                        {key}. {item.val}
                      </Text>
                      <View style={styles.separator} />
                    </TouchableOpacity>
                  ))
                }
              </View>
            </View>
          );
        }
      
    }
  }
export default class ExpandableViewSeparate extends React.Component {
    //Main View defined under this Class
    constructor() {
      super();
      if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
      this.state = { listDataSource: CONTENT };
    }
  
    updateLayout = index => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const array = [...this.state.listDataSource];
      array[index]['isExpanded'] = !array[index]['isExpanded'];
      this.setState(() => {
        return {
          listDataSource: array,
        };
      });
    };
  
    test = () => {
      console.log('test')
    }

    render() {
      return (
        <View style={styles.container}>

        <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => test()}>
                      <Image source={require('../Images/Log.png')} style={{width: 35, height: 35, marginLeft: 10}}/>
              </TouchableOpacity>
              <Text style={styles.topHeading}>Moop Business</Text>  
        </View>
          

          <View style={styles.sideMenuContainer}>
          
          <ScrollView>
            <View style={styles.profileHeader}>
              <View style={styles.profileHeaderPicCircle}>
                <Text style={{fontSize: 25, color: '#307ecc'}}>
                  {'Moop React'.charAt(0)}
                </Text>
              </View>
              
              <Text style={styles.profileHeaderText}>Moop User</Text>
            </View>
            <View style={styles.profileHeaderLine} />      
          

          
            {this.state.listDataSource.map((item, key) => 
              (
                //console.log('test', key, item),              
                <ExpandableItemComponent
                  key={item.category_name}
                  onClickFunction={this.updateLayout.bind(this, key)}
                  item={item}
                  navObj={this.props.navObj}
                />
              )
            )}
          </ScrollView>
          </View>
        </View>
      );
    }
  }
  
 
  //Dummy content to show
  //You can also use dynamic data by calling webservice
  const CONTENT = [
    {
      isExpanded: false,
      category_name: 'Home',
      subcategory: [],
    },
    {
      isExpanded: false,
      category_name: 'Order',
      subcategory: [],
    },
    {
      isExpanded: false,
      category_name: 'Menu',
      subcategory: [{ id: 1, val: 'Menu Item' }, { id: 2, val: 'Menu Type' }, { id: 3, val: 'Modifier' }, { id: 4, val: 'Categories' }, { id: 5, val: 'Labels' }],
    },
    {
      isExpanded: false,
      category_name: 'Reports',
      subcategory: [],   
    },
    {
      isExpanded: false,
      category_name: 'Employee',
      subcategory: [],
    },
    {
      isExpanded: false,
      category_name: 'Tables',
      subcategory: [],      
    },
    {
      isExpanded: false,
      category_name: 'Transaction',
      subcategory: [],
      
    },
    {
      isExpanded: false,
      category_name: 'Logout',    
      subcategory: []  
    }      
  ];






  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 30,
      backgroundColor: '#F5FCFF',
    },
    topHeading: {
      paddingLeft: 10,
      fontSize: 20,
    },
    header: {
      backgroundColor: '#F5FCFF',
      padding: 16,
      paddingBottom: 10,
    },
    headerText: {
      fontSize: 16,
      fontWeight: '500',
    },
    headerTextLog:{
      fontSize: 16,
      fontWeight: '500',
      margin: 16,
      backgroundColor: '#F5FCFF' 
    },
    separator: {
      height: 0.5,
      backgroundColor: '#808080',
      width: '95%',
      marginLeft: 16,
      marginRight: 16,
    },
    text: {
      fontSize: 16,
      color: '#606070',
      padding: 10,
      marginLeft: 20,
    },
    content: {
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: '#fff',
    },


    sideMenuContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      color: 'white',
      
    },
    profileHeader: {
      flexDirection: 'row',
      backgroundColor: '#DB3133',
      padding: 10,
      height:100,
      textAlign: 'center',
    },
    profileHeaderPicCircle: {
      width: 80,
      height: 80,
      borderRadius: 80 / 2,
      color: 'white',
      backgroundColor: '#ffffff',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    profileHeaderText: {
      color: 'white',
      alignSelf: 'center',
      paddingHorizontal: 10,
      fontWeight: 'bold',
      fontSize:20
    },
  });