package org.uengine.sns.common.batch;

import java.io.File;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.uengine.sns.feed.service.FeedFileService;

/**
 * 
 * TmpFileDeleteJob
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class TmpFileDeleteJob extends QuartzJobBean {
	
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(TmpFileDeleteJob.class);

	/**
	 * DI
	 */
	FeedFileService feedFileService;
		public void setFeedFileService(FeedFileService feedFileService) {this.feedFileService = feedFileService;}

	@Override
    protected void executeInternal(JobExecutionContext arg0) throws JobExecutionException {
		deleteTmpAllFiles(feedFileService.COMMON_FILE_TMP_PATH);
    }

	/**
	 * 임시 파일 삭제
	 * @param path
	 */
	public void deleteTmpAllFiles(String path) {
		try {
			File file = new File(path);
			//폴더내 파일을 배열로 가져온다.
			File[] tempFile = file.listFiles();

			if(tempFile != null && tempFile.length >0) {
				
				for (int i = 0; i < tempFile.length; i++) {
					
					if(tempFile[i].isFile()){
						tempFile[i].delete();
					}else{
						//재귀함수
						deleteTmpAllFiles(tempFile[i].getPath());
					}
					tempFile[i].delete();
				}
				file.delete();
			}
		} catch (Exception e) {
			
		} 
	}

}