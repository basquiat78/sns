package org.uengine.sns.openapi;

/**
 * 
 * OpenAPIRestful
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class OpenAPIRestful {
	
	public static final String EXTMAPPINGLIST 			= "/openapi/extlinkage/mappinglist";
	public static final String EXTFOLLOWINGLIST 		= "/openapi/extlinkage/followinglist";
	public static final String MEMBERINFOFOREXTLINKAGE	= "/openapi/extlinkage/memberinfo";
	
	/**************************     Sharepoint URL        ***********************************/
	/** 쉐어 포인트 대상 문서함 */
	public static final String SHAREPOINT_IF_SV_001 	= "/openapi/sharepoint/if_sv_001";
	/** 쉐어 포인트 대상 문서함 폴더 */
	public static final String SHAREPOINT_IF_SV_002 	= "/openapi/sharepoint/if_sv_002";
	/** 쉐어 포인트 문서 업로드 */
	public static final String SHAREPOINT_IF_SV_003 	= "/openapi/sharepoint/if_sv_003";
	/** 쉐어 포인트 문서 삭제 */
	public static final String SHAREPOINT_IF_SV_004 	= "/openapi/sharepoint/if_sv_004";
	/** 쉐어 포인트 폴더 내 문서 목록 */
	public static final String SHAREPOINT_IF_SV_005 	= "/openapi/sharepoint/if_sv_005";
	/** 쉐어 포인트 공식 동호회 목록 */
	public static final String SHAREPOINT_IF_SV_020 	= "/openapi/sharepoint/if_sv_020";
	/** 쉐어 포인트 동호회 가입 */
	public static final String SHAREPOINT_IF_SV_021 	= "/openapi/sharepoint/if_sv_021";
	/** 쉐어 포인트 동호회 탈퇴 */
	public static final String SHAREPOINT_IF_SV_022 	= "/openapi/sharepoint/if_sv_022";
	/** 쉐어 포인트 가입한 동호회 목록 목록 */
	public static final String SHAREPOINT_IF_SV_023 	= "/openapi/sharepoint/if_sv_023";
	/** 쉐어 포인트 REST 연동 */
	public static final String SHAREPOINT_IF_SV_REST 	= "/openapi/sharepoint";
	/** 쉐어 포인트 REST site 정보 연동 */
	public static final String SHAREPOINT_IF_ST_REST 	= "/openapi/sharepoint/site/info";
	/** 쉐어 포인트 REST 폴더 정보 연동 */
	public static final String SHAREPOINT_IF_FD_REST 	= "/openapi/sharepoint/folder/info";
	/** 쉐어 포인트 upload file 연동 */
	public static final String SHAREPOINT_IF_SV_UP_FILE	= "/openapi/sharepoint/upload/file";
	/**통합검색 조회 연동 */
	public static final String SHAREPOINT_IF_ITG_SCH 	= "/openapi/sharepoint/integration/search";
	
	/**************************     MS URL        ***********************************/
	/** 아웃룩 연락처 연동*/
	public static final String MS_OUTLOOK_ADDRESS 		= "/openapi/outlook/address";
	/** 링크 연락처 연동*/
	public static final String MS_LYNC_ADDRESS 			= "/openapi/lync/address";
	
	/**************************     groupware URL        ***********************************/
	/** 이글오피스 OTA키 발급 */
	public static final String GW_CREATE_INTERFACE		= "/openapi/groupware/create";
	/** 이글오피스 사용자 정보 취득*/
	public static final String GW_LOGIN_INTERFACE		= "/openapi/groupware/login";
	/** 이글오피스 메일 방송 */
	public static final String GW_SEND_MAIL_INTERFACE	= "/openapi/groupware/send/mail";
	/** 이글오피스 방송 메일 취소 */
	public static final String GW_CNCL_MAIL_INTERFACE	= "/openapi/groupware/cancel/mail";
	/** 이글오피스 메일 상태 확인 */
	public static final String GW_MAIL_STATUS_INTERFACE	= "/openapi/groupware/mail/status";
	/** 이글오피스 전자결제 승인*/
	public static final String GW_APPROVAL_APPROVE		= "/openapi/groupware/approve";
	/** 이글오피스 전자결제 반려*/
	public static final String GW_APPROVAL_REJECT		= "/openapi/groupware/reject";
	/** 이글오피스연락처 폴더 조회*/
	public static final String GW_CONTACT_FOLDER		= "/openapi/groupware/contact/folders";
	/** 이글오피스 연락처 목록 조회*/
	public static final String GW_CONTACT_LIST			= "/openapi/groupware/contact/list";
	/** 이글오피스 Lync 연락처 조회*/
	public static final String GW_CONTACT_LYNC			= "/openapi/groupware/contact/lync";
	/** 이글오피스 image view convert */
	public static final String GW_CVT_IMG_VIEW			= "/openapi/groupware/convert/images";
	/** 이글오피스 image view 변환 상태 */
	public static final String GW_CVT_IMG_VIEW_STATUS	= "/openapi/groupware/convert/images/status";
	/** 이글오피스 file convert */
	public static final String GW_CVT_FILE_VIEW			= "/openapi/groupware/convert/files";
	
	/**************************     MobileWeb URL        *******************************/
	/** PNS 푸시 */
	public static final String PNS_PUSH_INTERFACE 		= "/openapi/pnspush";
	
	/**************************     FileTransfer URL        *******************************/
	/** DRM 복호화 */
	public static final String TRANSFER_DRM_DECRYPT		= "/openapi/transfer/drm";
	/** 문서변환기 */
	public static final String TRANSFER_FILE			= "/openapi/transfer/file";

}