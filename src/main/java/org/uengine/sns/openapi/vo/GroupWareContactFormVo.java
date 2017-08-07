package org.uengine.sns.openapi.vo;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * GroupWareContactFormVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : 그룹웨어 관련 테이블
 *
 */
@JsonInclude(Include.NON_NULL)
public class GroupWareContactFormVo implements Serializable {

	private static final long serialVersionUID = -2604861879644371937L;
	
	/**
	 * sortColumn
	 */
	private String sortColumn;
		public String getSortColumn() { return sortColumn; }
		public void setSortColumn(String sortColumn) { this.sortColumn = sortColumn; }
		
	/**
	 * sortOrder
	 */	
	private String sortOrder;
		public String getSortOrder() { return sortOrder; }
		public void setSortOrder(String sortOrder) { this.sortOrder = sortOrder; }
	
	/**
	 * contactList
	 */		
	private List<GroupWareContactUserVo> contactList;
		public List<GroupWareContactUserVo> getContactList() { return contactList; }
		public void setContactList(List<GroupWareContactUserVo> contactList) { this.contactList = contactList; }

	@Override
	public String toString() {
		return "GroupWareContactFormVo [sortColumn=" + sortColumn
				+ ", sortOrder=" + sortOrder + ", contactList=" + contactList
				+ "]";
	}
	
}