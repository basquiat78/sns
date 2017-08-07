package org.uengine.sns.common.Exception;

import org.springframework.dao.DataAccessException;

/**
 * 
 * SNSServiceException
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class SNSServiceException extends DataAccessException {

	private static final long serialVersionUID = 6173867829886413274L;

	/**
	 * Constructor
	 * @param msg
	 */
	public SNSServiceException(String msg) {
		super(msg);
	}
	
	/**
	 * Constructor
	 * @param msg
	 * @param cause
	 */
	public SNSServiceException(String msg, Throwable cause) {
		super(msg, cause);
	}

}