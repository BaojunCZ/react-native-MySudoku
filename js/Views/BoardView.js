/**
 * Created by Baojun on 2017/1/8.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Alert,
    StatusBar,
}from 'react-native';
import {_getSudoku, _checkSudoku} from '../Utils/SudokuCalculate'
import KeyBoard from '../Views/KeyBoard'


let {width} = require('Dimensions').get('window');
let BOARDSIZE = width / 12;
let SIZE = 9;
export default class BoardView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Sudoku: _getSudoku(this.props.hard),
            focusID: [],
        }
    }

    render() {
        return (
            <View style={Styles.Content}>
                <View style={Styles.BoardContent}>
                    {this._renderAll()}
                </View>
                <KeyBoard Num={(num)=>this._getKeyNum(num)} Finish={()=>this._finish()}/>
            </View>
        )
    }

    //循环添加每个格子
    _renderAll() {
        let result = [];
        let i = 0;
        for (let row = 0; row < SIZE; row++) {
            for (let col = 0; col < SIZE; col++) {
                // 位置
                let position = {
                    left: col * BOARDSIZE,
                    top: row * BOARDSIZE,
                }
                position = this._boardBGC(row, col, position)
                let ViewId = [row, col]
                let num = this.state.Sudoku[row][col]
                result.push(this._renderBoard(i++, position, num, ViewId));
                // console.log("position=>>>(" + position.left + "," + position.top + ")")
            }
        }
        return result;
    }

    _renderBoard(id, position, num, ViewId) {
        if (num.type != 0) {
            return (
                <View style={[Styles.Board, position]} key={id}>
                    <Text style={Styles.Text}>
                        {this._showNum(num.num)}
                    </Text>
                </View>
            )
        } else {
            return (
                <View style={[Styles.Board, position, this._chosen(ViewId)]} key={id}>
                    <Text style={[Styles.Text, {color: 'green'}]}
                          onPress={()=>this._click(ViewId)}>
                        {this._showNum(num.num)}
                    </Text>
                </View>
            )
        }
    }

    //显示的数字
    _showNum(num) {
        if (num != '0') {
            return num
        } else {
            return ' '
        }
    }

    //格子背景色
    _boardBGC(x, y, position) {
        if ((y == 3 || y == 4 || y == 5) && (x != 3 && x != 4 && x != 5)) {
            position.backgroundColor = '#d9d9d9'
        }
        if ((x == 3 || x == 4 || x == 5) && (y != 3 && y != 4 && y != 5)) {
            position.backgroundColor = '#d9d9d9'
        }
        return position
    }

    //被选中
    _chosen(ViewId) {
        if (this.state.focusID.toString() == ViewId.toString())
            return {backgroundColor: 'skyblue'}
    }

    //格子点击事件
    _click(ViewId) {
        let x = ViewId[0]
        let y = ViewId[1]
        this.setState({focusID: ViewId});
    }

    //完成
    _finish() {
        let temp = this.state.Sudoku;
        let result = _checkSudoku(temp)
        if (result.code == 1) {
            Alert.alert('提示', '完成')
        } else if (result.code == -1) {

        } else {
            Alert.alert('提示', result.msg)
        }
    }

    //键盘点击处理
    _getKeyNum(num) {
        if ([].toString() !== this.state.focusID.toString()) {
            let temp = this.state.Sudoku
            temp[this.state.focusID[0]][this.state.focusID[1]].num = num == 'C' ? '0' : num;
            this.setState({Sudoku: temp})
        }
    }

}
const Styles = StyleSheet.create({
    Content: {
        alignItems: 'center',
    },
    BoardContent: {
        width: BOARDSIZE * SIZE,
        height: BOARDSIZE * SIZE,
        backgroundColor: 'transparent',
        marginTop: 50,
    },
    Board: {
        width: BOARDSIZE,
        height: BOARDSIZE,
        position: 'absolute',
        borderWidth: 0.5,
        justifyContent: 'center',
    },
    Text: {
        fontSize: 25,
        textAlign: 'center'
    }
})