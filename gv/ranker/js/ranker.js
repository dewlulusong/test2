/**
 * Created by Administrator on 2019/4/30.
 */

var agentCode = GetQueryString("agentCode"); //业务员工号
var agentState = GetQueryString("agentState"); //是否业务员
var mobile = GetQueryString("mobile"); //
var openid = GetQueryString("openid"); //

var app = new Vue({
    el:"#app",
    data:{
        param: '',
        rptType: '1',   // 1 分公司 2中支 3营服 4个人
        state: '0',  //0 当日   1 累计
        isFix: false,
        list: [],
        date: '',
        totalAgentCount: 0,
        totalUserCount: 0,
        totalAmountCount: 0
    },
    methods:{
        switchTab: function(e){
            var that = this;
            that.state = e;
            //ajax请求
            that.queryList(that.param , that.rptType , that.state);
        },
        switchTab2: function(e){
            var that = this;
            that.rptType = e;
            that.param = '';
            
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            //ajax请求
            that.queryList(that.param , that.rptType , that.state);
        },
        search: function(){
            //ajax请求
            this.queryList(this.param , this.rptType , this.state);
        },
        queryList : function(param , rptType , state){
            var that = this;
            that.list = [];
            that.totalAgentCount = 0;
            that.totalUserCount = 0;
            that.totalAmountCount = 0;
            $.ajax({
                url: sUrl + "api/v1/queryRpt",
                // url: "gv/ranker/js/ranker.json",
                data: {
                    "param" : param,
                    "rptType" : rptType,
                    "state" : state
                },
                success: function (data){
                    if(data.result){
                        //开始赋值
                        that.list = data.object;
                        for(var i = 0 ; i < that.list.length ; i ++ ){
                            that.totalAgentCount += parseInt(that.list[i].agentCount);
                            that.totalUserCount += parseInt(that.list[i].userCount);
                            that.totalAmountCount += parseInt(that.list[i].amountCount);
                        }
                    }else{
                        fnLayerBox(data.info);
                    }
                }
            });
        },
        queryUpdate : function(){
            var that = this;
            $.ajax({
                url: sUrl + "api/v1/getRptDate",
                data: {},
                success: function (data){
                    if(data.result){
                        //开始赋值
                        that.date = data.object;
                    }else{
                        // fnLayerBox(data.info);
                    }
                }
            });
        }
    },
    created:function(){
        var that = this;
        that.queryList(that.param , that.rptType , that.state);
        that.queryUpdate();
    },
    mounted: function(){
        var that = this;
        Vue.nextTick(function(){
            //tab标签距离页面顶部的距离
            var DT = $('.title1').offset().top;
            $(document).scroll(function() {
                var wt = document.documentElement.scrollTop || document.body.scrollTop;
                // console.log(wt,DT)
                if(wt<=DT){
                    that.isFix = false;
                }else{
                    that.isFix = true;
                }
            });
        })
        doShareNoSave(sUrl,"华夏E家保准客户排行榜", "每一次测算，都能收获一位准客户！", window.location.href, goUrl+"gv/ranker/images/share_ejb.png");
    }
});