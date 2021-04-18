const fs = require('fs');
const readline = require('readline');
const async = require('async');
const { google } = require('googleapis');
const stream = require('stream'); // Added

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'src/upload/token.json';

// Load client secrets from a local file.

export function uploadDrive(img) {
    fs.readFile('src/upload/credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Drive API.
        // authorize(JSON.parse(content), listFiles);
        authorize(JSON.parse(content),img);
    });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials,img) {
    const { client_secret, client_id, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, uploadFile(oAuth2Client, img));
        oAuth2Client.setCredentials(JSON.parse(token));
        uploadFile(oAuth2Client, img);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

// List file form share drive
function listFiles(auth) {
    const drive = google.drive({ version: 'v3', auth });
    var fileMetadata = {
        name: 'romeo',
        driveId: '0AGp3NkK6sayBUk9PVA',
    };

    fileMetadata['parents'] = ['0AGp3NkK6sayBUk9PVA'];
    drive.files.list(
        {
            // resource: fileMetadata,
            driveId: '0AGp3NkK6sayBUk9PVA',
            pageSize: 10,
            fields: 'nextPageToken, files(id, name)',
            supportsAllDrives: true,
            corpora: 'drive',
            includeTeamDriveItems: true,
        },
        (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const files = res.data.files;
            if (files.length) {
                console.log('Files:');
                files.map((file) => {
                    console.log(`${file.name} (${file.id})`);
                });
            } else {
                console.log('No files found.');
            }
        }
    );
}

/** upload image to google drive
 * @param {Object} img base64 image can be change to stram object
 * @param {authorize} auth callback from authorize 
 */
function uploadFile(auth, img) {

    // if base on base64
    const uploadImg = img.split(/,(.+)/)[1];
    const buf = Buffer.from(uploadImg, 'base64'); // Added ~call error cuz new use to void function
    // const buf = new Buffer.from(uploadImg, 'base64'); // Added
    const bs = new stream.PassThrough(); // Added
    bs.end(buf); // Added

    // console.log(uploadImg)
    // console.log(fs.createReadStream('files/image2.png'))
    const drive = google.drive({ version: 'v3', auth });
    var fileMetadata = {
        name: 'romeo.png',
        driveId: '0AGp3NkK6sayBUk9PVA',
        teamDriveId: '0AGp3NkK6sayBUk9PVA',
        parents: ['0AGp3NkK6sayBUk9PVA'],
    };
    var media = {
        mimeType: 'image/png',
        body: bs, // if base on base64 system but if u not just use img replace bs
    };
    drive.files.create(
        {
            resource: fileMetadata,
            media: media,
            fields: 'id',
            supportsAllDrives: true,
        },
        function (err, file) {
            if (err) {
                // Handle error
                console.error(err);
            } else {
                // console.log('File Id: ', 'https://drive.google.com/thumbnail?id=' + file.data.id);
                var fileId = file.data.id;
                var permissions = [
                    {
                        role: 'reader',
                        type: 'anyone',
                    },
                ];
                // Using the NPM module 'async'
                async.eachSeries(
                    permissions,
                    function (permission, permissionCallback) {
                        drive.permissions.create(
                            {
                                resource: permission,
                                fileId: fileId,
                                fields: 'id',
                                supportsAllDrives: true,
                            },
                            function (err, res) {
                                if (err) {
                                    // Handle error...
                                    console.error(err);
                                    return 'error'
                                    permissionCallback(err);
                                } else {
                                    // console.log('Permission ID: ', res.data.id);
                                    console.log('https://drive.google.com/thumbnail?id=' + file.data.id);
                                    return file.data.id;
                                    permissionCallback();
                                }
                            }
                        );
                    },
                    function (err) {
                        if (err) {
                            // Handle error
                            console.error(err);
                        } else {
                            // All permissions inserted
                        }
                    }
                );
            }
        }
    );
}

// https://drive.google.com/thumbnail?id=1skWeG2dVKO3ZzhiEj8wFX4xm7T4Fd3nY&sz=w100-h100
