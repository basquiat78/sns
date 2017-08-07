package org.uengine.sns.common.batch;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.uengine.sns.notice.service.NoticeService;

/**
 * 
 * ToDoFeedManageJob
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class ToDoFeedManageJob extends QuartzJobBean {

	/**
	 * DI
	 */
	NoticeService noticeService;
		public void setNoticeService(NoticeService noticeService) { 
			this.noticeService = noticeService; 
		}
	
	@Override
	protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
		noticeService.insertTomorrowTodo();
	}

}