/**
 * Created by Baojun on 2016/12/24.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
}from 'react-native';

import TitleView from '../Views/TitleView'
import BoardView from '../Views/BoardView'

export default class SudokuGame extends Component {

    render() {
        return (
            <View style={Styles.Content}>
                <TitleView title={this.props.title}
                           onBack={()=>this.props.navigator.pop()}/>
                <BoardView hard={this.props.hard}/>
            </View>
        )
            ;
    }

}
const Styles = StyleSheet.create({
    Content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
})