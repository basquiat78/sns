
/*
* GNB용 Layer Button
* 변수 : obj(요소 클래스명)
* data-role : layermenu(요소) / layermenu-button(클릭할 요소) / layermenu-layer(슬라이드 타겟)
* 함수 실행 예 : layermenu('.btn-layer-more')
*/
function gnb_layerbtn(obj){
	var $obj = $(obj),
		$targetMenu = $obj.find('*[data-role = layermenu-button]');

	$obj.find('.btn-layer-anchor').css('width', $obj.width());
	$targetMenu.click(function(){
		var $currentLayer = $(this).siblings('*[data-role = layermenu-layer]');
		if( $currentLayer.css('display') == 'none' ){
			$currentLayer.closest('.hhsc-btn-layer').addClass('hhsc-active');
			$currentLayer.slideDown();
		} else {
			$currentLayer.closest('.hhsc-btn-layer').removeClass('hhsc-active');
			$currentLayer.slideUp();
		};
	});
};

/*
* GNB 접속자 맞춤 메뉴 Layer Button
* 변수 : obj(요소 클래스명)
* 함수 실행 예 : gnb_connectormenu('.hhsc-connector-menu')
*/
function gnb_connectormenu(obj){
	var $obj = $(obj),
		$targetMenu = $obj.find('.hhsc-connector-menu-box'),
		$targetLayer = $targetMenu.find('.hhsc-connector-menu-layer'),
		_targetMenuLength = $targetMenu.length;

	for(var i=0; i<_targetMenuLength; i++){
		$targetLayer.css('display', 'none');
	};
	$targetMenu.bind('click', function(e){
		if( $(this).hasClass('hhsc-active') ){
			
			document.body.style.overflow = "visible";
			$("html").css("overflow-y","scroll");
			
			$(this).removeClass('hhsc-active');
			$(this).find('.hhsc-connector-menu-layer').slideUp();
			
			if($(this).hasClass('hhsc-connector-social')) $(this).find("ul.hhsc-sociallist").html("");
		} else {
			
			document.body.style.overflow = "hidden";
			$("html").css("overflow-y","hidden");
			
			$targetMenu.removeClass('hhsc-active');
			$(this).addClass('hhsc-active');
			$targetLayer.slideUp();
			$(this).find('.hhsc-connector-menu-layer').slideDown();
			
			if($(this).hasClass('hhsc-connector-social')) onOpenSocialAlarm();
		};
	});
};

$(document).ready(function(){
	var console = window.console || {log:function(){}};
	gnb_layerbtn('.hhsc-util-layer-admin');//GNB Qucikmenu
	gnb_layerbtn('.hhsc-connector-info');//GNB 접속자 정보
	gnb_connectormenu('.hhsc-connector-menu');//GNB 접속자 맞춤 메뉴
});