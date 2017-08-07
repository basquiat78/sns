package org.uengine.sns.group.vo;

import java.io.Serializable;

import org.uengine.sns.feed.vo.FeedVo;
import org.uengine.sns.member.vo.MemberVo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * KnowledgeFeedVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : ${default.table.prefix}KNWLDG
 *
 */
@JsonInclude(Include.NON_NULL)
public class KnowledgeFeedVo implements Serializable {
	
	private static final long serialVersionUID = 2650146597687507432L;
	
	/**
	 * 피드 아이디
	 */
	private long feedId;
		public long getFeedId() { return feedId; }
		public void setFeedId(long feedId) { this.feedId = feedId; }
		
	/**
	 * 그룹 아이디
	 */
	private long groupId;
		public long getGroupId() { return groupId; }
		public void setGroupId(long groupId) { this.groupId = groupId; }
		
	/**
	 * 승인 여부
	 */
	private Integer isApproval;
		public Integer getIsApproval() { return isApproval; }
		public void setIsApproval(Integer isApproval) { this.isApproval = isApproval; }

	/**
	 * 지식등록 사용자 아이디
	 */
	private long regMemberId;
		public long getRegMemberId() { return regMemberId; }
		public void setRegMemberId(long regMemberId) { this.regMemberId = regMemberId; }
		
	/**
	 * 지식등록 사용자 이름
	 */
	private String regMemberName;
		public String getRegMemberName() { return regMemberName; }
		public void setRegMemberName(String regMemberName) { this.regMemberName = regMemberName; }

	/**
	 * 피드 정보
	 */
	private FeedVo feedVo;
		public FeedVo getFeedVo() { return feedVo; }
		public void setFeedVo(FeedVo feedVo) { this.feedVo = feedVo; }
		
	/**
	 * 피드 팔로워 멤버 정보
	 */
	private MemberVo feedFFMemberVo;
		public MemberVo getFeedFFMemberVo() { return feedFFMemberVo; }
		public void setFeedFFMemberVo(MemberVo feedFFMemberVo) { this.feedFFMemberVo = feedFFMemberVo; }

}