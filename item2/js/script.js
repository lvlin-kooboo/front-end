var fa = (function () {
    var util = {
        fn: {}
    },
    wraperBox = $("#wraper"),
    containerBox = $("#container"),
    mainBox = $("#main"),
    mainSec = mainBox.find("section"),
    tipsBox = $("#tips"),
    screenH2 = document.documentElement.clientHeight,
    screenW = document.documentElement.clientWidth,
    secLen = mainSec.length,
    count_data = {
        touchStartY: 0,
        touchEndY: 0,
        moveY: 0,
        nowY: 0,
        nowP: 1
    };
  screenH=(screenH2/screenW)*320;
    //根据手机分辨率设定高度，必须
    util.setHeight = function () {
        var docH = secLen * screenH;
        wraperBox.height(screenH);
        containerBox.height(docH);
        mainBox.height(docH);
        mainSec.css({"height": screenH});
    
    }
    //下一页
    util.nextSec = function () {
        if (count_data.nowP == secLen) {
            mainBox.css("-webkit-transform", "matrix(1, 0, 0, 1, 0, " + (-screenH * (secLen - 1)) + ")");
            count_data = {
                touchStartY: "0",
                touchEndY: "0",
                moveY: "0",
                nowY: -screenH * (secLen - 1),
                nowP: secLen
            };
            return;
        }
        tipsBox.removeClass("tips-ani");
        count_data.nowP++;
        var pNum = count_data.nowP;
        mainBox.css("-webkit-transform", "matrix(1, 0, 0, 1, 0, " + (-screenH * (pNum - 1)) + ")");
       
        setTimeout(function(){  $("#sec-" + pNum).addClass("sec-0" + pNum + "-show");$("#sec-" + (pNum - 1)).removeClass("sec-0" + (pNum - 1) + "-show");},500);
        
       
        count_data = {
            touchStartY: 0,
            touchEndY: 0,
            moveY: 0,
            nowY: -screenH * (pNum - 1),
            nowP: pNum
        };
    }
    //上一页
    util.prevSec = function () {
        if (count_data.nowP == 1) {
            mainBox.css("-webkit-transform", "matrix(1, 0, 0, 1, 0, 0)");
            count_data = {
                touchStartY: 0,
                touchEndY: 0,
                moveY: 0,
                nowY: 0,
                nowP: 1
            };
            return;
        }
        tipsBox.removeClass("tips-ani");
        count_data.nowP--;
        var pNum = count_data.nowP;
        mainBox.css("-webkit-transform", "matrix(1, 0, 0, 1, 0, " + (-screenH * (pNum - 1)) + ")");
         setTimeout(function(){$("#sec-" + pNum).addClass("sec-0" + pNum + "-show");
        $("#sec-" + (pNum + 1)).removeClass("sec-0" + (pNum + 1) + "-show");},500);
        
        count_data = {
            touchStartY: 0,
            touchEndY: 0,
            moveY: 0,
            touchStartX: 0,
            touchEndX: 0,
            moveX: 0,
            nowY: -screenH * (pNum - 1),
            nowP: pNum
        };
    }
    //页面滑动
    util.secSlide = function () {
        var moveYcount = 0,moveXcount = 0, mainP = document.getElementById("main");
        mainP.addEventListener('touchstart', function (e) {
            if($(e.target).closest('.btn2').length == 0) {
                count_data.touchStartY = e.touches[0].clientY;//传递起始位置
                count_data.touchStartX = e.touches[0].clientX;//传递起始位置
                mainBox.addClass("ani-n");
            }
        }, false);
        mainP.addEventListener('touchmove', function (e) {
            e.preventDefault();
            if (e.targetTouches.length == 1) {
                var touch = e.changedTouches[0];
                moveYcount = touch.pageY - count_data.touchStartY;//位移  
                count_data.moveY = moveYcount;
                var temp = count_data.nowY + moveYcount;
                if (count_data.nowP == 1) {
                    if (count_data.moveY > 0) {
                        tipsBox.addClass("tips-ani");
                        document.getElementById('tips').style.display="block";
                        tipsBox.html("已经是第一页了啦！");
                        setTimeout(function(){document.getElementById('tips').style.display="none"},2000);
                        moveYcount = 0;
                        return;
                    }
                }
                if (count_data.nowP == secLen) {
                    if (count_data.moveY < 0) {
                        tipsBox.addClass("tips-ani");
                        document.getElementById('tips').style.display="block";
                        tipsBox.html("已经到达最后一页了啦！");
                        setTimeout(function(){document.getElementById('tips').style.display="none"},2000);
                        moveYcount = 0;
                        return;
                    }
                }

                if($(e.target).closest('.slider').length > 0) {
                    moveXcount = touch.pageX - count_data.touchStartX;//位移 
                    count_data.moveX = moveXcount; 
                }else {
                mainBox.css("-webkit-transform", "matrix(1, 0, 0, 1, 0, " + temp + ")");
                }
                // mainBox.css("-webkit-transform", "matrix(1, 0, 0, 1, 0, " + temp + ")");
            }
        }, false);
        mainP.addEventListener('touchend', function (e) {
            mainBox.removeClass("ani-n");
            if (Math.abs(moveYcount) > 50) {
                if (moveYcount < -50) {
                    util.nextSec();
                }
                if (moveYcount > 50) {
                    util.prevSec();
                }
            } else {
                mainBox.css("-webkit-transform", "matrix(1, 0, 0, 1, 0, " + (-screenH * (count_data.nowP - 1)) + ")");
            }

            if(Math.abs(moveXcount) > 50) {
                if (moveXcount < 0) {
                    $('.slider .next').trigger('click');
                }
                if (moveXcount > 0) {
                    $('.slider .prev').trigger('click');
                }
            }
            count_data.touchStartY = 0;
            count_data.touchEndY = 0;
            count_data.moveY = 0;
            moveYcount = 0;
        }, false);

    }
    util.setHeight();
    util.secSlide();

    return {
        util: util
    }  
  
})();

