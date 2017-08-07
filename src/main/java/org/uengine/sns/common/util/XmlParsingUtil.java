package org.uengine.sns.common.util;

import java.io.ByteArrayInputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import net.sf.json.JSONArray;

import org.uengine.sns.common.Exception.SNSRunTimeException;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

/**
 * 
 * XmlParsingUtil
 * @author uEngine-basquiat (uEngine Solutions)
 *
 */
public class XmlParsingUtil {
 
	List<Map<String, String>> dataList = new ArrayList<Map<String, String>>();
	
	/**
	 * @param list
	 * @param findParentNodeName
	 * @param findNodeName
	 * @param totalRow
	 * @return Map<String, String>
	 */
    public Map<String, String> getChildNodeList(NodeList list, String findParentNodeName, String findNodeName, String totalRow) {
    	Node node = null;
    	Node findElementNode = null;
    	String nodeName = null;
    	String parentNodeName = null;
    	NodeList findChildNodelist =null;
    	Map<String, String> dataMap = new HashMap<String, String>();
    	boolean isDataExist = false;
    	
    	for(int i=0; i<list.getLength(); i++) {
    		node = list.item(i);
        	NodeList childNodelist = node.getChildNodes();

        	if(childNodelist.getLength() > 0 || Node.TEXT_NODE != node.getNodeType()) {
        		nodeName = node.getNodeName();
        		parentNodeName = node.getParentNode().getNodeName();
        		
        		if(findNodeName.equals(nodeName) && findParentNodeName.equals(parentNodeName)) {
                	findChildNodelist = node.getChildNodes();
                	String key = null;
                	String val = null;
                	for(int jdx=0; jdx<findChildNodelist.getLength(); jdx++) {
                		findElementNode = findChildNodelist.item(jdx);
                		if(Node.TEXT_NODE != findElementNode.getNodeType()) {
                			if (findElementNode.getNodeName().equals("d:Key")) {
                				key = findElementNode.getTextContent();
                			} else if(findElementNode.getNodeName().equals("d:Value")) {
                				val = findElementNode.getTextContent();
                				if(key != null && val != null) {
                					dataMap.put(key, val);
                					isDataExist = true;
                				}
                			}
             			}
                	}
                	
        		} else {
        			dataMap = getChildNodeList(childNodelist, findParentNodeName, findNodeName, totalRow);
        			if(dataMap != null) {
        				dataList.add(dataMap);
        			}
        		}
        	}
        }
    	if(isDataExist) {
    		dataMap.put("totalRow", totalRow);
    		return dataMap;
    	} else {
    		return null;
    	}
    }
    
    /**
     * @param nodeList
     * @param findNodeName
     * @return Node
     */
    public Node getFindNode(NodeList nodeList, String findNodeName) {
    	Node findNode = null;
    	String nodeName = null;
    	Node node = null;
    	NodeList childNodelist = null;
    	
    	for(int i=0; i<nodeList.getLength(); i++) {
    		node = nodeList.item(i);
        	childNodelist = node.getChildNodes();
        	if(childNodelist.getLength() > 0 || Node.TEXT_NODE != node.getNodeType()) {
        		nodeName = node.getNodeName();
        		if(findNodeName.equals(nodeName)) {
        			return node;
        		} else if (childNodelist.getLength() > 0) {
        			findNode = getFindNode(childNodelist, findNodeName);
        			if(findNode != null) {
            			break;
            		}
        		} 
        	}
        }	
    	return findNode;
    }
    
    /**
     * @param element
     * @param findDomPaths
     * @return Node
     */
    public Node getPathFindDomNode(Element element, String findDomPaths) {
    	String[] findDomPathsArr = findDomPaths.split("/");
    	Node findNode = null;
    	NodeList nodeList = element.getChildNodes();
    	for(int idx=0; idx < findDomPathsArr.length; idx++) {
			findNode = getFindNode(nodeList, findDomPathsArr[idx]);
			nodeList = element.getChildNodes();
		}
    	return findNode;
    }
    
    /**
     * @param xmlParamMap
     * @return String
     */
    public String getParsingXml(Map<String, String> xmlParamMap) {
	    DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
	    DocumentBuilder documentBuilder = null;
	    Document xmlDoc = null;
	    JSONArray jsonArr = null;
	    
		try {
			documentBuilder = documentBuilderFactory.newDocumentBuilder();
			xmlDoc = documentBuilder.parse(new InputSource(new ByteArrayInputStream(xmlParamMap.get("xmlStr").getBytes("utf-8"))));
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		Element element = xmlDoc.getDocumentElement();
		Node findNode = getPathFindDomNode(element, xmlParamMap.get("findDomPaths"));
		
		if(findNode != null) {
			Map<String, String> dataMap = null;
		    if(findNode != null) {
		    	Node toTalNode = getFindNode(element.getChildNodes(), xmlParamMap.get("findTotalRowsName"));
		    	String totalRow = null;
				if(toTalNode != null) {
					totalRow = toTalNode.getTextContent().trim();
				}
				
		    	dataMap = getChildNodeList(findNode.getChildNodes(), xmlParamMap.get("findParentNodeName"), xmlParamMap.get("findNodeName"), totalRow);
				if(dataMap != null) {
					dataList.add(dataMap);
				}
		    }
			jsonArr = JSONArray.fromObject(dataList);
		} else {
			throw new SNSRunTimeException("no xml paths error");
		}
	   	return jsonArr.toString();
   }

}