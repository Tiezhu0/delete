import React from 'react'

class ZuJian1 extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            list:[], //展示列表 只能遍历数组
            myInput:"", //记录输入框的值
        }

        //绑定函数事件
        this.handelbutChange = this.handelbutChange.bind(this);
        this.handeldelChange = this.handeldelChange.bind(this);
        this.handelupdateChange = this.handelupdateChange.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.UNSAFE_componentWillMount = this.UNSAFE_componentWillMount.bind(this)
    }

    // =========================================
    // 按钮添加事件
    handelbutChange(){
        this.setState({
            // ...展开运算符，将this.state.list里面的值也就是inputValue里的值放到list中;
            list:[...this.state.list,this.refs.myInput.value]
        },()=>{
            console.log(this.state.list);
            //window对象指当前浏览器窗口，所有全局 JavaScript 对象，函数和变量自动成为 window 对象的成员。
            //localStorage - 没有时间限制的数据存储
            window.localStorage.setItem('myList',this.state.list);  ////存入 参数： 1.调用的值 2.所要存入的数据
        })
        // 点击添加按钮 清空输入框
        this.refs.myInput.value = this.state.myInput
    }

    //键盘操作事件
    keyDown(e){
        if(e.keyCode===13){
            //13是回车键 属于键盘码
            this.handelbutChange();
        }
    }

    // ==========================================
    // 删除事件
    handeldelChange(index) {
        // 删除指定下标  splice用于删除和添加（值1：获取id,值2：删除的数量）
        this.state.list.splice(index, 1)
        // 重新设置状态
        this.setState(
            {list: this.state.list},
            () => {
                window.localStorage.setItem('myList', this.state.list);
            }
        )
    }

    // ==========================================
    // 修改事件
    handelupdateChange(index){
        // 弹出输入框，用于填写新内容
        var rel = window.prompt('请输入修改内容');

        // 判断输入框里的内容不为空的话
        if(rel != null){
            // rel要是修改的
            this.state.list.splice(index,1,rel)
            // 重新设置状态
            this.setState(
                {list:this.state.list,},
                ()=>{
                    window.localStorage.setItem('myList',this.state.list);
                }
            )
        }
    }

    // ===============================================
    // 加载更新时执行，初始化数据，从LocalStorage中查询出来的数据
    UNSAFE_componentWillMount(){
        // 从LocalStorage中获取数据myList
        var myList = window.localStorage.getItem('myList');

        //判断myList里数据是否为空
        if (myList == null || myList === ""){
            //如果为空 就初始化myList数组
            myList=[];
        }
        else{
            // 否则把字符串分割成数组
            myList=myList.split(',');
        }
        // 重新设置状态
        this.setState(
            {
                list:myList
            }
        );
    }

    render() {
        return(
            <React.Fragment>
                <input type="text" ref="myInput" onKeyDown={this.keyDown.bind(this)}/>
                <button onClick={this.handelbutChange}>添加</button>
                <ul>
                    {/*map 循环遍历*/}
                    {this.state.list.map((item,index)=>{
                        return(
                            <li key={index}>
                                {index},{item}
                                {/*ES6箭头函数回调传参方法*/}
                                {/*箭头函数没有this指向，默认是继承外部上下的this，所以箭头函数中的this指向的就是组件*/}
                                <button onClick={(index)=>this.handeldelChange(index)}>删除</button>
                                {/*bind() 传参*/}
                                {/*bind() 方法可以把组件的this代替函数的this*/}
                                <button onClick={this.handelupdateChange.bind(index)}>修改</button>
                            </li>
                        )
                    })}
                </ul>
            </React.Fragment>
        )
    }
}

export default ZuJian1