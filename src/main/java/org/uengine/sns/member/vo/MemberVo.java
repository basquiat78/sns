package org.uengine.sns.member.vo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.uengine.sns.group.vo.GroupFollowerVo;
import org.uengine.sns.tenant.vo.UserTenantMappingVo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * MemberVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : ${default.table.prefix}MEMBER
 *
 */
@JsonInclude(Include.NON_NULL)
public class MemberVo implements Serializable {
	
	private static final long serialVersionUID = 1951428034710943767L;
	
	/**
	 * 사용자 아이디
	 */
	private long memberId;
		public long getMemberId() { return memberId; }
		public void setMemberId(long memberId) { this.memberId = memberId; }

	/**
	 * 로그인 아이디 	
	 */
	private String loginId;
		public String getLoginId() { return loginId; }
		public void setLoginId(String loginId) { this.loginId = loginId; }
		
	/**
	 * 로그인 패스워드
	 */
	private String loginPassword;
		public String getLoginPassword() { return loginPassword; }
		public void setLoginPassword(String loginPassword) { this.loginPassword = loginPassword; }
		
	/**
	 * salt	
	 */
	private String encryptSalt;
		public String getEncryptSalt() { return encryptSalt; }
		public void setEncryptSalt(String encryptSalt) { this.encryptSalt = encryptSalt; }
		
	/**
	 * 멤버 이름 	
	 */
	private String memberName;
		public String getMemberName() { return memberName; }
		public void setMemberName(String memberName) { this.memberName = memberName; }

	/**
	 * 멤버 영어 이름 	
	 */
	private String memberEname;
		public String getMemberEname() { return memberEname; }
		public void setMemberEname(String memberEname) { this.memberEname = memberEname; }
		
	/**
	 * 인증받은 호스트	
	 */
	private String authHost;
		public String getAuthHost() { return authHost; }
		public void setAuthHost(String authHost) { this.authHost = authHost; }

	/**
	 * 테넌트아이디	
	 */	
	private long tenantId;
		public long getTenantId() { return tenantId; }
		public void setTenantId(long tenantId) { this.tenantId = tenantId; }
		
	/**
	 * 시스템 관리자 여부	
	 */
	private Integer isSysAdmin;	
		public Integer getIsSysAdmin() { return isSysAdmin; }
		public void setIsSysAdmin(Integer isSysAdmin) { this.isSysAdmin = isSysAdmin; }
		
	/**
	 * 초대 인증키	
	 */
	private String inviteAuthKey;
		public String getInviteAuthKey() {	return inviteAuthKey; }
		public void setInviteAuthKey(String inviteAuthKey) { this.inviteAuthKey = inviteAuthKey; }

	/**
	 * 이메일 주소	
	 */
	private String emailAddr;
		public String getEmailAddr() { return emailAddr; }
		public void setEmailAddr(String emailAddr) { this.emailAddr = emailAddr; }
	
	/**
	 * 전화번호	
	 */
	private String phone;	
		public String getPhone() {	return phone; }
		public void setPhone(String phone) { this.phone = phone; }
		
	/**
	 * 휴대폰 번호	
	 */
	private String handPhone;
		public String getHandPhone() { return handPhone; }
		public void setHandPhone(String handPhone) { this.handPhone = handPhone; }
		
	/**
	 * 공개여부	
	 */
	private Integer isPublic;
		public Integer getIsPublic() { return isPublic; }
		public void setIsPublic(Integer isPublic) { this.isPublic = isPublic; }
		
	/**
	 * 엔터키 사용 여부	
	 */
	private Integer isEnter;
		public Integer getIsEnter() { return isEnter; }
		public void setIsEnter(Integer isEnter) { this.isEnter = isEnter; }

	/**
	 * 멤버 사진 경로	
	 */
	private String memberPicUrl;	
		public String getMemberPicUrl() { return memberPicUrl; }
		public void setMemberPicUrl(String memberPicUrl) { this.memberPicUrl = memberPicUrl; }
		
	/**
	 * 멤버 썸네일 경로	
	 */
	private String memberThumbUrl;
		public String getMemberThumbUrl() { return memberThumbUrl; }
		public void setMemberThumbUrl(String memberThumbUrl) { this.memberThumbUrl = memberThumbUrl; }

