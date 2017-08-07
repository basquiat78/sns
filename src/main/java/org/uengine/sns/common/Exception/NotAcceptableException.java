package org.uengine.sns.common.Exception;

/**
 * 
 * NotAcceptableException
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class NotAcceptableException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	/**
	 * Constructor
	 * @param msg
	 */
	public NotAcceptableException(String msg) {
		super(msg);
	}

	/**
	 * Constructor
	 * @param cause
	 */
	public NotAcceptableException(Throwable cause) {
		super(cause);
	}

	/**
	 * Constructor
	 * @param msg
	 * @param cause
	 */
	public NotAcceptableException(String msg, Throwable cause) {
		super(msg, cause);
	}

}