		var FeedPollView = React.createClass({

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
								<FeedPoll key={key} poll={poll}	resultPollList={resultPollList}/>
						);
					});
				}

	        	return (
						<div>
                        	<ul className='survay_aw'>
								<li className='survay_answer'><img src='../images/icon_vote.png' width='18' height='16' /></li>
                                <li><strong>{feedTitle}</strong></li>
                             </ul>
							 <br /><br />
                             <ul className='survay_result'>
								{PollNode}
                             </ul>
                             <span className='btn_vote' onClick={this.votePoll}></span>
                             <ul className='totalvote'>
                             	<li>총 {votedLength} 건 </li>
                                <li className='show_result' onClick={this.props.resultViewPoll}>{_FEED_PollView_MSG_SHOWRESULT}</li>
                        	</ul>
                        </div>
	           	);
			}
		});
	
	
	
		var FeedPollResultView = React.createClass({

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
					resultPollNode.push(<ResultPoll key={ResultPollKey} poll={poll} resultPollList={resultPollList} />);
				}

	        	return (
						<div>
                        	<ul className='survay_aw'>
								<li className='survay_answer'><img src='../images/icon_vote.png' width='18' height='16' /></li>
                                <li><strong>{feedTitle}</strong></li>
                             </ul>
							 <br /><br />
                             <ul className='survay_result' style={{'listStyleType':'none', 'listStylePosition':'outside'}}>
								{resultPollNode}
                             </ul>
                             <span className='btn_vote' style={{'display':'none'}} onClick={this.votePoll}></span>
                             <ul className='totalvote'>
                             	<li>총 {votedLength} 건 </li>
								<li className='show_result' onClick={this.props.viewPoll}>Change Vote</li>
                                <li className='show_result' onClick={this.props.resultViewPoll}>Reload</li>
                        	</ul>
                        </div>
	           	);
			}
		});
	
	
	
		var ResultPoll = React.createClass({

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
						<li style={{'marginTop':'.4em', 'clear':'left'}}>
							<div>{this.props.poll.choice}</div>
							<div style={{'borderWidth':'1px', 'borderStyle':'solid', 'borderColor':'#ccc', 'width':'220px', 'margin':'0 5px 5px 0', 'padding':'1px', 'float':'left'}}>
            					<div style={{'width':percentVal, 'backgroundColor':'#38699f', 'height':'12px'}}></div>
          					</div>
							<div style={{'float':'left', 'lineHeight': 'initial'}}>{percentVal}</div>
						</li>
	           			);
				}
		});
	

	
		var FeedPoll = React.createClass({

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
							<li>
								<input name={this.props.poll.feedId} defaultChecked id={id} type='radio' value={this.props.poll.seq} /><label htmlFor={id}>{this.props.poll.choice}</label>
							</li>
	           				);
				} else {
					return (
							<li>
								<input name={this.props.poll.feedId} id={id} type='radio' value={this.props.poll.seq} /><label htmlFor={id}>{this.props.poll.choice}</label>
							</li>
	           				);
				}
			}
		});