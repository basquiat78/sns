package org.uengine.sns.common.util.vo;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.Clob;
import java.util.Date;
import java.util.Map;
import java.util.Map.Entry;

import org.uengine.sns.common.ArchiveTablePrefix;
import org.uengine.sns.common.Exception.SNSRunTimeException;

/**
 * 
 * SearchContextVo
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class SearchContextVo implements Serializable {

	private static final long serialVersionUID = -8266618805378585892L;
	
	private String SNS_ERROR_MSG;
	
	public SearchContextVo(Map<Object, Object> sc) {
		if(sc != null) {
			for(Entry<Object, Object> entry : sc.entrySet()) {
			    try {
					Method m = SearchContextVo.class.getMethod(entry.getKey().toString(), Object.class);
					m.invoke(this, entry.getValue());
					
					if(SNS_ERROR_MSG != null ) {
						throw new SNSRunTimeException(SNS_ERROR_MSG);
					}
					
				} catch (SNSRunTimeException e) {
					throw e;
				} catch (NoSuchMethodException e) {
					throw new SNSRunTimeException("세팅할 " + entry.getKey().toString() + " 가 존재하지 않습니다.");
				} catch (IllegalAccessException | SecurityException e) {
					throw new SNSRunTimeException("해당 url 호출에 문제가 발생하였습니다. method(get/post)를 확인해 주세요.");
				} catch (IllegalArgumentException | InvocationTargetException e) {
					throw new SNSRunTimeException(entry.getKey() + "의 변수 " + entry.getValue() + "(변수 타입, 값)를 확인하세요.");
				} 
			}
		}
	}

	/**
	 * menuType
	 */
	private String menuType;
		public String getMenuType() { return menuType; }
		public void menuType(Object menuType) {
			this.menuType = (String)menuType;
		}

	/**
	 * 멤버 ID
	 */
	private long memberId;
		public long getMemberId() { return memberId; }
		public void memberId(Object memberId) {
			this.memberId = Long.valueOf(memberId.toString());
		}
	
	/**
	 * 외부 멤버 ID
	 */
	private long extMemberId;
		public long getExtMemberId() { return extMemberId; }
		public void extMemberId(Object extMemberId) {
			this.extMemberId = Long.valueOf(extMemberId.toString());
		}

	private long sessionMemberId;
		public long getSessionMemberId() { return sessionMemberId; }
		public void sessionMemberId(Object sessionMemberId) {
			this.sessionMemberId = Long.valueOf(sessionMemberId.toString());
		}
	
	/**
	 * 멤버 이름
	 */
	private String memberName;
		public String getMemberName() { return memberName; }
		public void memberName(Object memberName) {
			this.memberName = (String)memberName;
		}
	
	/**
	 * 그룹 ID
	 */
	private long groupId;
		public long getGroupId() { return groupId; }
		public void groupId(Object groupId) {
			//this.groupId = Long.valueOf((String)groupId);
			this.groupId = Long.parseLong((String)groupId, 10);
		}
		
	/**
	 * 그룹 이름
	 */
	private String groupName;
		public String getGroupName() { return groupName; }
		public void groupName(Object groupName) {
			this.groupName = (String)groupName;
		}
	
	/**
	 * 공개 여부(1:공개/0:비공개)
	 */
	private int isPublicGroup;
		public int getIsDeletedGroup() { return isDeletedGroup; }
		public void isPublicGroup(Object isDeletedGroup) {
			this.isDeletedGroup = Integer.valueOf((String)isDeletedGroup) ;
		}
	
	/**
	 * 삭제 여부(1:삭제/0:사용)
	 */
	private int isDeletedGroup;
		public int getIsPublicGroup() { return isPublicGroup; }
		public void isDeletedGroup(Object isPublicGroup) {
			this.isPublicGroup = Integer.valueOf((String)isPublicGroup);
		}

	/**
	 * 피드 ID
	 */
	private long feedId;
		public long getFeedId() { return feedId; }
		public void feedId(Object feedId) {
			this.feedId = Long.valueOf(String.valueOf(feedId));
		}
		
	/**
	 * 파일 ID
	 */
	private long fileId;
		public long getFileId() { return fileId; }
		public void fileId(Object fileId) {
			this.fileId = Long.valueOf(String.valueOf(fileId));
		}
			
	/**
	 * 피드 Type
	 */
	private String feedType;
		public String getFeedType() { return feedType; }
		public void feedType(Object feedType) {
			this.feedType = (String)feedType;
		}

	/**
	 * 피드 제목
	 */
	private String feedTitle;
		public String getFeedTitle() { return feedTitle; }
		public void feedTitle(Object feedTitle) {
			this.feedTitle = (String)feedTitle;
		}
	
	/**
	 * 피드 컨텐츠 타입
	 */
	private String feedContentType;
		public String getFeedContentType() { return feedContentType; }
		public void feedContentType(Object feedContentType) {
			this.feedContentType = (String)feedContentType;
		}
		
	/**
	 * 결재 상태(승인/반려)
	 */
	private String approvalStatus;
		public String getApprovalStatus() { return approvalStatus; }
		public void approvalStatus(Object approvalStatus) {
			this.approvalStatus = (String)approvalStatus;
		}
	
	/**
	 * 등록일
	 */
	private Date regDttm;
		public Date getRegDttm() { return regDttm; }
		public void regDttm(Object regDttm) {
			this.regDttm = (Date)regDttm;
		}
	
	/**
	 * 피드 컨텐츠 내용
	 */
	private Clob contents;
		public Clob getContents() { return contents; }
		public void contents(Object contents) {
			this.contents = (Clob)contents;
		}
		
	/**
	 * 완료목표일
	 */
	private String dueDate;
		public String getDueDate() { return dueDate; }
		public void dueDate(Object dueDate) {
			if(((String)dueDate).length() != 10) {
				SNS_ERROR_MSG = "dueDate의 값은 YYYY-MM-DD 형태로 넣어 주세요";
			}
			this.dueDate = (String)dueDate;
		}
	
	/**
	 * 시작일
	 */
	private String startDate;
		public String getStartDate() { return startDate; }
		public void startDate(Object startDate) {
			this.startDate = (String)startDate;
		}
		
	/**
	 * 종료일
	 */
	private String endDate;
		public String getEnddate() { return endDate; }
		public void endDate(Object endDate) {
			this.endDate = (String)endDate;
		}


	/**
	 * 태그명
	 */
	private String tagName;
		public String getTagName() { return tagName; }
		public void tagName(Object tagName) {
			this.tagName = (String)tagName;
		}
		
	/*
	 * 태그 타입
	 */
	private String tagType;
		public String getTagType() { return tagType; }
		public void tagType(Object tagType) {
			this.tagType = (String)tagType;
		}

	/**
	 * 파일명
	 */
	private String fileName;
		public String getFileName() { return fileName; }
		public void fileName(Object fileName) {
			this.fileName = (String)fileName;
		}
	
	/**
	 * 썸네일 파일명
	 */
	private String thumbFileName;
		public String getThumbFileName() { return thumbFileName; }
		public void thumbFileName(Object thumbFileName) {
			this.thumbFileName = (String)thumbFileName;
		}
		
	/**
	 * 파일 확장자
	 */
	private String fileExt;
		public String getFileExt() { return fileExt; }
		public void fileExt(Object fileExt) {
			this.fileExt = (String)fileExt;
		}
	
	/**
	 * 그룹리스트 호출 시 최신순/ 추천순
	 */
	private String cType;
		public String getCType() { return cType; }
		public void cType(Object cType) {
			this.cType = (String)cType;
		}
		
	/**
	 * 파일 저장소 위치
	 */
	private String repositoryType;
		public String getRepositoryType() { return repositoryType; }
		public void repositoryType(Object repositoryType) {
			this.repositoryType = (String)repositoryType;
		}
	
	/**
	 * followerId
	 */
	private long followerId;
		public long getFollowerId() { return followerId; }
		public void followerId(Object followerId) {
			this.followerId = Long.valueOf((String)followerId);
		}
	
	/**
	 * followerType
	 */
	private String followerType;
		public String getFollowerType() { return followerType; }
		public void followerType(Object followerType) {
			this.followerType = (String)followerType;
		}
	
	/**
	* 설문 순번
	*/
	private int seq;
	    public int getSeq() { return seq; }
	    public void seq(Object seq) { 
	    	this.seq = Integer.valueOf((String)seq); 
	    }
	
	/** 
	 * feed, member, group 
	 */
	private String itemType;
		public String getItemType() { return itemType; }
		public void itemType(Object itemType) {
			this.itemType = (String)itemType;
		}
		
	/**
	 * syncKey 목록으로 멤버조회
	 */
	private String[] syncKeyList;
		public String[] getSyncKeyList() { return syncKeyList; }
		public void syncKeyList(Object syncKeyList) {
			this.syncKeyList = (String[]) syncKeyList;
		}
		
	/**
	 * email 로 멤버조회
	 */
	private String emailAddr;
		public String getEmailAddr() { return emailAddr; }
		public void emailAddr(Object emailAddr) {
			this.emailAddr = (String)emailAddr;
		}
	
	/**
	 * 임시용 변수(ajaxutil.js 에서 ajaxGet에 다른 url정보를 받기위한 변수)
	 */
	private String tempStr;
		public String getTempStr() { return tempStr; }
		public void tempStr(Object tempStr) {
			this.tempStr = (String) tempStr;
		}
		
	/**
	 * 외부로부터 정보를 조회할 때 타입을 줘 필요한 정보를 가져온다.
	 */
	private String selectType;
		public String getSelectType() { return selectType; }
		public void selectType(Object selectType) {
			this.selectType = (String) selectType;
		}
		
	/**
	 * tenantId 
	 */
	private long tenantId;
		public long getTenantId() { return tenantId; }
		public void tenantId(Object tenantId) {
			this.tenantId = Long.valueOf((String)tenantId);
		}
		
	/** paging property */

	/**
	 * start
	 */
	private int start;
		public int getStart() { return start; }
		public void start(Object start) {
			this.start = Integer.parseInt(start+"");
		}
		
	/**
	 * cnt
	 */
	private int cnt;
		public int getCnt() { return cnt; }
		public void cnt(Object cnt) {
			this.cnt = Integer.parseInt(cnt+"");
		}
		
	/**
	 * page	
	 */
	private int page;
		public int getPage() { return page; }
		public void page(Object page) {
			this.page = Integer.parseInt(page+"");
		}
		
	/**
	 * rowNumToShow	
	 */
	private int rowNumToShow;
		public int getRowNumToShow() { return rowNumToShow; }
		public void rowNumToShow(Object rowNumToShow) {
			this.rowNumToShow = Integer.parseInt(rowNumToShow+"");
		}
	
	/**
	 * 날짜로검색시 부터
	 */
	private String fromDate;
		public String getFromDate() { return fromDate ;}
		public void fromDate(Object fromDate) {
			this.fromDate = (String)fromDate;
		}
		
	/**
	 * 날짜로검색시 까지
	 */
	private String toDate;
		public String getToDate() { return toDate; }
		public void toDate(Object toDate) {
			this.toDate = (String)toDate;
		}

	/**
	 * 
	 * @return String
	 */
	public String getTablePrefix() {
		return ArchiveTablePrefix.getPrefix();
	}

}