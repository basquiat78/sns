/*
* Layout
* 함수 실행 예 : createResizableUi()
*/
function createResizableUi() {
	//영역 높이
	var window_height,
		contents1_height = 0,
		contents2_height = 0,
		snb_height = 0,
		height_arr = [],
		container_height;

	static_resize_set();
	$(window).resize(function(){
		static_resize_set();
	});
	$('.lay-col1').resize(static_resize_set);
	$('.lay-col2').resize(static_resize_set);
	function static_resize_set(){
		window_height = $(window).height() - $('.lay-gnb').height();
		contents1_height = $('.lay-col1').height();
		contents2_height = $('.lay-col2').height();
		snb_height = $('.snb-content').height()+117;//117 : .lay-footer의 높이+padding
		height_arr = [contents1_height, contents2_height, snb_height];
		for(var i = 0; i<height_arr.length; i++){
			if(height_arr[i] == false || height_arr[i] == null){
				height_arr[i] = 0;
			};
		};
		container_height = Math.max.apply(null, height_arr);

		if( container_height < window_height ){//콘텐츠 높이가 브라우저 높이보다 작다면 브라우저 높이와 같다
			$('.lay-container-wrap').css('height', window_height+'px');
		} else {
			$('.lay-container-wrap').css('height', container_height+'px');
		};
	};
};

$(document).ready(function(){
	createResizableUi();//레이아웃 세팅	
});