package org.uengine.sns.common.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;

import org.apache.commons.lang.StringEscapeUtils;
import org.htmlcleaner.HtmlCleaner;
import org.htmlcleaner.TagNode;
import org.uengine.sns.common.util.vo.OpenGraphVo;

/**
 * A Java object representation of an Open Graph enabled webpage.
 * A simplified layer over a Hastable.
 *
 * @author Callum Jones
 */
public class OpenGraph {
	
	private String pageUrl;
	private ArrayList<OpenGraphNamespace> pageNamespaces;
    private Hashtable<String, ArrayList<MetaElement>> metaAttributes;
    private String baseType;
    private boolean isImported; // determine if the object is a new incarnation or representation of a web page
    private boolean hasChanged; // track if object has been changed

    private static OpenGraphVo ogVo;
    public final static String[] REQUIRED_META = new String[]{"title", "type", "image", "url", "description" };
    public final static String[] HTTP_PROTOCOL = new String[]{"http://", "https://"};
    
    public final static Hashtable<String, String[]> BASE_TYPES = new Hashtable<String, String[]>();
    	
    	static {
			BASE_TYPES.put("activity", new String[] {"activity", "sport"});
			BASE_TYPES.put("business", new String[] {"bar", "company", "cafe", "hotel", "restaurant"});
			BASE_TYPES.put("group", new String[] {"cause", "sports_league", "sports_team"});
	        BASE_TYPES.put("organization", new String[] {"band", "government", "non_profit", "school", "university"});
	        BASE_TYPES.put("person", new String[] {"actor", "athlete", "author", "director", "musician", "politician", "profile", "public_figure"});
	        BASE_TYPES.put("place", new String[] {"city", "country", "landmark", "state_province"});
	        BASE_TYPES.put("product", new String[] {"album", "book", "drink", "food", "game", "movie", "product", "song", "tv_show"});
	        BASE_TYPES.put("website", new String[] {"blog", "website", "article"});
    	}

   /**
    * Create an open graph representation for generating your own Open Graph object
    */
    public OpenGraph() {
    	pageNamespaces = new ArrayList<OpenGraphNamespace>();
        metaAttributes = new Hashtable<String, ArrayList<MetaElement>>();
        hasChanged = false;
        isImported = false;
        
    }

