package org.uengine.sns.feed.vo;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * CalendarVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : ${default.table.prefix}CHAT_FOLLOWER
 *
 */
@JsonInclude(Include.NON_NULL)
public class CalendarVo implements Serializable {
	
	private static final long serialVersionUID = 1693631447204366531L;
	
	/**
	 * Feed Id	
	 */
	public int feedId;
		public int getFeedId() { return feedId; }
		public void setFeedId(int feedId) { this.feedId = feedId; }
	
		
	/**
	 * title
	 */	
	public String title;
		public String getTitle() { return title; }
		public void setTitle(String title) { this.title = title; }
	
		
	/**
	 * start
	 */
	public String start;
		public String getStart() { 
			return getDateFormat(start, "yyyy-MM-dd");
		}
		public void setStart(String start) { this.start = start; }
	
		
	/**
	 * end
	 */	
	public String end;
		public String getEnd() { 
			return getDateFormat(end, "yyyy-MM-dd");
		}
		public void setEnd(String end) { this.end = end; }
	
	/**
	 * 완료 처리일 에 대한 정보를 담는 변수
	 */
	public String endInfo;
		public String getEndInfo() { return getDateFormat(endInfo, "yyyy-MM-dd"); }
		public void setEndInfo(String endInfo) { this.endInfo = endInfo; }

	/**
	 * color
	 */
	public String color;
		public String getColor() { 
			
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
			Date date = new Date();
			String curDate = dateFormat.format(date);
			String retColor = null;
			if (end != null && end.length() > 0) {
				retColor = completeColor == null ? "#868686" : completeColor;		//완료
			} else if (start != null && start.compareTo(curDate) <= 0) {
				retColor = notCompleteColor == null ? "#d86d64" : notCompleteColor;		//미완료
			} else {
				retColor = processingColor == null ? "#76881e" : processingColor;	//진행
			}
			
			return retColor; 
		}
		public void setColor(String color) { this.color = color; }
	
	/**
	 * url
	 */
	public String url;
		public String getUrl() { return url; }
		public void setUrl(String url) { this.url = url; }

	/**
	 * 
	 */
	public String realTitle;
		public String getRealTitle() { return realTitle; }
		public void setRealTitle(String realTitle) { this.realTitle = realTitle; }
	
	/**
	 * 
	 */
	public String regMemberId;
		public String getRegMemberId() { return regMemberId; }
		public void setRegMemberId(String regMemberId) { this.regMemberId = regMemberId; }
	
	/**
	 * memberId
	 */
	public String memberId;
		public String getMemberId() { return memberId; }
		public void setMemberId(String memberId) { this.memberId = memberId; }

	/**
	 * sessionMemberId
	 */
	private long sessionMemberId;
		public long getSessionMemberId() {return sessionMemberId;}
		public void setSessionMemberId(Object sessionMemberId) {
			this.sessionMemberId = Long.valueOf(sessionMemberId.toString());
		}
	
	/**
	 * 
	 */
	public String startDay;
		public String getStartDay() { return startDay; }
		public void setStartDay(String startDay) { this.startDay = startDay; }
	
	/**
	 * 
	 */
	public String endDay;
		public String getEndDay() { return endDay; }
		public void setEndDay(String endDay) { this.endDay = endDay; }
		
	/**
	 * subTtlLimit
	 */	
	public int subTtlLimit;
		public int getSubTtlLimit() { return subTtlLimit; }
		public void setSubTtlLimit(int subTtlLimit) { this.subTtlLimit = subTtlLimit; }
		
	/**
	 * processingColor
	 */	
	public String processingColor;	
		public String getProcessingColor() { return processingColor; }
		public void setProcessingColor(String processingColor) { this.processingColor = processingColor; }
	
	/**
	 * completeColor
	 */	
	public String completeColor;
		public String getCompleteColor() { return completeColor; }
		public void setCompleteColor(String completeColor) { this.completeColor = completeColor; }
	
	/**
	 * notCompleteColor
	 */	
	public String notCompleteColor;
		public String getNotCompleteColor() { return notCompleteColor; }
		public void setNotCompleteColor(String notCompleteColor) { this.notCompleteColor = notCompleteColor; }
		
	/**
	 * 할일 달력 그룹/멈버별로 보여주기 위한 타입
	 */
	
	public String type;
		public String getType() { return type; }
		public void setType(String type) { this.type = type; }
	
	/**
	 * @param dateStr
	 * @param dateType
	 * @return String
	 */
	public String getDateFormat(String dateStr, String dateType) {
		if(dateStr != null && dateStr.length() > 0) {
			dateStr = dateStr.replace("-", "").replace("/", "");
			Calendar cal = Calendar.getInstance();
			cal.set(Integer.parseInt(dateStr.substring(0,4)), Integer.parseInt(dateStr.substring(4,6)) - 1, Integer.parseInt(dateStr.substring(6,8)));
			SimpleDateFormat sdf = new SimpleDateFormat();
			sdf.applyPattern(dateType);
			return sdf.format(cal.getTime());
		} else {
			return "";
		}
		
	}

}