package org.uengine.sns.system.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * SystemVo
 * <pre>
 * 	<p>GroupWare로부터 제공받는 api로 </p>
 *  <p>커스터마이징 되어야 하는 영역</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : 외부연동 관련 테이블
 *
 */
@JsonInclude(Include.NON_NULL)
public class SystemVo implements Serializable {

	private static final long serialVersionUID = -7778939809026978707L;
	
	/****************************** SYSTEM FEED ************************************/
	/**
	 * feedId 
	 */
	private long feedId;
		public long getFeedId() { return feedId; }
		public void setFeedId(long feedId) { this.feedId = feedId; }
		
	/**
	 * feedTitle
	 */		
	private String feedTitle;
		public String getFeedTitle() { return feedTitle; }
		public void setFeedTitle(String feedTitle) { this.feedTitle = feedTitle; }

	/**
	 * feedType
	 */
	private String feedType;
		public String getFeedType() { return feedType; }
		public void setFeedType(String feedType) { this.feedType = feedType; }

	/**
	 * regMemberName
	 */
	private String regMemberName;
		public String getRegMemberName() { return regMemberName; }
		public void setRegMemberName(String regMemberName) { this.regMemberName = regMemberName; }

	/**
	 * regDttm
	 */
	private String regDttm;
		public String getRegDttm() { return regDttm; }
		public void setRegDttm(String regDttm) { this.regDttm = regDttm; }
		
	/****************************** SYSTEM GROUP ************************************/
	/**
	 * groupId
	 */
	private long groupId;
		public long getGroupId() { return groupId; }
		public void setGroupId(long groupId) { this.groupId = groupId; }
	
	/**
	 * groupName
	 */
	private String groupName;
		public String getGroupName() { return groupName; }
		public void setGroupName(String groupName) { this.groupName = groupName; }
	
	/**
	 * 그룹 타입(내부, 외부)
	 */
	private String groupType;
		public String getGroupType() { return groupType; }
		public void setGroupType(String groupType) { this.groupType = groupType; }
		
	/**
	 * 공개 여부
	 */
	private int isPublic;
		public int getIsPublic() { return isPublic; }
		public void setIsPublic(int isPublic) { this.isPublic = isPublic; }
		
	/**
	 * 자동가입 여부
	 */
	private int isAutoJoin;
		public int getIsAutoJoin() { return isAutoJoin; }
		public void setIsAutoJoin(int isAutoJoin) { this.isAutoJoin = isAutoJoin; }
		
	/**
	 * companyId
	 */		
	private String companyId;
		public String getCompanyId() { return companyId; }
		public void setCompanyId(String companyId) { this.companyId = companyId; }
		
	/**
	 * companyName
	 */	
	private String companyName;
		public String getCompanyName() { return companyName; }
		public void setCompanyName(String companyName) { this.companyName = companyName; }
		
	/**
	 * companyNameEn
	 */			
	private String companyNameEn;
		public String getCompanyNameEn() { return companyNameEn; }
		public void setCompanyNameEn(String companyNameEn) { this.companyNameEn = companyNameEn; }

}