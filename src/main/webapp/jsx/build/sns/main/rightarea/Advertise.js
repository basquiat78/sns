//광고
	var Advertise  = React.createClass({displayName: "Advertise",
		render: function() {
	    	return (
					React.createElement("div", {className: "rightarea"}, 
                        React.createElement("dl", {className: "rightarea_gate", style: {'marginTop':'0', 'borderBottom':'none', 'marginBottom':'0'}}, 
                            React.createElement("dt", {className: "malgun13"}, "그룹상품 홍보관"), 
                            React.createElement("dd", {className: "icon_plus"}, React.createElement("img", {src: "../images/btn_more.gif", width: "18", height: "4"}))
                        ), 
                        React.createElement("span", {className: "pic_big2"}), 
                        React.createElement("span", {className: "malgun14"}, "한화호텔&리조트/용인,베잔송(BESANCON)으로 새롭게 재탄생"), 
                        React.createElement("span", {className: "malgun12", style: {'marginTop':'6px'}}, "7월 1일 경기도 용인에 위치한 한화리조트/용인이 약 9개월간의 대대적인 리뉴얼 공사를 마치고 '한화 리..."), 
                        React.createElement("span", {className: "malgun12", style: {'color':'#9ea4b1' , 'marginTop':'2px'}}, "7월 1일"), 
                        React.createElement("ul", {className: "page_btn"}, 
                            React.createElement("li", {style: {'marginLeft':'123px'}}, React.createElement("img", {src: "images/btn_page1.gif", width: "18", height: "8"})), 
                            React.createElement("li", null, React.createElement("img", {src: "images/btn_page2.gif", width: "8", height: "8"})), 
                            React.createElement("li", null, React.createElement("img", {src: "images/btn_page2.gif", width: "8", height: "8"}))
                        )
                    ) 
			);
		}
	});