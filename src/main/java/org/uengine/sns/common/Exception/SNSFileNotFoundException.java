package org.uengine.sns.common.Exception;

/**
 * 
 * SNSFileNotFoundException
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class SNSFileNotFoundException extends RuntimeException {

	private static final long serialVersionUID = -4369012893938539948L;

	/**
	 * Constructor
	 * @param msg
	 */
	public SNSFileNotFoundException(String msg) {
		super(msg);
	}

	/**
	 * Constructor
	 * @param cause
	 */
	public SNSFileNotFoundException(Throwable cause) {
		super(cause);
	}

	/**
	 * Constructor
	 * @param msg
	 * @param cause
	 */
	public SNSFileNotFoundException(String msg, Throwable cause) {
		super(msg, cause);
	}

}