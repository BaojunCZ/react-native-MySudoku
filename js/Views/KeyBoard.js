/**
 * Created by Baojun on 2017/1/14.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Animated,
    TouchableOpacity,
}from 'react-native';
import {PropTypes} from 'react';

let {width} = require('Dimensions').get('window');
let BOARDSIZE = width / 6;
let PADDING = BOARDSIZE / 10;
let REAL_BOARD_SIZE = BOARDSIZE - 2 * PADDING
let PADDING_LEFT = width / 12

export default class KeyBoard extends Component {

    static propsTypes = {
        Num: PropTypes.func.isRequired,
        Finish: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        let animated = new Array(10);
        for (var i = 0; i < animated.length; i++) {
            animated[i] = new Animated.Value(0);
        }
        this.state = {animated};
    }

    render() {
        return (
            <View style={Styles.Content}>
                {this._renderAll()}
                {this._renderFinish()}
            </View>
        )
    }

    //循环添加每个格子
    _renderAll() {
        let result = [];
        let i = 0;
        for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 5; col++) {
                let num = row * 5 + col + 1
                let animated = this.state.animated[num - 1]
                // 位置
                let position = {
                    left: col * BOARDSIZE + PADDING + PADDING_LEFT,
                    top: row * BOARDSIZE + PADDING,
                    transform: [                        // `transform`是一个有序数组（动画按顺序执行）
                        {scale: animated}]
                }
                if (num == 10)
                    num = 'C'
                result.push(this._renderKey(i++, position, num));
            }
        }
        return result;
    }

    //数字及取消
    _renderKey(id, position, num) {
        return (
            <Animated.View
                key={id}
                style={[Styles.Key, position]}
                onStartShouldSetResponder={() => this._clickNum(id, num)}>
                <Text style={Styles.Num}>{num}</Text>
            </Animated.View>
        )
    }

    //完成
    _renderFinish() {
        return (
            <View style={Styles.FinishView}>
                <TouchableOpacity style={Styles.Finish} onPress={this.props.Finish}>
                    <Text style={Styles.FinishText}>完成</Text>
                </TouchableOpacity>
            </View>
        )
    }

    //点击数字键
    _clickNum(id, num) {
        let animated = this.state.animated[id];
        animated.setValue(1.5);
        Animated.spring(
            animated,
            {
                toValue: 1,
                friction: 3,
            }
        ).start();
        this.props.Num(num);
    }

    //点击完成
    _clickFinish() {
        this.props.Finish;
    }
}

const Styles = StyleSheet.create({
    Content: {
        width: width,
        height: BOARDSIZE * 2 + 70,
        backgroundColor: 'transparent',
        marginTop: 30,
    },
    Key: {
        width: REAL_BOARD_SIZE,
        height: REAL_BOARD_SIZE,
        position: 'absolute',
        borderRadius: 10,
        justifyContent: 'center',
        borderWidth: 0.5,
        backgroundColor: 'skyblue'
    },
    FinishView: {
        width: width,
        alignItems: 'center',
        marginTop: BOARDSIZE * 2 + PADDING * 2,
    },
    Finish: {
        backgroundColor: 'skyblue',
        borderRadius: 10,
        justifyContent: 'center',
        borderWidth: 0.5,
        height: REAL_BOARD_SIZE,
        width: REAL_BOARD_SIZE * 2
    },
    FinishText: {
        fontSize: 30,
        textAlign: 'center'
    },
    Num: {
        fontSize: 30,
        textAlign: 'center'
    }
})