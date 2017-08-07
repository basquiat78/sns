package org.uengine.sns.common.util.service;

import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.awt.image.PixelGrabber;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URL;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;

/**
 * 
 * ThumbnailService
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
@Service("thumbnailService")
public class ThumbnailService {
	
	private  final Logger LOG = LoggerFactory.getLogger(ThumbnailService.class);

    public final int RATIO = 0;
    public final int SAME = -1;
    
	@Value("#{conf['common.thumbnail.repository.path']}")
	public String COMMON_THUMBNAIL_REPOSITORY_PATH;
	
	@Value("#{conf['common.thumbnail.width']}")
	private int Thumbnail_width;
	
	@Value("#{conf['common.thumbnail.height']}")
	private int Thumbnail_height;
	
	/**
	 * Constructor
	 */
	public ThumbnailService(){}
	
	/**
	 * @param originFileName
	 * @param originFilePath
	 */
	public void resizeImage(String originFileName, String originFilePath) {
		
		File orgin_file_name 	 = new File(originFilePath + originFileName);
		File thumbnail_file_name = new File(COMMON_THUMBNAIL_REPOSITORY_PATH + "thumbnail" + originFileName);
		
		try {
			BufferedImage buffered_origin_image = ImageIO.read(orgin_file_name);
			BufferedImage buffered_thumbnail_image = new BufferedImage(Thumbnail_width, Thumbnail_height, BufferedImage.TYPE_3BYTE_BGR);
			Graphics2D gra = buffered_thumbnail_image.createGraphics();
			gra.drawImage(buffered_origin_image, 0, 0, Thumbnail_width, Thumbnail_height, null);
			ImageIO.write(buffered_thumbnail_image, "jpg", thumbnail_file_name);
			
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
    /**
     * @param imgPath
     * @return String
     */
    public String imageToString(String imgPath) {
		
    	if(imgPath == null || imgPath.trim().equals("")) {
			LOG.info("imgPath is null.");
			return null;
		}
		
		if(imgPath.toLowerCase().startsWith("http")) {
			return imageToStr(imgPath);
		} else {
			File src = new File(imgPath);
			if(!src.exists()) {
				LOG.info("Image File is not exist. (" + imgPath + ")");
				return null;
			}
			
			int idx = imgPath.lastIndexOf(".");
			if(idx <= 0) {
				LOG.info("Image File's Extension is not exist. (" + imgPath + ")");
				return null;
			}
			
			String ext = imgPath.substring(idx+1).toLowerCase();
			if(!ext.equals("jpg") && !ext.equals("jpeg") && !ext.equals("gif") && !ext.equals("png") && !ext.equals("bmp")) {
				return null;
			}
			
			return imageToStr(src);
		}
	}

    /**
     * @param src
     * @return String
     */
    private String imageToStr(Object src) {
		
	    String fileString = new String();
	    ByteArrayOutputStream byteOutStream = null;

	    try {
			byteOutStream = new ByteArrayOutputStream();
			
			BufferedImage resizeImg = null;
			if(src instanceof File) {
				resizeImg = resize((File) src, 600);	// width 600 이미지로 변환
			} else {
				resizeImg = resize((String) src, 600);	// width 600 이미지로 변환
			}
			
			ImageIO.write(resizeImg, "jpg", byteOutStream);		// jpg 파일 포맷으로 변환
			
	        byte[] fileArray = byteOutStream.toByteArray();
	        fileString = Base64Utils.encodeToString(fileArray);

	    } catch (FileNotFoundException e) {
	        LOG.error("", e);
	        fileString = null;
	    } catch (IOException e) {
	        LOG.error("", e);
	        fileString = null;
	    } catch (Exception e) {
	        LOG.error("", e);
	        fileString = null;
	    } finally {
	    	try {
	    		byteOutStream.close();
    		} catch(Exception e) {
    			LOG.error("", e);
    		}
	    }
	    return fileString;
	}

    /**
     * @param src
     * @param width
     * @return BufferedImage
     * @throws IOException
     */
    public BufferedImage resize(File src, int width) throws IOException {
    	return resize(src, width, RATIO);
    }

    /**
     * @param url
     * @param width
     * @return BufferedImage
     * @throws IOException
     */
    public BufferedImage resize(String url, int width) throws IOException {
    	return resize(url, width, RATIO);
    }

    /**
     * @param url
     * @param width
     * @param height
     * @return BufferedImage
     * @throws IOException
     */
    public BufferedImage resize(String url, int width, int height) throws IOException {
    	URL location = new URL(url);
    	Image srcImg = new ImageIcon(location).getImage();
        return resize(srcImg, width, height);
    }

    /**
     * 이미지 품질유지
     * @param src
     * @param width
     * @param height
     * @return BufferedImage
     * @throws IOException
     */
    public BufferedImage resize(File src, int width, int height) throws IOException {
        Image srcImg = null;
        String suffix = src.getName().substring(src.getName().lastIndexOf('.')+1).toLowerCase();
        if(suffix.equals("bmp") || suffix.equals("png") || suffix.equals("gif")) {
            srcImg = ImageIO.read(src);
        } else {
            // BMP가 아닌 경우 ImageIcon을 활용해서 Image 생성
            // 이렇게 하는 이유는 getScaledInstance를 통해 구한 이미지를
            // PixelGrabber.grabPixels로 리사이즈 할때
            // 빠르게 처리하기 위함이다.
            srcImg = new ImageIcon(src.toURI().toURL()).getImage();
        }
        return resize(srcImg, width, height);
    }

    /**
     * @param srcImg
     * @param width
     * @param height
     * @return BufferedImage
     * @throws IOException
     */
    private BufferedImage resize(Image srcImg, int width, int height) throws IOException {

        int srcWidth = srcImg.getWidth(null);
        int srcHeight = srcImg.getHeight(null);
        
        int destWidth = -1, destHeight = -1;
        
        if(width == SAME) {
            destWidth = srcWidth;
        } else if (width > 0) {
            destWidth = width;
        }
        
        if(height == SAME) {
            destHeight = srcHeight;
        } else if (height > 0) {
            destHeight = height;
        }
        
        if(width == RATIO && height == RATIO) {
            destWidth = srcWidth;
            destHeight = srcHeight;
        } else if (width == RATIO) {
            double ratio = ((double)destHeight) / ((double)srcHeight);
            destWidth = (int)((double)srcWidth * ratio);
        } else if (height == RATIO) {
            double ratio = ((double)destWidth) / ((double)srcWidth);
            destHeight = (int)((double)srcHeight * ratio);
        }
        
        Image imgTarget = srcImg.getScaledInstance(destWidth, destHeight, Image.SCALE_SMOOTH); 
        int pixels[] = new int[destWidth * destHeight]; 
        PixelGrabber pg = new PixelGrabber(imgTarget, 0, 0, destWidth, destHeight, pixels, 0, destWidth); 
        try {
            pg.grabPixels();
        } catch (InterruptedException e) {
            throw new IOException(e);
        } 
        BufferedImage destImg = new BufferedImage(destWidth, destHeight, BufferedImage.TYPE_INT_RGB); 
        destImg.setRGB(0, 0, destWidth, destHeight, pixels, 0, destWidth); 
        
        return destImg;
    }

}