	/**
	 * 언어 설정	
	 */		
	private String langSet;
		public String getLangSet() { return langSet; }
		public void setLangSet(String langSet) { this.langSet = langSet; }
		
	/**
	 * 타임존	
	 */		
	private String timeZone;
		public String getTimeZone() { return timeZone; }
		public void setTimeZone(String timeZone) { this.timeZone = timeZone; }
		
	/**
	 * 삭제 여부
	 */
	private Integer isDeleted;
		public Integer getIsDeleted() { return isDeleted; }
		public void setIsDeleted(Integer isDeleted) { this.isDeleted = isDeleted; }
		
	/**
	 * 동기화 키
	 */	
	private String syncKey;	
		public String getSyncKey() { return syncKey; }
		public void setSyncKey(String syncKey) { this.syncKey = syncKey; }
	
	/**
	 * 동기화 키(그룹웨어 유저 아이디)
	 */
	private String memberSyncKey;
		public String getMemberSyncKey() { return memberSyncKey; }
		public void setMemberSyncKey(String memberSyncKey) { this.memberSyncKey = memberSyncKey; }

	/**
	 * 최근 동기화 일시
	 */
	private Date lstSyncDttm;
		public Date getLstSyncDttm() { return lstSyncDttm; }
		public void setLstSyncDttm(Date lstSyncDttm) { this.lstSyncDttm = lstSyncDttm; }
		
	/**
	 * 멤버에 소속된 즐겨찾기 정보 리스트
	 */
	private List<BookmarkVo> bookmarkList;
		public List<BookmarkVo> getBookmarkList() { return bookmarkList; }
		public void setBookmarkList(List<BookmarkVo> bookmarkList) { this.bookmarkList = bookmarkList; }

	/**
	 * 멤버에 해당하는 모바일 정보 리스트
	 */	
	private List<MobileInfoVo> mobileList;	
		public List<MobileInfoVo> getMobileList() { return mobileList; }
		public void setMobileList(List<MobileInfoVo> mobileList) { this.mobileList = mobileList; }

	/**
	 * 그룹 팔로워 정보 리스트
	 */
	private List<GroupFollowerVo> groupfwrList;
		public List<GroupFollowerVo> getGroupfwrList() { return groupfwrList; }
		public void setGroupfwrList(List<GroupFollowerVo> groupfwrList) { this.groupfwrList = groupfwrList; }

	/**
	 * 멤버에 해당하는 사용자 테넌트 매핑 정보 리스트	
	 */
	private List<UserTenantMappingVo> tenantMappingList;
		public List<UserTenantMappingVo> getTenantMappingList() { return tenantMappingList; }
		public void setTenantMappingList(List<UserTenantMappingVo> tenantMappingList) { this.tenantMappingList = tenantMappingList; }

	/**
	 * 그룹웨어 정보에서 취득한 회사 ID
	 */
	private String companyId;
		public String getCompanyId() { return companyId; }
		public void setCompanyId(String companyId) { this.companyId = companyId; }
	
	/**
	 * 그룹웨어 정보에서 취득한 회사 명
	 */
	private String companyName;
		public String getCompanyName() { return companyName; }
		public void setCompanyName(String companyName) { this.companyName = companyName; }
	
	/**
	 * 등록일	
	 */
	private Date regDttm;
		public Date getRegDttm() { return regDttm; }
		public void setRegDttm(Date regDttm) { this.regDttm = regDttm; }

	/**
	 * 코멘트 피드의 경우 코멘트를 등록한 유저의 파트/직책/직위 정보를 담기 위한 변수들
	 * memberPartName/memberPositionName/memberDutyName;
	 */
	private String memberPartName;
		public String getMemberPartName() {	return memberPartName; }
		public void setMemberPartName(String memberPartName) { this.memberPartName = memberPartName; }
		
	/**
	 * memberPositionName
	 */
	private String memberPositionName;
		public String getMemberPositionName() {	return memberPositionName; }
		public void setMemberPositionName(String memberPositionName) { this.memberPositionName = memberPositionName; }
		
	/**
	 * memberDutyName
	 */
	private String memberDutyName;
		public String getMemberDutyName() {	return memberDutyName; }
		public void setMemberDutyName(String memberDutyName) { this.memberDutyName = memberDutyName; }

}