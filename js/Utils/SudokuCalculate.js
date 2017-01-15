/**
 * Created by Baojun on 2016/12/23.
 */
//获取数独题目
export function _getSudoku(hard) {
    let Sudoku = _calculateData();
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            Sudoku[x][y] = {num: Sudoku[x][y], type: 1}
        }
    }
    for (let i = 0; i < hard; i++) {
        let x = Math.floor(Math.random() * 9);
        let y = Math.floor(Math.random() * 9);
        if (Sudoku[x][y].type == 0) {
            i--
        } else {
            Sudoku[x][y] = {num: 0, type: 0};
        }
    }
    console.log(Sudoku);
    return Sudoku;
}

//计算完整数独表
export function _calculateData() {
    _initMyFunc();
    let count = 0;
    let rootArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    //二维数组存放数独
    let Sudoku = new Array(9);
    for (let i = 0; i < 9; i++) {
        Sudoku[i] = new Array(9);
    }
    //打乱数组后赋值给第一行
    _caosArray(rootArray);
    _caosArray(rootArray);
    Sudoku[0] = rootArray.concat();
    for (x = 1; x < 9; x++) {
        //每行赋值前先打乱数组,保证与上一行不同
        _caosArray(rootArray);
        let rowArray = rootArray.concat();
        for (y = 0; y < 9; y++) {
            //删除行内重复数字
            tempNum = Sudoku[x][y - 1];
            rowArray.remove(tempNum);
            _caosArray(rowArray);
            //删除列内重复数字，复制一份行数组，行内循环中，保持rowArray每次减一个重复数字
            let tempRowArray = rowArray.concat();
            for (let m = x - 1; m >= 0; m--) {
                tempNum = Sudoku[m][y];
                tempRowArray.remove(tempNum);
                count++;
            }
            // console.log('before rowArray=>>>>' + rowArray);
            // console.log('before tempRowArray=>>>>' + tempRowArray);
            // console.log('before y=>>>>' + y);
            //删除3X3中的重复数字,就是当前行上面两行说有数字
            //计算穿小格中的相对位置
            let positionX = x % 3;
            let positionY = y % 3;
            for (positionX; positionX > 0; positionX--) {
                for (let a = 0; a < 3; a++) {
                    if (a != positionY) {
                        tempNum = Sudoku[x - positionX][y - positionY + a];
                        tempRowArray.remove(tempNum);
                        // console.log("tempNum=>>>>>" + tempNum);
                        count++;
                        if (count > 2500)
                            return -1;
                    }
                }
            }
            if (tempRowArray.length > 0) {
                Sudoku[x][y] = tempRowArray[0];
            } else {
                _caosArray(rootArray);
                rowArray = rootArray.concat();
                y = -1;
            }
            // console.log("after tempRowArray=>>>>>" + tempRowArray);
            // console.log("after rowArray=>>>>>" + rowArray);
            // console.log("after y=>>>>>" + y);
        }
    }
    console.log(Sudoku);
    console.log('计算' + count + '次');
    return Sudoku;
}

//校验数独
export function _checkSudoku(Sudoku) {
    let result = {code: 0}
    //检查时候有空格
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            if (Sudoku[x][y].num == 0) {
                result.msg = '请填满所有空格'
                return result
            }
        }
    }
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            //行是否有相同
            for (let z = 8 - y; z > 0; z--) {
                if (Sudoku[x][y].num == Sudoku[x][9 - z].num) {
                    result.msg = '错误，请检查'
                    return result
                }
            }
            //列是否有相同
            for (let z = 8 - x; z > 0; z--) {
                if (Sudoku[x][y].num == Sudoku[9 - z][y].num) {
                    result.msg = '错误，请检查'
                    return result
                }
            }
            //九宫格是否相同
            let positionX = x % 3;
            let positionY = y % 3;
            for (let m = positionX + 1; m < 3; m++) {
                for (let n = 0; n < 3; n++) {
                    if (n != positionY) {
                        if (Sudoku[x][y].num == Sudoku[x + m - positionX][y + n - positionY].num) {
                            console.log('(' + x + ',' + y + ')')
                            console.log('(' + (x + m) + ',' + (y + n) + ')')
                            result.msg = '错误，请检查'
                            return result
                        }
                    }
                }
            }
        }
    }
    result.code = 1
    return result
}

//打乱一个数组
export function _caosArray(array) {
    let temp;
    for (i = 0; i < array.length - 1; i++) {
        if (Math.random() > 0.5) {
            let index = Math.floor(Math.random() * array.length);
            temp = array[i];
            array[i] = array[index];
            array[index] = temp;
        }
    }
}

//初始化一些方法
export function _initMyFunc() {
    Array.prototype.indexOf = function (val) {
        for (let i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;
    };
    Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };
}