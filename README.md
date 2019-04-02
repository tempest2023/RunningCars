Application created by [ThinkJS](http://www.thinkjs.org)

Front end powered by [React](https://github.com/facebook/react)

## Install dependencies

```
npm install
```

## Start server

```
npm start
```



##Default Config

localhost:9999



##API

> /doc/index.html

 **/putData**

*POST*

Des: 每TICK都要发送地图信息至putData接口,前端会根据Road的status获取当前道路上的车辆并渲染

参数描述：

```json
{
  "cars":[CarObject],
  "Roads":[RoadObject],
  "Cross":[CrossObject]
}

CarObject:
{
  			id : car的id,
        start : car的起点crossid,
        to : car的终点crossid,
        speed : car的速度,
        planTime : car的计划发车时间
}

RoadObject
{
  id : road的id,
  length : road的长度,
  speed : road的限速,
  channel : road的channel,
  start : road的from cross_id,
  to : road的to cross_id,
  isDuplex : road是否双向(1为是,0为否),
  status : 一个[(isDuplex+1)*channel,length]的二维数组,里面存放car的id,表示当前tick道路这个位置有车辆
}

CrossObject
{
  id : cross的id,
	top : cross上方的roadid,
	right : cross右方的roadid,
	bottom : cross下方的roadid,
	left : cross左方的roadid
}
```

**具体发送样例参考/doc/send_views.py**





### 用法说明

```bash
git clone xxx
#解压并进入目录RunningCars
#安装依赖,请自行下载最新版nodejs和npm
npm install
#部署后台服务至9999端口
npm start


#待后台服务运行正常或使用判题器调用send_views.py向后台发送每TICK的data
python3 your_judgement.py

#发送几个tick数据后打开浏览器(推荐Chrome,其他浏览器可能会有错误)
#访问http://127.0.0.1:9999/index
```

运行效果如下

![roads](./doc/roads.png)

圆形是cross，上面数字是crossid，红色是从该cross发车数量，灰色是到达该cross的车辆

中间方块上的黑体字是邻近道路的id和速度

鼠标移到车的方块上可以查看车辆的id和速度

右侧的ctrl面板可以暂停自动tick播放，前进和后退至其他tick

右上角的图标可以隐藏/显示面板

**并且输入车辆id可以追踪车辆**

### License

[MIT licensed](https://github.com/facebook/react/blob/master/LICENSE).