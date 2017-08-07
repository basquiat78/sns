package org.uengine.sns.common;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.uengine.sns.common.Exception.NotAcceptableException;
import org.uengine.sns.common.Exception.SNSFileNotFoundException;
import org.uengine.sns.common.Exception.SNSRunTimeException;
import org.uengine.sns.common.Exception.SNSServiceException;
import org.uengine.sns.common.Exception.UnauthorizedException;

/**
 * 
 * ExceptionController
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public abstract class ExceptionController {
	
	private static final Logger LOG = LoggerFactory.getLogger(ExceptionController.class);
	
	Map<String, String> error = new HashMap<String, String>();
	
	/**
	 * @param e
	 * @return Object
	 */
	@ExceptionHandler(IOException.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public @ResponseBody Object handleException(IOException e) {
		LOG.error("IOException", e);
		error.put("msg", e.getMessage());
		return error;
	}
	
	/**
	 * @param e
	 * @return Object
	 */
	@ExceptionHandler(DataAccessException.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public @ResponseBody Object handleException(DataAccessException e) {
		LOG.error("DataAccessException", e);
		error.put("msg", e.getMessage());
		return error;
	}
	
	/**
	 * @param e
	 * @return Object
	 */
	@ExceptionHandler(Exception.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public @ResponseBody Object handleException(Exception e) {
		LOG.error("Exception", e);
		error.put("msg", e.getMessage());
		return error;
	}
	
	/**
	 * @param e
	 * @return Object
	 */
	@ExceptionHandler(SNSServiceException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public @ResponseBody Object ServiceException(SNSServiceException e) {
		LOG.warn("SNS - ServiceException", e);
		error.put("msg", e.getMessage());
		return error;
	}

	/**
	 * @param e
	 * @return Object
	 */
	@ExceptionHandler(SNSRunTimeException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public @ResponseBody Object SNSRunTimeException(SNSRunTimeException e) {
		LOG.warn("SNS - SNSRunTimeException : " + e.getMessage());
		error.put("msg", e.getMessage());
		return error;
	}

	/**
	 * @param e
	 * @return Object
	 */
	@ExceptionHandler(UnauthorizedException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public @ResponseBody Object AuthException(UnauthorizedException e) {
		LOG.warn("SNS - UnauthorizedException : "+ e.getMessage());
		error.put("msg", e.getMessage());
		return error;
	}

	/**
	 * @param e
	 * @return Object
	 */
	@ExceptionHandler(SNSFileNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public @ResponseBody Object handleException(SNSFileNotFoundException e) {
		LOG.warn("SNS - SNSFileNotFoundException : " + e.getMessage());
		error.put("msg", e.getMessage());
		return error;
	}

	/**
	 * @param e
	 * @return Object
	 */
	@ExceptionHandler(NotAcceptableException.class)
	@ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
	public @ResponseBody Object handleException(NotAcceptableException e) {
		LOG.warn("SNS - NotAcceptableException : " + e.getMessage());
		error.put("msg", e.getMessage());
		return error;
	}

}