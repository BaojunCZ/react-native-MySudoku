/**
 * Created by Baojun on 2016/12/21.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Navigator,
    BackAndroid,
    Image,
    StatusBar,
}from 'react-native';
import SudokuGame from './js/Activity/SudokuGame'
import {_getBackgroundColor} from './js/Values/Colors'

let {width, height} = require('Dimensions').get('window');
let MyNavigator;
let State;

export default class Sudoku extends Component {

    render() {
        return (
            <View style={Styles.RootView}>
                <StatusBar
                    backgroundColor={_getBackgroundColor()}
                    barStyle="light-content"/>
                <Image
                    style={{width: width, height: height}}
                    source={require('./drawable/bg_game.jpg')}>
                    < Navigator
                        initialRoute={{title: 'Home', ID: 'Home'}}
                        renderScene={(router, navigator)=>this._renderScene(router, navigator)}
                        configureScene={(route, routeStack)=>Navigator.SceneConfigs.FadeAndroid}/>
                </Image>
            </View>
        );
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', function () {
            if (State != 'Home') {
                MyNavigator.pop();
                return true;
            } else {
                return false;
            }
        });
    }

    _renderScene(router, navigator) {
        MyNavigator = navigator;
        State = router.ID;
        switch (router.ID) {
            case 'Home':
                return (
                    <View style={Styles.MenuView}>
                        <TouchableOpacity onPress={()=>navigator.push({title: '简单', ID: 'Easy'}) }
                                          style={Styles.Button}>
                            <Text style={Styles.TextView}>简单</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigator.push({title: '一般', ID: 'Normal'})}
                                          style={[Styles.Button, {marginTop: 40}]}>
                            <Text style={Styles.TextView}>一般</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigator.push({title: '困难', ID: 'Hard'})}
                                          style={[Styles.Button, {marginTop: 40}]}>
                            <Text style={Styles.TextView}>困难</Text>
                        </TouchableOpacity>
                    </View>);
                break;
            case 'Easy':
                return (<SudokuGame navigator={navigator} title={router.title} hard={30}/>);
                break;
            case 'Normal':
                return (<SudokuGame navigator={navigator} title={router.title} hard={37}/>);
                break;
            case 'Hard':
                return (<SudokuGame navigator={navigator} title={router.title} hard={47}/>);
                break;
        }
    }
}

const Styles = StyleSheet.create({
    MenuView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    RootView: {
        flex: 1,
    },
    Button: {
        backgroundColor: 'skyblue',
        justifyContent: 'center',
        width: 150,
        height: 50,
    },
    TextView: {
        fontSize: 30,
        textAlign: 'center',
    },
})

AppRegistry.registerComponent('Sudoku', () => Sudoku);
