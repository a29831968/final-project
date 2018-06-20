var imgur=require('imgur');
imgur.setClientId('77768b16aa10a00');


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

imgur.uploadFile('../picture/back.png')
    .then(function (json) {
        console.log(json.data.link);
    })
    .catch(function (err) {
        console.error(err.message);
    });



