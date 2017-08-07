package org.uengine.sns.common.batch;

import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.uengine.sns.interfacegroup.service.InterfaceGroupService;

/**
 * InterfaceGroupManageJob
 * 그룹웨어의 그훕을 SNS의 그룹으로 포팅을 하고 해당 전문가 그룹의 멤버를 포팅한 그룹의 그룹 팔로워로 등록한다.
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class InterfaceGroupManageJob extends QuartzJobBean {

	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(InterfaceGroupManageJob.class);
	
	/**
	 * DI
	 */
	InterfaceGroupService interfaceGroupService; 
		public void setInterfaceGroupService(InterfaceGroupService interfaceGroupService) {
			this.interfaceGroupService = interfaceGroupService;
		}

	@Override
	protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {

		JobDataMap jdm = jobExecutionContext.getTrigger().getJobDataMap();
		String companyId = (String) jdm.get("companyId");
		interfaceGroupService.pottingInterfaceGroupToSNSGroup(companyId);
	}

}