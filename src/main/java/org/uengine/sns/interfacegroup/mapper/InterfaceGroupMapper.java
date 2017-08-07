package org.uengine.sns.interfacegroup.mapper;

import java.util.List;

import org.uengine.sns.interfacegroup.vo.InterfaceGroupFollowerVo;
import org.uengine.sns.interfacegroup.vo.InterfaceGroupVo;

/**
 * 
 * InterfaceGroupMapper
 * <pre>
 * 	<p>그룹웨어 인터페이스를 위한 매퍼</p>
 * 	<p>커스터마이징이 요구된다.</p>
 * </pre>
 * @author uEngine-basquiat (uEngine Solutions)
 * @See /mapper/${db.product}/sns/interfacegroup/interfacegroup.xml
 * 
 */
public interface InterfaceGroupMapper {
	
	void updateEmployeeGroup(InterfaceGroupVo group);
	void updateExpertGroup(InterfaceGroupVo group);
	
	List<InterfaceGroupVo> selectExpertGroupList();
	List<InterfaceGroupVo> selectEmployeeGroupList(String companyId);
	
	List<InterfaceGroupFollowerVo> selectEmployeeGroupFollowerList(long contentsId);
	List<InterfaceGroupFollowerVo> selectExpertGroupFollowerListByCodetype3();
	List<InterfaceGroupFollowerVo> selectExpertGroupFollowerListByCodetype6();
	List<InterfaceGroupFollowerVo> selectExpertGroupFollowerListByCodetype9();
	List<InterfaceGroupFollowerVo> selectExpertGroupFollowerListByCodetype15();
	List<InterfaceGroupFollowerVo> selectExpertGroupFollowerListByCodetype19();
	List<InterfaceGroupFollowerVo> selectExpertGroupFollowerListByCodetype21();

}