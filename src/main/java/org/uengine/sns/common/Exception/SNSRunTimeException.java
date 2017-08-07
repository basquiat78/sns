package org.uengine.sns.common.Exception;

/**
 * 
 * SNSRunTimeException
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class SNSRunTimeException extends RuntimeException {

	private static final long serialVersionUID = 6286358626946639814L;

	/**
	 * Constructor
	 * @param msg
	 */
	public SNSRunTimeException(String msg) {
		super(msg);
	}

	/**
	 * Constructor
	 * @param cause
	 */
	public SNSRunTimeException(Throwable cause) {
		super(cause);
	}

	/**
	 * Constructor
	 * @param msg
	 * @param cause
	 */
	public SNSRunTimeException(String msg, Throwable cause) {
		super(msg, cause);
	}

}