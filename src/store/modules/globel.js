import {globelAction} from '../action/globel'
import {globelMutation} from '../mutation/globel'

const globel = {
    state:{
        pop:{
            showPop:false,
            text:"123"
        },
        cart:[{
            title:"可比克有所薯（口味随机）105g*3罐休闲膨化食品零食",
            price:'16',
            count:'2',
            picture:'./static/img/banner3.jpg',
            select:false,
            show:false,
            id:1
          },{
            title:"可比克有所薯（口味随机）105g*3罐休闲膨化食品12",
            price:'66',
            count:'5',
            picture:'./static/img/banner3.jpg',
            select:false,
            show:false,
            id:2
          },{
            title:"可比克有所薯（口味随机）105g*3罐休闲膨化食品13",
            price:'24',
            count:'4',
            picture:'./static/img/banner3.jpg',
            select:false,
            show:false,
            id:3
          },{
            title:"可比克有所薯（口味随机）105g*3罐休闲膨化食品13",
            price:'24',
            count:'4',
            picture:'./static/img/banner3.jpg',
            select:false,
            show:false,
            id:4
          },{
            title:"可比克有所薯（口味随机）105g*3罐休闲膨化食品13",
            price:'24',
            count:'4',
            picture:'./static/img/banner3.jpg',
            select:false,
            show:false,
            id:5
          },{
            title:"可比克有所薯（口味随机）105g*3罐休闲膨化食品13",
            price:'24',
            count:'4',
            picture:'./static/img/banner3.jpg',
            select:false,
            show:false,
            id:6
          },{
            title:"可比克有所薯（口味随机）105g*3罐休闲膨化食品13",
            price:'24',
            count:'4',
            picture:'./static/img/banner3.jpg',
            select:false,
            show:false,
            id:7
          },{
            title:"可比克有所薯（口味随机）105g*3罐休闲膨化食品13",
            price:'24',
            count:'4',
            picture:'./static/img/banner3.jpg',
            select:false,
            show:false,
            id:8
          },{
            title:"可比克有所薯（口味随机）105g*3罐休闲膨化食品13",
            price:'24',
            count:'4',
            picture:'./static/img/banner3.jpg',
            select:false,
            show:false,
            id:9
          },{
            title:"可比克有所薯（口味随机）105g*3罐休闲膨化食品13",
            price:'24',
            count:'4',
            picture:'./static/img/banner3.jpg',
            select:false,
            show:false,
            id:10
          },{
            title:"可比克有所薯（口味随机）105g*3罐休闲膨化食品13",
            price:'26',
            count:'4',
            picture:'./static/img/banner3.jpg',
            select:false,
            show:false,
            id:11
          }],
          userInfo:"",
          newsList:[{
            title:"新闻",
            newList:[],
            target:false, //拖动排序
            isNoMore:false //  true  没有数据了   默认false
          },{
            title:"资讯",
            newList:[]
          },{
            title:"娱乐",
            newList:[],
            isNoMore:false
          },{
            title:"科技",
            newList:[],
            isNoMore:false
          },{
            title:"文化",
            newList:[],
            isNoMore:false
          },{
            title:"游戏",
            newList:[],
            isNoMore:false
          },{
            title:"教育",
            newList:[],
            isNoMore:false
          },{
            title:"动漫",
            newList:[],
            isNoMore:false
          },{
            title:"理财",
            newList:[],
            isNoMore:false
          },{
            title:"金融",
            newList:[],
            isNoMore:false
          }],
          allNewsList:['新闻','资讯','娱乐','科技','文化','游戏','教育','动漫','理财','金融','家居','综艺','美食','足球','财经','NBA','春运'],
          noNewsList:[],
          currentPage:0,  //首页新闻当前page
          objList: {  //分页参数
            page: 1,
            limit: 3,
            filter: "",
            order: ""
          },
    },
    actions:globelAction,
    mutations:globelMutation
}


export default globel;