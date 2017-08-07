package org.uengine.sns.common.Exception;

/**
 * 
 * UnauthorizedException
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class UnauthorizedException extends RuntimeException {
	
	private static final long serialVersionUID = 1981272302316943421L;

	/**
	 * Constructor
	 * @param msg
	 */
	public UnauthorizedException(String msg) {
		super(msg);
	}

	/**
	 * Constructor
	 * @param cause
	 */
	public UnauthorizedException(Throwable cause) {
		super(cause);
	}

	/**
	 * Constructor
	 * @param msg
	 * @param cause
	 */
	public UnauthorizedException(String msg, Throwable cause) {
		super(msg, cause);
	}

}