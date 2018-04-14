// Create our SIP instance and run it:

var config = {
    // Replace this IP address with your Asterisk IP address
    uri: '6002@192.168.8.10',
  
    // Replace this IP address with your Asterisk IP address,
    // and replace the port with your Asterisk port from the http.conf file
    wsServers: 'wss://192.168.8.10:8089/ws',
  
    // Replace this with the username from your sip.conf file
    authorizationUser: '6002',
    displayName: '6002',
    // Replace this with the password from your sip.conf file
    password: '6002',
    
    // HackIpInContact for Asterisk
    hackIpInContact: true,
  
    // rtcpMuxPolicy for Asterisk
    rtcpMuxPolicy: 'negotiate',
  };
//var ua = new SIP.UA(config);
var simple = new SIP.WebRTC.Simple({
    media: {
      remote: {
        video: false,
        // This is necessary to do an audio/video call as opposed to just a video call
        audio: document.getElementById('remoteAudio')
      }
    },
    ua: config
  });

  simple.on('ringing', function() {
    simple.answer();
  });
var callOptions = {
    mediaConstraints: {
      audio: true, // only audio calls
      video: false
    }
  };
  /*
ua.on('connected', function(e){
    console.log('connected to asterisk');
    ua.register();
});
ua.on('disconnected', function(e){
    console.log('disconnected from asterisk');
});
ua.on('registered', function(e){
    console.log('registered to asterisk');
});
ua.on('unregistered', function(e){
    console.log('unregistered from asterisk');
});
ua.on('registrationFailed', function(e){
    console.log('registrationFailed from asterisk');
});

ua.on('newRTCSession', function(data){
    console.log('newRTCSession from asterisk', data);
    var session = data.session;
    var remoteAudio = document.getElementById('remoteAudio');
    if (session.direction === "incoming") {
        console.log("there is an incoming call");
        // incoming call here
        session.on("accepted",function(){
            // the call has answered
            console.log("Call properly connected");
        });
        session.on("confirmed",function(){
            // this handler will be called for incoming calls too
            console.log("Call confirmed");
        });
        session.on("ended",function(){
            // the call has ended
            console.log("Call ended");
        });
        session.on("failed",function(){
            // unable to establish the call
            console.log("Call ended");
        });
        session.on('addstream', function(e){
            // set remote audio stream (to listen to remote audio)
            // remoteAudio is <audio> element on page
            remoteAudio.src = window.URL.createObjectURL(e.stream);
            remoteAudio.play();
        });
        session.answer(callOptions);
    }
    if (session.direction === "outgoig") {
        var dtmfSender;
        session.on("confirmed",function(){
            //the call has connected, and audio is playing
            console.log("conneted..");
            var localStream = session.connection.getLocalStreams()[0];
            dtmfSender = session.connection.createDTMFSender(localStream.getAudioTracks()[0])
        });
        session.on("ended",function(){
            //the call has ended
            console.log("session ended");
        });
        session.on("failed",function(){
            // unable to establish the call
            console.log('session failed');
        });
        session.on('addstream', function(e){
            // set remote audio stream (to listen to remote audio)
            // remoteAudio is <audio> element on page
            console.log("playing remote audio");
            remoteAudio.src = window.URL.createObjectURL(e.stream);
            remoteAudio.play();
        });
    }
});
ua.start();
*/
window.onload = function(){
    var button = document.getElementById('callButton');
    button.onclick = function(e){
        // Register callbacks to desired call events
        var eventHandlers = {
            'progress': function(e) {
            console.log('call is in progress');
            },
            'failed': function(e) {
            console.log('call failed with cause: '+ e);
            },
            'ended': function(e) {
            console.log('call ended with cause: '+ e);
            },
            'confirmed': function(e) {
            console.log('call confirmed');
            }
        };
        
        var options = {
            'eventHandlers'    : eventHandlers,
            'mediaConstraints' : { 'audio': true, 'video': false }
        };
        
        //var session = ua.call('sip:6001@192.168.8.10', options);
        simple.call('sip:121@192.168.8.10');
        };
};
