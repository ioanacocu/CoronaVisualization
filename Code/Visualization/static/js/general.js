$(document).ready(function(){

    namespace='/Index'
    // make connection with the python server via a (web)socket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);

    /**
     * Event handler for new connections.
     */
     socket.on('connect', function(data) {
        console.log("Connected");
        var d=data;
        socket.emit('connected');
        //createCharts();
    });
    socket.on('update', function(data) {
        console.log("Connected");
        console.log("Received an update from the server:", data['categories']);

        createCharts(data['categories'], data['countries'], data['mes4countries'] );

    });
    socket.on('fillFilters', function(data) {
        PopulateFilters(data)
    });

    $( "#login" ).submit(function( event ) {
      alert( "Handler for .submit() called." );

      socket.emit('update', {})
      event.preventDefault();
    });



});