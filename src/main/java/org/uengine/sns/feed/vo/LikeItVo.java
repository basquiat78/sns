package org.uengine.sns.feed.vo;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * FollowerVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : ${default.table.prefix}LIKEIT
 *
 */
@JsonInclude(Include.NON_NULL)
public class LikeItVo implements Serializable {
	
	private static final long serialVersionUID = -6202349885473829266L;
	
	/**
	 * 피드 아이디
	 */
	private long feedId;
		public long getFeedId() { return feedId; }
		public void setFeedId(long feedId) { this.feedId = feedId; }
	
	/**
	 * 등록자 멤버 아이디
	 */
	private long regMemberId;
		public long getRegMemberId() { return regMemberId; }
		public void setRegMemberId(long regMemberId) { this.regMemberId = regMemberId; }
	
	/**
	 * 등록일시
	 */
	private Date regDttm;
		public Date getRegDttm() { return regDttm; }
		public void setRegDttm(Date regDttm) { this.regDttm = regDttm; }
	
	/**
	 * 좋아요를 누름 유저의 정보
	 * 이 부분이 있으면 좋아요를 누른 피드에 유저가 팔로우 되어 있지 않다.
	 * 따라서 이 부분 값이 있다면 팔로워를 추가한다.
	 */
	private FollowerVo ffVo;
		public FollowerVo getFfVo() { return ffVo; }
		public void setFfVo(FollowerVo ffVo) { this.ffVo = ffVo; }

}