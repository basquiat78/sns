package org.uengine.sns.search.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * SearchVo
 * <pre>
 * 	<p>GroupWare로부터 제공받는 api로 </p>
 *  <p>커스터마이징 되어야 하는 영역</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : 외부연동 관련 테이블
 *
 */
@JsonInclude(Include.NON_NULL)
public class SearchVo implements Serializable {

	private static final long serialVersionUID = -1968038606455697877L;

}