package org.uengine.sns.common.util.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.UUID;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.imgscalr.Scalr;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.uengine.sns.common.Exception.SNSRunTimeException;
import org.uengine.sns.common.code.SNSCodeMaster;
import org.uengine.sns.common.util.FileUtil;
import org.uengine.sns.feed.vo.FeedFileVo;

/**
 * 
 * FileService
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("fileService")
public class FileService {

	private static final Logger LOG = LoggerFactory.getLogger(FileService.class);
	
	@Value("#{conf['common.file.repository.path']}")
	public String COMMON_FILE_REPOSITORY_PATH;
	
	@Value("#{conf['common.file.tmp.path']}")
	public String COMMON_FILE_TMP_PATH;
	
	@Value("#{conf['web.file.repository.path']}")
	public String WEB_FILE_REPOSITORY_PATH;

	@Value("#{conf['eg.member.images.path']}")
	public String MEMBER_IMG_PATH;
	
	@Value("#{conf['common.file.repository.prgssing.path']}")
	public String COMMON_FILE_PRGSSING_REPOSITORY_PATH;
	
	/**
	 * @param uploadedInputStream
	 * @param uploadedFileLocation
	 * @param fileName
	 * @return String
	 */
	public String writeToFile(InputStream uploadedInputStream, String uploadedFileLocation, String fileName) {
		OutputStream out = null;
		
		String realDirectory = "";
		String returnFilePath = "";
		
		try {
			realDirectory = FileUtil.makeFileDir();
			
			// 폴더 없으면 폴더 생성
			File dir = new File(uploadedFileLocation + realDirectory);
	        if(!dir.exists()) { 
	        	dir.mkdirs();
	        }
			
	        // 반환할 파일 실제 경로
	        returnFilePath = realDirectory + File.separator + fileName;
	        
	        // 실제 파일을 저장할 위치 스트림
			out = new FileOutputStream(new File(uploadedFileLocation + returnFilePath));
			int read = 0;
			byte[] bytes = new byte[1024];

			while((read = uploadedInputStream.read(bytes)) != -1) {
				out.write(bytes, 0, read);
			}
			out.flush();
			out.close();
			
		} catch (IOException e) {
			LOG.error("", e);
		} finally {
			try {
				if(out != null) {
					out.close();
				}
			} catch (IOException e) {
				LOG.error("", e);
			}
		}
		
		return returnFilePath;
	}
	
	/**
	 * @param request
	 * @param b
	 * @return FeedFileVo
	 */
	public FeedFileVo ajaxFileWrite(MultipartHttpServletRequest request, boolean b) {
		
		Iterator<String> itr =  request.getFileNames();
        if(itr.hasNext()) {
           
        	MultipartFile mpf = request.getFile(itr.next());
        	FeedFileVo feedFileVo = new FeedFileVo();
        	
            try {
            		
            	String fileName = mpf.getOriginalFilename();
            	/**
            	 * 확장자와 임시 폴더에 들어가는 파일은 유니크한 파일명으로 넣기 위해 UUID를 이용해 파일명을 생성한다.
            	 */
            	int pointIdx = fileName.lastIndexOf(".");
            	String ext = "";
            	String uuIdFileName = null;
            	if(pointIdx > -1) {
                	ext = fileName.substring(pointIdx+1).toLowerCase();
                	
                	boolean isLimitedExtension = true;
                	switch(ext.toLowerCase()) {
    				case "exe":
    				case "jsp":
    				case "asp":
    				case "php":
    				case "cgi":
    				case "php3":
    				case "inc":
    				case "pl":
    				case "html":
    				case "htm":
    				case "js":
    					isLimitedExtension = true;
    					break;
    				default:
    					isLimitedExtension = false;
    					break;
    				}
                	
                	if(b) {
                		switch(ext.toLowerCase()) {
        				case "png":
        				case "jpg":
        				case "jpeg":
        				case "gif":
        			
        					isLimitedExtension = false;
        					break;
        				default:
        					isLimitedExtension = true;
        					break;
        				}
                	}
                	
                	if(isLimitedExtension) {
                		throw new SNSRunTimeException("업로드할 수 없는 파일입니다.");
                	}
                	uuIdFileName = UUID.randomUUID().toString()+"."+ext;
            	} else {
                	uuIdFileName = UUID.randomUUID().toString();
            	}
            	
            	String filePath = writeToFile(mpf.getInputStream(), COMMON_FILE_TMP_PATH, uuIdFileName);
            	
            	feedFileVo.setFileName(fileName);
            	feedFileVo.setTempFileName(uuIdFileName);
            	feedFileVo.setFileContentType(mpf.getContentType());
            	feedFileVo.setFileExt(ext);
            	feedFileVo.setMblThumbFileName("/");
            	feedFileVo.setThunmbFileName("/");
            	feedFileVo.setRepositoryType(SNSCodeMaster.REPOSITORY_TYPE.LOCAL.toString());
            	feedFileVo.setFileUrl(filePath);

            } catch (SNSRunTimeException e) {
            	throw e;
            } catch (IOException e) {
            	LOG.error("", e);
        		throw new SNSRunTimeException("파일업로드시 에러가 발생했습니다.");
            } catch(Exception e) {
            	LOG.error("", e);
        		throw new SNSRunTimeException("파일업로드시 에러가 발생했습니다.");
            }
            
            return feedFileVo;
        } else {
    		throw new SNSRunTimeException("파일스트림이 존재하지 않습니다.");
        }
	}
	
	/**
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void procesFile(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
    	String orgnFileNm = request.getParameter("orgnFileNm") == null ? "" : request.getParameter("orgnFileNm");
    	orgnFileNm = new String(orgnFileNm.getBytes("UTF-8"),"8859_1");
    	String tempDir = FileUtil.makeFileDir();
    	
    	response.setCharacterEncoding("utf-8");
		response.setContentType("text/plain");   
		
        if(request.getParameter("getfile") != null && !request.getParameter("getfile").isEmpty()) {
            File file = new File(COMMON_FILE_TMP_PATH + tempDir + File.separator + request.getParameter("getfile"));
            
            
            if(file.exists()) {
                int bytes = 0;
                ServletOutputStream op = response.getOutputStream();

                response.setContentType(getMimeType(file));
                response.setContentLength((int) file.length());
                response.setHeader( "Content-Disposition", "inline; filename=\"" + orgnFileNm + "\"" );

                byte[] bbuf = new byte[1024];
                DataInputStream in = new DataInputStream(new FileInputStream(file));

                while((in != null) && ((bytes = in.read(bbuf)) != -1)) {
                    op.write(bbuf, 0, bytes);
                }

                in.close();
                op.flush();
                op.close();
            }
        } else if(request.getParameter("delfile") != null && !request.getParameter("delfile").isEmpty()) {
        	String fileFullPath = COMMON_FILE_TMP_PATH + tempDir + File.separator +  (request.getParameter("delfile") == null ? "" : request.getParameter("delfile").trim());
            File file = new File(fileFullPath);
            if(file.exists()) {
                if(file.delete() == false) {
                	new File(fileFullPath).delete();
                }
            }
        } else if(request.getParameter("getthumb") != null && !request.getParameter("getthumb").isEmpty()) {
            File file = new File(COMMON_FILE_TMP_PATH + tempDir + File.separator +  request.getParameter("getthumb"));
                if(file.exists()) {
                    LOG.debug(file.getAbsolutePath());
                    String mimetype = "";
                    if(orgnFileNm.lastIndexOf(".") > 0) {
                    	mimetype = orgnFileNm.substring(orgnFileNm.lastIndexOf(".") + 1).toLowerCase();
                    }
                    
                    if(mimetype.endsWith("png") || mimetype.endsWith("jpeg")|| mimetype.endsWith("jpg") || mimetype.endsWith("gif")) {
                        BufferedImage im = ImageIO.read(file);
                        if(im != null) {
                            BufferedImage thumb = Scalr.resize(im, 75); 
                            ByteArrayOutputStream os = new ByteArrayOutputStream();
                            if(mimetype.endsWith("png")) {
                                ImageIO.write(thumb, "PNG" , os);
                                response.setContentType("image/png");
                            } else if(mimetype.endsWith("jpeg")) {
                                ImageIO.write(thumb, "jpg" , os);
                                response.setContentType("image/jpeg");
                            } else if(mimetype.endsWith("jpg")) {
                                ImageIO.write(thumb, "jpg" , os);
                                response.setContentType("image/jpeg");
                            } else {
                                ImageIO.write(thumb, "GIF" , os);
                                response.setContentType("image/gif");
                            }
                            ServletOutputStream srvos = response.getOutputStream();
                            response.setContentLength(os.size());
                            response.setHeader( "Content-Disposition", "inline; filename=\"" + orgnFileNm + "\"" );
                            os.writeTo(srvos);
                            srvos.flush();
                            srvos.close();
                        }
                    }
            }
        } else {
        	if(request instanceof MultipartHttpServletRequest) {
        		
        		PrintWriter writer = response.getWriter();
	        	MultipartHttpServletRequest mptRequest = (MultipartHttpServletRequest)request;
	    		Iterator<String> itr =  mptRequest.getFileNames();
	    		JSONArray json = new JSONArray();
	    		String fileName = null;
	    		FeedFileVo feedFileVo = null;
	    		MultipartFile mpf = null;
	    		
	    		File fileDir = new File(COMMON_FILE_TMP_PATH + tempDir);
	    		if(fileDir.exists() == false) {
	    			fileDir.mkdirs();
	    		}
	    		
	    		while(itr.hasNext()) {
	               
	            	mpf = mptRequest.getFile(itr.next());
	            	feedFileVo = new FeedFileVo();
	                		
	            	fileName = mpf.getOriginalFilename();
	            	/**
	            	 * 확장자와 임시 폴더에 들어가는 파일은 유니크한 파일명으로 넣기 위해 UUID를 이용해 파일명을 생성한다.
	            	 */
	            	String ext = fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();
	            	String uuIdFileName = "HW_" + System.nanoTime();
	            	
	            	feedFileVo.setFileName(fileName);
	            	feedFileVo.setTempFileName(uuIdFileName);
	            	feedFileVo.setFileContentType(mpf.getContentType());
	            	feedFileVo.setFileExt(ext);
	            	feedFileVo.setMblThumbFileName("/");
	            	feedFileVo.setThunmbFileName("/");
	            	feedFileVo.setRepositoryType("r");
	            	feedFileVo.setFileUrl(writeToFile(mpf.getInputStream(), COMMON_FILE_TMP_PATH, uuIdFileName));

	            	JSONObject jsono = new JSONObject();
	                jsono.put("name", fileName);
	                jsono.put("size", mpf.getSize());
	                jsono.put("url", "/sns/common/upload/file?getfile=" + uuIdFileName + "&orgnFileNm=" + fileName);
	                jsono.put("orgnFileNm", fileName);
	                jsono.put("thumbnail_url", "/sns/common/upload/file?getthumb=" + uuIdFileName  + "&orgnFileNm=" + fileName);
	                jsono.put("delete_url", "/sns/common/upload/file?delfile=" + uuIdFileName);
	                jsono.put("delete_type", "GET");
	                json.put(jsono);
	                
	                LOG.debug(json.toString());
	                
	                writer.write(json.toString());
	                writer.close();	
	                
	            } 
        	}
        }

	}

	/**
	 * @param filename
	 * @return String
	 */
	private String getSuffix(String filename) {
        String suffix = "";
        int pos = filename.lastIndexOf('.');
        if(pos > 0 && pos < filename.length() - 1) {
            suffix = filename.substring(pos + 1);
        }
        return suffix;
    }
	
	/**
	 * @param file
	 * @return String
	 */
    private String getMimeType(File file) {
        String mimetype = "";
        if(file.exists()) {
            if(getSuffix(file.getName()).equalsIgnoreCase("png")) {
                mimetype = "image/png";
            } else if(getSuffix(file.getName()).equalsIgnoreCase("jpg")) {
                mimetype = "image/jpg";
            } else if(getSuffix(file.getName()).equalsIgnoreCase("jpeg")) {
                mimetype = "image/jpeg";
            } else if(getSuffix(file.getName()).equalsIgnoreCase("gif")) {
                mimetype = "image/gif";
            } else {
                javax.activation.MimetypesFileTypeMap mtMap = new javax.activation.MimetypesFileTypeMap();
                mimetype  = mtMap.getContentType(file);
            }
        }
        return mimetype;
    }
	
    /**
     * @param request
     * @param response
     * @param imgUrl
     * @param repositoryUrl
     * @param blankImgUrl
     * @param blankRepositoryUrl
     */
    public void imgSrcToResponse(HttpServletRequest request, HttpServletResponse response, String imgUrl, String repositoryUrl, String blankImgUrl, String blankRepositoryUrl) {
    	boolean b = imgSrcToResponse(request, response, imgUrl, repositoryUrl);
    	if(!b) {
    		imgSrcToResponse(request, response, blankImgUrl, blankRepositoryUrl);
    	}
    }
    
    /**
     * @param request
     * @param response
     * @param imgUrl
     * @param repositoryUrl
     * @return boolean
     */
    public boolean imgSrcToResponse(HttpServletRequest request, HttpServletResponse response, String imgUrl, String repositoryUrl) {
    
		if(StringUtils.isEmpty(imgUrl)) {
			return false;
		}
		
		response.setContentType("image/jpeg");
		
		File f = new File(repositoryUrl + imgUrl);
		
		OutputStream out = null;
		FileInputStream ifo = null;
		ByteArrayOutputStream baos = null;
		
		boolean b = false;
		try {
			if(f.exists() && f.isFile()) {
				ifo = new FileInputStream(f);
				baos = new ByteArrayOutputStream();
				byte[] buf = new byte[1024];
				int readlength = 0;
				
				while((readlength=ifo.read(buf)) != -1) {
					baos.write(buf, 0, readlength);
				}
				
				byte[] imgbuf = baos.toByteArray();
				
				int length = imgbuf.length;
				
				out = response.getOutputStream();
				out.write(imgbuf, 0, length);
				
				b = true;
			}
		} catch(Exception e) {
			LOG.error("", e);
		} finally {
			if(baos != null) try { baos.close(); } catch(Exception e) { LOG.warn("", e);}
			if(ifo != null) try { ifo.close(); } catch(Exception e) { LOG.warn("", e);}
			if(out != null) try { out.close(); } catch(Exception e) { LOG.warn("", e);}
		}
		return b;
	}
    
    /**
     * @param feedFileVo
     * @return String
     */
    public String copyToFile(FeedFileVo feedFileVo) {
    	
    	FileInputStream inputStream = null;
    	String fileUrl = feedFileVo.getFileUrl();
    	String fileName = feedFileVo.getTempFileName();
    	String returnFilePath = "";
    	
    	try {
			// 스트림 생성
    		File sourceFile = new File( COMMON_FILE_TMP_PATH + fileUrl);
			inputStream = new FileInputStream(sourceFile);
			returnFilePath = writeToFile(inputStream, COMMON_FILE_REPOSITORY_PATH, fileName);

		} catch (Exception e) {
			LOG.error("", e);
		} finally {
			try {
				inputStream.close();
			} catch (IOException e) {
				LOG.error("", e);
			}
		}
    	
    	return returnFilePath;
    }

}