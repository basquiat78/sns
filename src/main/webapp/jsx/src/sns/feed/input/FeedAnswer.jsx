		//댓글 클릭시 나오는 문구 그리는 부분
		var Answer = React.createClass({
			removed:function() {
				this.props.removeAnswerTag();
			},

			render: function() {

				var sessionMemberName = _FeedAnswer_session_memberName;

				return (
						<dd className='answer_who'>
						{sessionMemberName} {_FEED_FeedAnswer_MSG_ANSWERTEXT1} {this.props.receiveMember.memberName} {_FEED_FeedAnswer_MSG_ANSWERTEXT2}<span style={{'marginLeft':'5px', 'cursor':'pointer'}}><img src='../images/btn_delete.png' width='8' height='8' onClick={this.removed}/></span>
						</dd>
				);
			}
		});