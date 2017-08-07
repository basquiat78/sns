package org.uengine.sns.common.code;

/**
 * 
 * ChatCodeMaster
 * @author uEngine-basquiat (uEngine Solutions)
 * 
 */
public class ChatCodeMaster {

	/**
	 * 메세지 관련 코드
	 * <pre>
	 * 		MESSAGE			: 내용 메세지
	 * 		WHISPER			: 귓속말 메세지
	 * 		INVITE			: 초대 메세지
	 * 		PARTICIPATION	: 참여 메세지
	 * 		LEAVE			: 탈방 메세지
	 * 		NOTICE			: 알람 메세지
	 * 		STATUS			: 협상 메세지
	 * </pre>
	 */
	public static enum MESSAGE_TYPE {MESSAGE, WHISPER, INVITE, PARTICIPATION, LEAVE, NOTICE, RELOAD, STATUS};
	
	/**
	 * 협상 관련 코드
	 * <pre>
	 * 		RUNNING	: 협상중
	 * 		SUCCESS		: 협상성공
	 * 		STOP			: 협상결렬
	 * </pre>
	 */
	public static enum ROOM_STATUS {RUNNING, SUCCESS, STOP};

}