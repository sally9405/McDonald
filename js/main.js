$(function () {
    $(".ui-loader").hide();
	var w = $(window).width();
	$(window).resize(function () {
		w = $(window).width();
		if (w > 1024) {
			$("#nav").css("left", 0);
			$(".hamBtn").removeClass("active");
		} else {
			$("#nav, .navBg").css("left", "-120%");
			$(".hamBtn").removeClass("active");
		}
	})

	if (w > 1024) {
		$("#nav").css("left", 0);
		$(".hamBtn").removeClass("active");
	} else {
		$("#nav, .navBg").css("left", "-120%");
	}

	//nav
	$(".hamBtn, .fixed>li:eq(1)").click(function () {
		//클래서 active를 가지고 있으면 클래스를 없애주고 네비도 안보이게
		if ($(".hamBtn").hasClass("active")) {
			$(".hamBtn").removeClass("active");
			$("#nav, .navBg").stop().animate({
				"left": "-120%"
			}, 500)
		} else {
			$(".hamBtn").addClass("active");
			$("#nav, .navBg").stop().animate({
				"left": 0
			}, 500)
		}
	})

	$("#nav>li").click(function () {
		$(this).children(".sub").slideToggle();
		$(this).siblings().children(".sub").slideUp();
		$(this).toggleClass("active");
		$(this).siblings().removeClass("active");
	})

	//visual
	//    선택한 버튼 체크
	var sNum = 0;
	var cBtn = $(".cBtn>li");
	var object = $(".banner>li").clone();
	$(".banner").append(object);

	cBtn.click(function () {
		sNum = $(this).index();
		console.log(sNum);
		moveBanner();
	})

	function moveBanner() {
		console.log(sNum);
		if (sNum == 2) {
			cBtn.eq(0).addClass("active").siblings().removeClass("active");
		}
		cBtn.eq(sNum).addClass("active").siblings().removeClass("active");

		$(".banner").stop().animate({
			"margin-left": -sNum * 100 + "%"
		}, 500)
	}
	var timer = setInterval(function () {
		if (sNum == 2) {
			console.log(sNum);
			sNum = 0;
			$(".banner").css("margin-left", 0);
		}
		sNum++;
		moveBanner();
	}, 2000)


	$("#visual").mouseenter(function () {
		clearInterval(timer);
	});
    $("#visual").mouseleave(function () {
		timer = setInterval(function () {
            if (sNum == 2) {
                console.log(sNum);
                sNum = 0;
                $(".banner").css("margin-left", 0);
            }
            sNum++;
            moveBanner();
	   }, 3000)
	});

	//menu
	//체크
	item = new Array();
	//배열에 .item>li를 넣고
	$(".item>li").each(function (i) {
		item[i] = $(".item>li");
	});
	var mNum = 0;
	var checkNum = 0;
	var w = $(window).width();

	//웹->모바일 모바일->웹 으로 바꾸면 리셋해주기
	$(window).resize(function () {
		w = $(window).width();
		$(".item").css("margin-left", 0);
		mNum = 0;
		$(".mBtnL").addClass("active");
		$(".mBtnR").removeClass("active");
	})


	$(".mBtnR").click(function (e) {
		e.preventDefault();
		//window 너비가 767이상이면 웹, 이하면 모바일
		if (w > 1024) {
			checkNum = parseInt(item.length / 4) - 1;
		} else {
			checkNum = item.length - 2;
		}
		$(".mBtnL").removeClass("active");
		if (mNum == checkNum) {
			$(".mBtnR").addClass("active");
		}

		if (mNum < 5) {
			mNum++;
			moveItem();
		}
	})

	$(".mBtnL").click(function (e) {
		e.preventDefault();
		$(".mBtnR").removeClass("active");

		if (mNum > 0) {
			mNum--;
			moveItem();
		}
		if (mNum == 0) {
			$(".mBtnL").addClass("active");
		}
	})
	$(".menu").on("swipeleft", function () {
		$(".mBtnR").trigger("click");

	})
	$(".menu").on("swiperight", function () {
		$(".mBtnL").trigger("click");
	})

	function moveItem() {
		$(".item").stop().animate({
			"margin-left": -100 * mNum + "%"
		}, 500)
	}

})
