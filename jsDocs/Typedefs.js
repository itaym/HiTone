/**
 * Express request description:
 * @typedef  { class }     Request
 * @constructs Request
 * @memberOf  Request
 * @property { Object }     app             - Reference to the instance of the Express application.
 * @property { string }     baseUrl         - The URL path on which a router instance was mounted.
 * @property { HashObject } body            - Key-value pairs of data submitted in the request body.
 * @property { Object }     cookies         - Object that contains cookies sent by the request.
 * @property { boolean }    fresh           - When the response is still “fresh” in the client’s cache true is returned.
 * @property { string }     hostname        - Contains the hostname derived from the Host HTTP header.
 * @property { string }     ip              - Contains the remote IP address of the request.
 * @property { string[] }   ips             - An array of IP addresses specified in the X-Forwarded-For request header.
 * @property { string }     method          - The HTTP method of the request: GET, POST, PUT, and so on.
 * @property { string }     originalUrl     - This is much like req.url; however, it retains the original request URL.
 * @property { object }     params          - containing properties mapped to the named route “parameters”.
 * @property { string }     path            - Contains the path part of the request URL.
 * @property { string }     protocol        - Contains the request protocol: either http or (for TLS requests) https.
 * @property { object }     query           - Containing a property for each query string parameter in the route.
 * @property { Response }   res             - This property holds a reference to the response object.
 * @property { string }     route           - Contains the currently-matched route, a string.
 * @property { boolean }    secure          - A Boolean property that is true if a TLS connection is established.
 * @property { object }     signedCookies   - This property contains signed cookies sent by the request.
 * @property { boolean }    stale           - Indicates whether the request is “stale”. Is the opposite of req.fresh.
 * @property { string[] }   subdomains      - An array of subdomains in the domain name of the request.
 * @property { boolean }    xhr             - True if the request’s X-Requested-With header field is “XMLHttpRequest”.
 * @property { function } zzz
 *
 */

