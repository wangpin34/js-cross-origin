;(function(window){

  var ajax;

  function generateXHTTP () {
    var xhttp;

    if (window.XMLHttpRequest) {
      xhttp = new XMLHttpRequest();
    } else {
      // code for old IE browsers
      xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.onreadystatechange = function () {

      if (this.readyState == 4) {

        if (this.status == 200) {
          typeof xhttp.onsuccess === 'function' && xhttp.onsuccess(this.responseText);
        } else {
          typeof xhttp.onfailed === 'function' && xhttp.onfailed(this.responseText);
        }

        typeof xhttp.oncomplete === 'function' && xhttp.oncomplete(this.responseText);

      }
    }

    xhttp.onerror = function (event) {
      throw new Error('Unexpected error happened(eg.cross-origin)');
    }

    return xhttp;
  } 

  ajax = function (method, path, data, onsuccess, onfailed, oncomplete) {
    var xhttp = generateXHTTP();
    method = method.toUpperCase();
    
    xhttp.onsuccess = onsuccess;
    xhttp.onfailed = onfailed;
    xhttp.oncomplete = oncomplete;
    xhttp.open(method, path, true);

    if (['GET', 'DELETE'].indexOf(method) > -1) {
      xhttp.send();
    } else {
      xhttp.send(data || '');
    }
  }

  window['ajax'] = ajax;

})(window);