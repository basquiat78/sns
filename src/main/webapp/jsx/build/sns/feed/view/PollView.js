		var FeedPollView = React.createClass({displayName: "FeedPollView",

			componentDidMount: function () {

			},

			votePoll: function() {
				var selectVal = $('input[name='+this.props.feedId+']:checked').val();
				if(selectVal === undefined)return;
				this.props.votePoll();
			},

			render: function() {
				var feedTitle= this.props.feedTitle;
				var resultPollList = this.props.resultPollList;
				var votedLength = resultPollList == undefined ? 0 : resultPollList.length;
				var PollNode = '';
				if(this.props.pollList !== undefined) {
					PollNode = this.props.pollList.map(function(poll){
						var key = 'poll_'+poll.feedId+'_'+poll.seq;
						return (
								React.createElement(FeedPoll, {key: key, poll: poll, 	resultPollList: resultPollList})
						);
					});
				}

	        	return (
						React.createElement("div", null, 
                        	React.createElement("ul", {className: "survay_aw"}, 
								React.createElement("li", {className: "survay_answer"}, React.createElement("img", {src: "../images/icon_vote.png", width: "18", height: "16"})), 
                                React.createElement("li", null, React.createElement("strong", null, feedTitle))
                             ), 
							 React.createElement("br", null), React.createElement("br", null), 
                             React.createElement("ul", {className: "survay_result"}, 
								PollNode
                             ), 
                             React.createElement("span", {className: "btn_vote", onClick: this.votePoll}), 
                             React.createElement("ul", {className: "totalvote"}, 
                             	React.createElement("li", null, "총 ", votedLength, " 건 "), 
                                React.createElement("li", {className: "show_result", onClick: this.props.resultViewPoll}, _FEED_PollView_MSG_SHOWRESULT)
                        	)
                        )
	           	);
			}
		});
	
	
	
		var FeedPollResultView = React.createClass({displayName: "FeedPollResultView",

			componentDidMount: function () {

			},

			render: function() {

				var feedTitle= this.props.feedTitle;
				var resultPollList = this.props.resultPollList;
				var resultPollNode = [];
				var votedLength = resultPollList.length;				

				for(var i=0; i<this.props.pollList.length; i++) {
					var poll = this.props.pollList[i];
					var ResultPollKey = 'resultPoll_'+poll.feedId+'_'+i;
					resultPollNode.push(React.createElement(ResultPoll, {key: ResultPollKey, poll: poll, resultPollList: resultPollList}));
				}

	        	return (
						React.createElement("div", null, 
                        	React.createElement("ul", {className: "survay_aw"}, 
								React.createElement("li", {className: "survay_answer"}, React.createElement("img", {src: "../images/icon_vote.png", width: "18", height: "16"})), 
                                React.createElement("li", null, React.createElement("strong", null, feedTitle))
                             ), 
							 React.createElement("br", null), React.createElement("br", null), 
                             React.createElement("ul", {className: "survay_result", style: {'listStyleType':'none', 'listStylePosition':'outside'}}, 
								resultPollNode
                             ), 
                             React.createElement("span", {className: "btn_vote", style: {'display':'none'}, onClick: this.votePoll}), 
                             React.createElement("ul", {className: "totalvote"}, 
                             	React.createElement("li", null, "총 ", votedLength, " 건 "), 
								React.createElement("li", {className: "show_result", onClick: this.props.viewPoll}, "Change Vote"), 
                                React.createElement("li", {className: "show_result", onClick: this.props.resultViewPoll}, "Reload")
                        	)
                        )
	           	);
			}
		});
	
	
	
		var ResultPoll = React.createClass({displayName: "ResultPoll",

			percent:function(seq, resultPoll) {

				var totalVote = resultPoll.length;
				if(totalVote ==0) {
					return '0%';
				}

				var thisVoted = 0;
				resultPoll.forEach(function(poll){
					if(seq === poll.seq) thisVoted++;
				});

				var percent = (thisVoted/totalVote)*100;

				return percent.toFixed(0)+'%';

			},

			render: function() {
				var id = 'resultPoll_'+this.props.poll.feedId+'_'+this.props.poll.seq;
				var percentVal = this.percent(this.props.poll.seq, this.props.resultPollList);
	        	return (
						React.createElement("li", {style: {'marginTop':'.4em', 'clear':'left'}}, 
							React.createElement("div", null, this.props.poll.choice), 
							React.createElement("div", {style: {'borderWidth':'1px', 'borderStyle':'solid', 'borderColor':'#ccc', 'width':'220px', 'margin':'0 5px 5px 0', 'padding':'1px', 'float':'left'}}, 
            					React.createElement("div", {style: {'width':percentVal, 'backgroundColor':'#38699f', 'height':'12px'}})
          					), 
							React.createElement("div", {style: {'float':'left', 'lineHeight': 'initial'}}, percentVal)
						)
	           			);
				}
		});
	

	
		var FeedPoll = React.createClass({displayName: "FeedPoll",

			render: function() {
				var id = 'poll_'+this.props.poll.feedId+'_'+this.props.poll.seq;
				var resultPollList = this.props.resultPollList;
				var checked = false;		
				var self = this;
				resultPollList.forEach(function(result){
					if(result.memberId == _PollView_session_memberId && self.props.poll.seq === result.seq) {
						checked = true;
					}
				});

				if(checked) {
	        		return (
							React.createElement("li", null, 
								React.createElement("input", {name: this.props.poll.feedId, defaultChecked: true, id: id, type: "radio", value: this.props.poll.seq}), React.createElement("label", {htmlFor: id}, this.props.poll.choice)
							)
	           				);
				} else {
					return (
							React.createElement("li", null, 
								React.createElement("input", {name: this.props.poll.feedId, id: id, type: "radio", value: this.props.poll.seq}), React.createElement("label", {htmlFor: id}, this.props.poll.choice)
							)
	           				);
				}
			}
		});