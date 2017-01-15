/**
 * Created by Baojun on 2016/12/24.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
}from 'react-native';
import {PropTypes} from 'react';
import {_getBackgroundColor} from '../Values/Colors'
let {width} = require('Dimensions').get('window');
export default class TitleView extends Component {
    static propsTypes = {
        title: PropTypes.string.isRequired,
        onBack: PropTypes.func.isRequired,
    }

    render() {
        return (
            <View style={styles.Container}>
                <TouchableOpacity onPress={this.props.onBack}>
                    <Image source={require('../drawable/ic_left.png')} style={styles.Image}/>
                </TouchableOpacity>
                <Text style={styles.Text}>{this.props.title}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        backgroundColor: _getBackgroundColor(),
        alignItems: 'center',
        width: width,
    },
    Image: {
        width: 20,
        height: 30,
        marginLeft: 8,
        marginTop: 7,
        marginBottom: 7,
    },
    Text: {
        textAlign: 'center',
        fontSize: 25,
        marginLeft: 10,
    }
});