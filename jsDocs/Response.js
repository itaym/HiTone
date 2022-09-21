/**
 * Express response description:
 * @typedef  { Object }     Response        - https://www.javatpoint.com/expressjs-response
 * PROPERTIES * --------------------------------------------------------------------------------------------------------
 * @constructs Response
 * @property { Object }     app             - Reference to the instance of the Express application.
 * @property { boolean }    headersSent     - Property that indicates if the app sent HTTP headers for the response.
 * @property { HashObject } locals          - An object that contains response local variables scoped to the request.
 * METHODS * -----------------------------------------------------------------------------------------------------------
 * @property { function }   append          - Appends the specified value to the HTTP response header field.
 * @property { function }   attachment      - Facilitates you to send a file as an attachment in the HTTP response.
 * @property { function }   cookie          - This method is used to set a cookie name to value.
 * @property { function }   clearCookie     - The clearCookie method is used to clear the cookie specified by name.
 * @property { function }   download        - Transfers the path as an "attachment", enforces the browser to download.
 * @property { function }   end             - This method is used to end the response process.
 * @property { function }   format          - Performs content negotiation on Accept HTTP header on the request object.
 * @property { function }   get             - This method provides HTTP response header specified by field.
 * @property { function }   json            - This method returns the response in JSON format.
 * @property { function }   jsonp           - This method returns response in JSON format with JSONP support.
 * @property { function }   links           - This method populates the response?s Link HTTP header field.
 * @property { function }   location        - Sets the response location HTTP header based on specified path parameter.
 * @property { function }   redirect        - Redirects to the URL from the specified path, with specified HTTP status.
 * @property { function }   render          - This method renders a view and sends the HTML string to the client.
 * @property { function }   send            - This method is used to send HTTP response.
 * @property { function }   sendFile        - This method is used to transfer the file at the given path.
 * @property { function }   set             - This method is used to set the response of HTTP header field to value.
 * @property { function }   status          - This method sets an HTTP status for the response.
 * @property { function }   type            - This method sets the content-type HTTP header to the MIME type.
 *
 */
