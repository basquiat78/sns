package org.uengine.sns.member.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * MentionsVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : ${default.table.prefix}MEMBER
 *
 */
@JsonInclude(Include.NON_NULL)
public class MentionsVo implements Serializable {

	private static final long serialVersionUID = -2365419224291298225L;
	
	/**
	 * 등록자 아이디
	 */
	private long id;
		public long getId() { return id; }
		public void setId(long id) { this.id = id; }
		
	/**
	 * 멤버 이름 	
	 */
	private String name;
		public String getName() { return name; }
		public void setName(String name) { this.name = name; }

	/** 
	 * 그룹웨어 사용자 아이디 
	 */
	private String userId;
		public String getUserId() { return userId; }
		public void setUserId(String userId) { this.userId = userId; }
	
	/**
	 * 멤버 사진 경로	
	 */
	private String avatar;	
		public String getAvatar() { return avatar; }
		public void setAvatar(String avatar) { this.avatar = avatar; }

	/**
	 * jobPositionName
	 */
	private String jobPositionName;
		public String getJobPositionName() { return jobPositionName; }
		public void setJobPositionName(String jobPositionName) { this.jobPositionName = jobPositionName; }
	
	/**
	 * deptFullPath
	 */
	private String deptFullPath;
		public String getDeptFullPath() { return deptFullPath; }
		public void setDeptFullPath(String deptFullPath) { this.deptFullPath = deptFullPath; }
	
	/**
	 * 아이콘
	 */
	private String icon;
		public String getIcon() { return icon; }
		public void setIcon(String icon) { this.icon = icon; }
		
	/**
	 * 아이콘
	 */
	private String email;
		public String getEmail() { return email; }
		public void setEmail(String email) { this.email = email; }

	/**
	 * 타입
	 */
	private String type;
		public String getType() { return type; }
		public void setType(String type) { this.type = type; }

}