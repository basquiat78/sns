package org.uengine.sns.feed.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * 
 * PollVo
 * @author uEngine-basquiat (uEngine Solutions)
 * Mapping Table : ${default.table.prefix}POLL
 * Mapping Table : ${default.table.prefix}POLLRESULT
 *
 */
@JsonInclude(Include.NON_NULL)
public class PollVo implements Serializable {

	private static final long serialVersionUID = -9118549251415095487L;
	
	/**
	* 피드 아이디
	*/
	private long feedId;
	    public long getFeedId() { return feedId; }
	    public void setFeedId(long feedId) { this.feedId = feedId; }

	/**
	* 순번
	*/
	private int seq;
	    public int getSeq() { return seq; }
	    public void setSeq(int seq) { this.seq = seq; }

	/**
	* 선택지
	*/
	private String choice;
	    public String getChoice() { return choice; }
	    public void setChoice(String choice) { this.choice = choice; }

    /**
    * 사용자 아이디
    */
    private long memberId;
        public long getMemberId() { return memberId; }
        public void setMemberId(long memberId) { this.memberId = memberId; }

}