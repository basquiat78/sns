package org.uengine.sns.common.batch;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.uengine.sns.recent.service.RecentService;

/**
 * 
 * RecentFeedManageJob
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class RecentFeedManageJob extends QuartzJobBean {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(RecentFeedManageJob.class);
	
	/**
	 * DI
	 */
	RecentService recentService;
		public void setRecentService(RecentService recentService) {
			this.recentService = recentService;
		}

	@Override
	protected void executeInternal(JobExecutionContext context)
			throws JobExecutionException {
		deleteRecentActBatch();
	}

	/**
	 * Delete
	 */
	private void deleteRecentActBatch() {
		recentService.deleteRecentActBatch("x");
	}

}