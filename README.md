# DriveMaster
Final project for Web tech

## 玩法思路
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本项目为赛车游戏，设计思路为车辆默认情况下是匀速运动，玩家的操作，让车辆做一个相对运动，同时视角会做一个旋转，又支持车辆的第一视角、第三视角的切换，这样一来，能够同时带来更好的游戏体验。<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;游戏中，路上存在障碍物、过往车辆与随机的奖励、buff等，碰撞到障碍物与车辆会扣分，碰撞到奖励与buff会得到对应的效果，同时游戏可以暂停、关闭音效。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;游戏共分两个模式：自由模式与竞速模式。<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;自由模式下，车辆速度可以自行调整，并且没有时间限制，有独有的限时不碰撞挑战buff，但是不能够将分数上传到服务器与排行榜比较。<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;竞速模式下，车辆速度不能自行调整，有时间倒计时，随着时间流逝自动加速，在倒计时结束后，分数会被发送到服务器，如果比现有的前十名分数高，会列入榜单。

## 开发环境

  前端开发框架：three.js <br>
  
  后端开发语言：Java
  
  数据库：mongoDB
  
  后端技术：SpringBoot
  
  云服务平台：腾讯云
  
  服务器：nginx