    /**
     * Fetch the open graph representation from a web site
     * @param url The address to the web page to fetch Open Graph data
     * @param ignoreSpecErrors Set this option to true if you don't wish to have an exception throw if the page does not conform to the basic 4 attributes
     * @throws IOException If a network error occurs, the HTML parser will throw an IO Exception
     * @throws Exception A generic exception is throw if the specific page fails to conform to the basic Open Graph standard as define by the constant REQUIRED_META
     */
    @SuppressWarnings("unchecked")
	public OpenGraph(String url, boolean ignoreSpecErrors) throws IOException, Exception {

    	// download the (X)HTML content, but only up to the closing head tag. We do not want to waste resources parsing irrelevant content
        URL pageURL = new URL(HTTP_PROTOCOL[0] + url);
        URLConnection siteConnection = pageURL.openConnection();
        Charset charset = getConnectionCharset(siteConnection);
        BufferedReader dis = new BufferedReader(new InputStreamReader(siteConnection.getInputStream(), charset));
        String inputLine;
        StringBuffer headContents = new StringBuffer();

        // Loop through each line, looking for the closing head element
        while((inputLine = dis.readLine()) != null) {
        	if(inputLine.contains("</head>")) {
                inputLine = inputLine.substring(0, inputLine.indexOf("</head>") + 7);
                inputLine = inputLine.concat("<body></body></html>");
                headContents.append(inputLine + "\r\n");
                break;
            }
        	
            headContents.append(inputLine + "\r\n");
        }

        if("".equals(headContents.toString())) {
            URL rePageURL = new URL(HTTP_PROTOCOL[1] + url);
            URLConnection reSiteConnection = rePageURL.openConnection();
            //Charset reCharset = getConnectionCharset(reSiteConnection);
            BufferedReader reDis = new BufferedReader(new InputStreamReader(reSiteConnection.getInputStream(), "UTF-8"));
            String reInputLine;

            // Loop through each line, looking for the closing head element
            while((reInputLine = reDis.readLine()) != null) {
            	if(reInputLine.contains("</head>")) {
            		reInputLine = reInputLine.substring(0, reInputLine.indexOf("</head>") + 7);
            		reInputLine = reInputLine.concat("<body></body></html>");
                    headContents.append(reInputLine + "\r\n");
                    break;
                }
            	
                headContents.append(reInputLine + "\r\n");
            }
        }
        
        String headContentsStr = headContents.toString();
        
        ogVo = new OpenGraphVo();
        boolean isTitle = false;
        boolean isUrl = false;
        boolean isImage = false;
        boolean isDesc = false;
        HtmlCleaner cleaner = new HtmlCleaner();
        // parse the string HTML
        TagNode pageData = cleaner.clean(headContentsStr);
        TagNode headElement = pageData.findElementByName("head", true);
        List<TagNode> nodeChildren =  headElement.getChildren();
        String preFix = "og:";
        for (TagNode metaElement : nodeChildren) {
        	if(metaElement.hasAttribute("property")) {
        		String propertyName = metaElement.getAttributeByName("property");
        		//title이 존재한다면?
        		if(propertyName.indexOf(preFix) > -1 && propertyName.indexOf(REQUIRED_META[0].toString()) > -1) {
        			ogVo.setTitle(metaElement.getAttributeByName("content"));
        			isTitle = true;
        		}
        		//image가 존재한다면?
        		if(propertyName.indexOf(preFix) > -1 && propertyName.indexOf(REQUIRED_META[2].toString()) > -1) {
        			if(propertyName.equals(preFix+REQUIRED_META[2].toString())){
        				ogVo.setImage(metaElement.getAttributeByName("content"));
        				isImage = true;
        			}
        		}
        		
        		//url가 존재한다면?
        		if(propertyName.indexOf(preFix) > -1 && propertyName.indexOf(REQUIRED_META[3].toString()) > -1) {
        			ogVo.setUrl(metaElement.getAttributeByName("content"));
        			isUrl = true;
        		}
        		
        		//description가 존재한다면?
        		if(propertyName.indexOf(preFix) > -1 && propertyName.indexOf(REQUIRED_META[4].toString()) > -1) {
        			ogVo.setDescription(metaElement.getAttributeByName("content"));
        			isDesc = true;
        		}
        	}
        }
        	
        if(!isTitle) {
        	for (TagNode metaElement : nodeChildren) {
        		if(metaElement.toString().equals(REQUIRED_META[0].toString())) {
        			System.out.println(metaElement.getChildren().get(0));
        			ogVo.setTitle(metaElement.getChildren().get(0).toString());
        			break;
        		}
            }
        }
        
        if(!isUrl) {
        	ogVo.setUrl(pageURL.toString());
        }
        
        if(!isImage) {
        	ogVo.setImage("");
        }
        
        if(!isDesc) {
        	for (TagNode metaElement : nodeChildren) {
        		if(metaElement.hasAttribute("name")) {
            		String propertyName = metaElement.getAttributeByName("name");
            		//description가 존재한다면?
            		if(propertyName.indexOf(REQUIRED_META[4].toString()) > -1) {
            			ogVo.setDescription(StringEscapeUtils.unescapeHtml(metaElement.getAttributeByName("content").toString()));
            		}
            	}
            }
        }
        
    }

    /**
     * Gets the charset for specified connection.
     * Content Type header is parsed to get the charset name.
     *
     * @param connection the connection.
     * @return the Charset object for response charset name;
     *         if it's not found then the default charset.
     */
    private static Charset getConnectionCharset(URLConnection connection) {
        String contentType = connection.getContentType();
        if(contentType != null && contentType.length() > 0) {
            contentType = contentType.toLowerCase();
            String charsetName = extractCharsetName(contentType);
            if(charsetName != null && charsetName.length() > 0) {
                try {
                    return Charset.forName(charsetName);
                } catch (Exception e) {
                    // specified charset is not found,
                    // skip it to return the default one
                }
            }
        }

        // return the default charset
        return Charset.defaultCharset();
    }

    /**
     * Extract the charset name form the content type string.
     * Content type string is received from Content-Type header.
     *
     * @param contentType the content type string, must be not null.
     * @return the found charset name or null if not found.
     */
    private static String extractCharsetName(String contentType) {
        // split onto media types
        final String[] mediaTypes = contentType.split(":");
        if(mediaTypes.length > 0) {
            // use only the first one, and split it on parameters
            final String[] params = mediaTypes[0].split(";");

            // find the charset parameter and return it's value
            for(String each : params) {
                each = each.trim();
                if(each.startsWith("charset=")) {
                    // return the charset name
                    return each.substring(8).trim();
                }
                
            }
        }

        return null;
    }

    /**
     * Get the basic type of the Open graph page as per the specification
     * @return Base type as defined by specification, null otherwise
     */
    public String getBaseType() {
        return baseType;
    }

