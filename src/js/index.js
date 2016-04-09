/**
 * Created by lai on 2016/4/8.
 */
var Teach = {
    teachInfos: [], //教程总信息
    teachListObj: '#teach-list', //教程列表对象
    teachInfoObj: '#teach-info', //教程显示对象
    teachImgPath: 'images/teachimgs/', //教程图片默认路径
    teachListBthM: '#show-list-btn', //手机显示列表按钮
    teachNextBthM: '#show-next-btn', //手机显示下一章按钮
    //初始化信息
    init: function(parms){
        var _this = this;
        if(typeof parms != 'undefined'){
            console.log(typeof parms.teachListObj);
            _this.teachListObj = typeof parms.teachListObj != 'undefined' ? parms.teachListObj||'#teach-list' : '#teach-list';
            _this.teachInfoObj = typeof parms.teachInfoObj != 'undefined' ? parms.teachInfoObj||'#teach-info' : '#teach-info';
            _this.teachImgPath = typeof parms.teachImgPath != 'undefined' ? parms.teachImgPath||'images/teachimgs/' : 'images/teachimgs/';
            _this.teachListBthM = typeof parms.teachListBthM != 'undefined' ? parms.teachListBthM||'#show-list-btn' : '#show-list-btn';
        }

        _this.getTeachInfos();
    },

    //获取教程信息
    getTeachInfos: function () {
        var _this = this;
        $.getJSON("js/teachInfos.json",function(data){
            $.each(data,function(Name,db){
                _this.teachInfos.push(db);
            });
            //数据获取完后，初始化数据
            _this.getTeachInfosList();
            _this.showTeachInfo(0);
        });
    },

    //显示教程列表
    getTeachInfosList: function(){
        var _this = this;
        var listObj = $(_this.teachListObj);
        listObj.html('');
        for(var a = 0; a < _this.teachInfos.length; a++){
            var value = _this.teachInfos[a];
            var html = '<div class="teach-option" data-index="'+a+'">'+
                '<img src="'+_this.teachImgPath+ value.images[0]+'" alt="">'+
                '<div class="info">'+
                '<h3 class="ellipsis">'+value.title+'</h3>'+
                '<p>'+value.introduce+'</p>'+
                '</div></div>';
            listObj.append(html);
        }
        _this.setListClick();
    },

    //显示教程
    showTeachInfo: function(index) {
        var _this = this;
        var infoObj = $(_this.teachInfoObj);
        infoObj.html('');

        var value = _this.teachInfos[index];
        infoObj.append('<h1 class="title-pc">'+value.title+'<span>'+value.time+'</span></h1><ul class="steps"></ul>');
        $('.title-m').html('<span id="show-list-btn" class="list"></span>'+value.title+'<span id="show-next-btn" class="next" data-index="'+index+'"></span>');
        _this.setShowListClick();
        _this.setNextClick();
        $('.top .info-left').find('span').text(value.title);
        $('.info-right').find('p').html(_this.teachInfos.length+' <span>篇教程</span>');
        for(var i = 0; i < value.content.length; i++){
            var html = '';
            if(value.images[i]){
                if(value.content[i]) {
                    html = '<li class="step">'+
                        '<h3>'+value.content[i]+'</h3>'+
                        value.contentInfo[i]+
                        '<img src="'+_this.teachImgPath+ value.images[i]+'" alt="">'+
                        '</li>';
                }else if (!value.content[i]){
                    html = '<li class="step">'+
                        value.contentInfo[i]+
                        '<img src="'+_this.teachImgPath+ value.images[i]+'" alt="">'+
                        '</li>';
                }
            }else {
                if(value.content[i]) {
                    html = '<li class="step">'+
                        '<h3>'+value.content[i]+'</h3>'+
                        value.contentInfo[i]+
                        '</li>';
                }else if (!value.content[i]){
                    html = '<li class="step">'+
                        value.contentInfo[i]+
                        '</li>';
                }
            }
            infoObj.find('.steps').append(html);
        }
    },

    //手机显示列表相应事件
    setShowListClick: function(){
        var _this = this;
        var listBtn = $(_this.teachListBthM);
        var infoObj = $(_this.teachInfoObj);
        var listObj = $(_this.teachListObj);
        listBtn.on('click', function(){
            infoObj.hide();
            listObj.show();
        });
    },

    //设置列表点击事件
    setListClick: function(){
        var _this = this;
        var infoObj = $(_this.teachInfoObj);
        var listObj = $(_this.teachListObj);
        var listsObj = listObj.find('.teach-option');
        listsObj.on('click', function(){
            var ww = parseInt($(window).width());
            if(ww <= 768){
                infoObj.show();
                listObj.hide();
            }else {
                infoObj.show();
                listObj.show();
            }
            _this.showTeachInfo($(this).attr('data-index'));
        });
    },

    //设置下一页点击事件
    setNextClick: function(){
        var _this = this;
        var nextBtn = $(_this.teachNextBthM);
        nextBtn.on('click', function(){
            var index = parseInt($(this).attr('data-index'));
            if(index == _this.teachInfos.length-1){
                _this.showTeachInfo(0);
                $(this).attr('data-index', 0);
            }else {
                _this.showTeachInfo(index+1);
                $(this).attr('data-index', index+1);
            }
        });
    }

};
Teach.init();