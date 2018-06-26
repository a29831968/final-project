exports.up=(array)=>{

var imgur=require('imgur');
imgur.setClientId('77768b16aa10a00');
var images=new Array();
imgur.getClientId();

// Saving to disk. Returns a promise.
// NOTE: path is optional. Defaults to ~/.imgur
imgur.saveClientId()
    .then(function () {
        console.log('Saved.');
    })
    .catch(function (err) {
        console.log(err.message);
    });
 imgur.loadClientId()
    .then(imgur.setClientId);
//Setting
imgur.setAPIUrl('https://api.imgur.com/3/');

//If setAPIUrl() is not called, API URL is read from process.env.IMGUR_API_URL

//Getting
imgur.getAPIUrl();
//Setting
imgur.setMashapeKey('https://imgur-apiv3.p.mashape.com/');

//Getting
imgur.getMashapeKey();
imgur.setCredentials('groupg', 'groupgimgur1', '77768b16aa10a00');


imgur.uploadImages(array,('','','Base64'))  //upload multiple images base64
      .then(function(images) {
                console.log(images[0].link);
           // for(var i=0;i<images.length;i++)
          //  {
                   

          
                    })
    .catch(function (err) {
              console.error(err.message);
                  });

}

