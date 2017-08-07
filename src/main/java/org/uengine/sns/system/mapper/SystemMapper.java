package org.uengine.sns.system.mapper;

import java.util.List;

import org.uengine.sns.group.vo.GroupVo;
import org.uengine.sns.system.vo.SystemVo;

/**
 * 
 * SystemMapper
 * @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/sns/system/system.xml
 *
 */
public interface SystemMapper {

	List<Long> selectSystemFeedList(SystemVo systemVo);

	List<GroupVo> selectSystemGroupList(SystemVo systemVo);

	List<SystemVo> selectSystemCompanyList();

}