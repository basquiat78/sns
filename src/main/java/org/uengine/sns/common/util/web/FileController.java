package org.uengine.sns.common.util.web;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.uengine.sns.common.Exception.SNSFileNotFoundException;
import org.uengine.sns.common.Exception.SNSRunTimeException;
import org.uengine.sns.common.util.DesUtil;
import org.uengine.sns.common.util.FileUtil;
import org.uengine.sns.common.util.UtilRestful;
import org.uengine.sns.common.util.service.FileService;
import org.uengine.sns.common.util.vo.FileVo;
import org.uengine.sns.feed.service.FeedFileService;
import org.uengine.sns.feed.vo.FeedFileVo;
import org.uengine.sns.openapi.service.GroupWareService;

/**
 * 
 * FileController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Controller
public class FileController extends UtilRestful {
	
	@Value("#{conf['common.file.repository.path']}")
	public String COMMON_FILE_REPOSITORY_PATH;
	
	@Autowired
	FeedFileService feedFileService;
	
	@Autowired
	FileService fileService;
	
	/**
	 * @param session
	 * @param itemBean
	 * @param file
	 */
	@RequestMapping(value = FILE_UPLOAD_FORM, method = RequestMethod.POST)
	public void process(HttpSession session, FileVo itemBean,
            @RequestParam("file")MultipartFile file) {
				
		try {
			fileService.writeToFile(file.getInputStream(), fileService.COMMON_FILE_REPOSITORY_PATH + "", "");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * @param request
	 * @return FeedFileVo
	 */
	@RequestMapping(value = FILE_UPLOAD_AJAX, method = RequestMethod.POST)
    @ResponseBody
    public FeedFileVo uploadFile(MultipartHttpServletRequest request) {
		return fileService.ajaxFileWrite(request, false);
    }
	
	/**
	 * @param request
	 * @return FeedFileVo
	 */
	@RequestMapping(value = IMGFILE_UPLOAD_AJAX, method = RequestMethod.POST)
    @ResponseBody
    public FeedFileVo uploadImgFile(MultipartHttpServletRequest request) {
		return fileService.ajaxFileWrite(request, true);
    }
	
	/**
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = FILE_COMMON_UPLOAD)
	public void processFile(HttpServletRequest request, HttpServletResponse response) {
				
		try {
			fileService.procesFile(request, response);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 파일 사진 가져오기
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = FILE_COMMON_INFO, method = RequestMethod.GET)
	public void getFilePicture(HttpServletRequest request, HttpServletResponse response) {
		String   fileId 	  	= request.getParameter("fileId");
		FeedFileVo vo           = feedFileService.getFeedFileById(Long.valueOf(fileId));
		String   picUrl   = vo.getFileUrl();
		String   picName  = vo.getFileSaveName();
		fileService.imgSrcToResponse(request, response, picUrl + File.separator + picName, fileService.COMMON_FILE_REPOSITORY_PATH);
	}
	
	/**
	 * @param fileId
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = FILE_COMMON_BY_ID, method = RequestMethod.GET)
	public void download(@PathVariable("fileId") long fileId, HttpServletRequest request, HttpServletResponse response) {
		
		FeedFileVo fileVo = feedFileService.getFeedFileById(fileId);
		if(fileVo == null || fileVo.getFileName() == null) {
			throw new SNSFileNotFoundException("File not found.");
		}
		
		String filePath = COMMON_FILE_REPOSITORY_PATH + fileVo.getFileUrl() + File.separator + fileVo.getFileSaveName();
		
		File file = new File(filePath);
		if(!file.exists()) {
			throw new SNSFileNotFoundException("File not found.");
		}
		
		response.setContentType("application/octet-stream; charset=utf-8");
		response.setContentLength((int) file.length());
		
		String header = FileUtil.getBrowser(request);
		
		try {
		
			if(header.contains("MSIE")) {
				
				String fileName = URLEncoder.encode(fileVo.getFileName() ,"UTF-8").replaceAll("\\+", "%20");
				response.setHeader("Content-Disposition", "attachment;filename=" + fileName + ";");
				
			} else  {
				
				String fileName = new String(fileVo.getFileName().getBytes("UTF-8"), "ISO-8859-1");
				response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
				
			}
			
			response.setHeader("Content-Transfer-Encoding", "binary");
		 
			OutputStream os = response.getOutputStream();
			FileInputStream fis = null;
	 
			try {
				fis = new FileInputStream(file);
				FileCopyUtils.copy(fis, os);
			} finally {
				if(fis != null) {
					try {
						fis.close();
					} catch (Exception e) {
						
					}
				}
			}
			
			os.flush();
			os.close();
		
		} catch (Exception e) {
				throw new SNSRunTimeException(e.getMessage());
		}

	}
	
	/**
	 * @param fileId
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = FILE_INTERNAL_BY_ID, method = RequestMethod.GET)
	public void goInternalDownload(@PathVariable("fileId") long fileId, HttpServletRequest request, HttpServletResponse response) {
		
		FeedFileVo fileVo = feedFileService.getFeedFileById(fileId);
		if(fileVo == null || fileVo.getFileName() == null) {
			throw new SNSFileNotFoundException("File not found.");
		}
		
		String filePath = COMMON_FILE_REPOSITORY_PATH + fileVo.getFileUrl() + File.separator + fileVo.getFileSaveName();
		
		File file = new File(filePath);
		if(!file.exists()) {
			throw new SNSFileNotFoundException("File not found.");
		}
		
		response.setContentType("application/octet-stream; charset=utf-8");
		response.setContentLength((int) file.length());
		
		String header = FileUtil.getBrowser(request);
		
		try {
		
			if(header.contains("MSIE")) {
				
				String fileName = URLEncoder.encode(file.getName(),"UTF-8").replaceAll("\\+", "%20");
				response.setHeader("Content-Disposition", "attachment;filename=" + fileName + ";");
				
			} else {
				
				String fileName = new String(file.getName().getBytes("UTF-8"), "ISO-8859-1");
				response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
				
			}
			
			response.setHeader("Content-Transfer-Encoding", "binary");
		 
			OutputStream os = response.getOutputStream();
			FileInputStream fis = null;
	 
			try {
				fis = new FileInputStream(file);
				FileCopyUtils.copy(fis, os);
			} finally {
				if(fis != null) {
					try {
						fis.close();
					} catch (Exception e) {
						
					}
				}
			}
			
			os.flush();
			os.close();
		
		} catch (Exception e) {
			throw new SNSRunTimeException(e.getMessage());
		}
		
	}

	/**
	 * @param fileStr
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = FILE_INTERNAL_BY_STR, method = RequestMethod.GET)
	public void chiperFileDownload(@PathVariable("fileStr") String fileStr, HttpServletRequest request, HttpServletResponse response) {
		
		if(fileStr == null) {
			throw new SNSFileNotFoundException("File not found.");
		}
		
		String filePath = DesUtil.decrypt(GroupWareService.fileDownDecryptKey, fileStr);
		
		File file = new File(filePath);
		if(!file.exists()) {
			throw new SNSFileNotFoundException("File not found.");
		}
		
		response.setContentType("application/octet-stream; charset=utf-8");
		response.setContentLength((int) file.length());
		
		String header = FileUtil.getBrowser(request);
		
		try {
		
			if(header.contains("MSIE")) {
				
				String fileName = URLEncoder.encode(file.getName(),"UTF-8").replaceAll("\\+", "%20");
				response.setHeader("Content-Disposition", "attachment;filename=" + fileName + ";");
				
			} else {
				
				String fileName = new String(file.getName().getBytes("UTF-8"), "ISO-8859-1");
				response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
				
			}
			
			response.setHeader("Content-Transfer-Encoding", "binary");
		 
			OutputStream os = response.getOutputStream();
			FileInputStream fis = null;
	 
			try {
				fis = new FileInputStream(file);
				FileCopyUtils.copy(fis, os);
			} finally {
				if(fis != null) {
					try {
						fis.close();
					} catch (Exception e) {
						
					}
				}
			}
			
			os.flush();
			os.close();
		
		} catch (Exception e) {
			throw new SNSRunTimeException(e.getMessage());
		}
		
	}

}