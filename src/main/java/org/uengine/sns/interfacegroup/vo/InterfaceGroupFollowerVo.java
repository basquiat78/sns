package org.uengine.sns.interfacegroup.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * InterfaceGroupFollowerVo
 * <pre>
 *  이 부분은 해당 회사의 조직에 맞게 커스터마이징 되어야 한다.
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : 그룹웨어 EMPTABLE
 *
 */
@JsonInclude(Include.NON_NULL)
public class InterfaceGroupFollowerVo implements Serializable {

	private static final long serialVersionUID = 3545024774745009918L;
	
	/**
	 * 유저 아이디
	 */
	private String userId;
		public String getUserId() { return userId; }
		public void setUserId(String userId) { this.userId = userId; }

}