    /**
     * Get a value of a given Open Graph property
     * @param property The Open graph property key
     * @return Returns the value of the first property defined, null otherwise
     */
    public String getContent(String property) {
        if(metaAttributes.containsKey(property) && metaAttributes.get(property).size() > 0)
        	return metaAttributes.get(property).get(0).getContent();
		else
			return null;
    }

    /**
     * Get all the defined properties of the Open Graph object
     * @return An array of all currently defined properties
     */
    public MetaElement[] getProperties() {
		ArrayList<MetaElement> allElements = new ArrayList<MetaElement>();
        for(ArrayList<MetaElement> collection : metaAttributes.values())
			allElements.addAll(collection);

		return (MetaElement[]) allElements.toArray(new MetaElement[allElements.size()]);
    }

    /**
     * Get all the defined properties of the Open Graph object
	 * @param property The property to focus on
     * @return An array of all currently defined properties
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
	public MetaElement[] getProperties(String property) {
		if(metaAttributes.containsKey(property)) {
			ArrayList target = metaAttributes.get(property);
			return (MetaElement[]) target.toArray(new MetaElement[target.size()]);
		}
		else
			return null;
    }

    /**
     * Get the original URL the Open Graph page was obtained from
     * @return The address to the Open Graph object page
     */
    public String getOriginalUrl() {
        return pageUrl;
    }


    /**
     * Get the HTML representation of the Open Graph data.
     * @return An array of meta elements as Strings
     */
    @SuppressWarnings("unused")
	public String[] toHTML() {
        // allocate the array
        ArrayList<String> returnHTML = new ArrayList<String>();

        int index = 0; // keep track of the index to insert into
        for(ArrayList<MetaElement> elements : metaAttributes.values()) {
			for(MetaElement element : elements)
            	returnHTML.add("<meta property=\"" + element.getNamespace() + ":" +
                        element.getProperty() + "\" content=\"" + element.getContent() + "\" />");
		}

        // return the array
        return (String[]) returnHTML.toArray();
    }

        /**
     * Get the XHTML representation of the Open Graph data.
     * @return An array of meta elements as Strings
     */
    @SuppressWarnings("unused")
	public String[] toXHTML() {
        // allocate the array
        ArrayList<String> returnHTML = new ArrayList<String>();

        int index = 0; // keep track of the index to insert into
        for(ArrayList<MetaElement> elements : metaAttributes.values()) {
			for(MetaElement element : elements)
            	returnHTML.add("<meta name=\"" + element.getNamespace().getPrefix() + ":" +
                        element.getProperty() + "\" content=\"" + element.getContent() + "\" />");
		}

        // return the array
        return (String[]) returnHTML.toArray();
    }

    /**
     * Set the Open Graph property to a specific value
	 * @param namespace The OpenGraph namespace the content belongs to
     * @param property The og:XXXX where XXXX is the property you wish to set
     * @param content The value or contents of the property to be set
     */
    public void setProperty(OpenGraphNamespace namespace, String property, String content) {
        if(!pageNamespaces.contains(namespace))
			pageNamespaces.add(namespace);

		property = property.replaceAll(namespace.getPrefix() + ":", "");
		MetaElement element = new MetaElement(namespace, property, content);
		if(!metaAttributes.containsKey(property))
			metaAttributes.put(property, new ArrayList<MetaElement>());

		metaAttributes.get(property).add(element);
    }

    /**
     * Removed a defined property
     * @param property The og:XXXX where XXXX is the property you wish to remove
     */
    public void removeProperty(String property) {
        metaAttributes.remove(property);
    }

    /**
     * Obtain the underlying HashTable
     * @return The underlying structure as a Hashtable
     */
    public Hashtable<String, ArrayList<MetaElement>> exposeTable() {
        return metaAttributes;
    }

    /**
     * Test if the Open Graph object was initially a representation of a web page
     * @return True if the object is from a web page, false otherwise
     */
    public boolean isFromWeb() {
        return isImported;
    }

    /**
     * Test if the object has been modified by setters/deleters.
     * This is only relevant if this object initially represented a web page
     * @return True True if the object has been modified, false otherwise
     */
    public boolean hasChanged() {
        return hasChanged;
    }
    
    public OpenGraphVo getOg() {
        return ogVo;
    }
    
    public static void main(String[] args) throws IOException, Exception {
    	
    	OpenGraph openGraph = new OpenGraph("makevu.me/8d626953d8", true);
    	System.out.println(openGraph);
    }
    
}