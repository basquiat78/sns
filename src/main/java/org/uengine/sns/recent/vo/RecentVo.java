package org.uengine.sns.recent.vo;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * RecentVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : ${default.table.prefix}RCTITEM
 *
 */
@JsonInclude(Include.NON_NULL)
public class RecentVo implements Serializable {

	private static final long serialVersionUID = -2529581250545968438L;
	
	/**
	 * 등록자 아이디
	 */
	private long regMemberId;
		public long getRegMemberId() { return regMemberId; }
		public void setRegMemberId(long regMemberId) { this.regMemberId = regMemberId; }
		
	/**
	 * 아이템 아이디 	
	 */
	private long itemId;
		public long getItemId() { return itemId; }
		public void setItemId(long itemId) { this.itemId = itemId; }
		
	/**
	 * 아이템 타입
	 */
	private String itemType;
		public String getItemType() { return itemType; }
		public void setItemType(String itemType) { this.itemType = itemType; }
		
	/**
	 * 갱신 일시 	
	 */
	private Date updateDate;	
		public Date getUpdateDate() { return updateDate; }
		public void setUpdateDate(Date updateDate) { this.updateDate = updateDate; }
		
	/**
	 * 갱신 횟수	
	 */
	private Integer clickedCount;
		public Integer getClickedCount() { return clickedCount; }
		public void setClickedCount(Integer clickedCount) { this.clickedCount = clickedCount;}
		
}