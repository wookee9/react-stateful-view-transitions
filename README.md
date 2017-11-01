# Spyscape Deception Interactive

Spyscape Deception interactive exhibit game. Built with React and MobX.

## Usage

```
npm install
npm run dll
npm start
```
Wait for the bundle to build, then visit the URI supplied by webpack-dev-server in Chrome (usually localhost:8080).

A typical URL with parameters would look like this:

http://localhost:8080/?location=sshq&device_id=1&cam_orientation=landscape

Using the Facetracker requires you to allow the app access to your computer's webcam (when prompted on first run).

## Continuous Integration

[Circle CI](https://circleci.com) is used to automatically test pull requests and merges on Github, and deploy the app to Amazon S3.

#### Deployment

Once all tests have passed, the CI will deploy the build to the Amazon S3 buckets for staging and production environments.

Staging Builds are deployed to:

https://deception-staging.spyscape.net

*Note: we currently do not have a production bucket set up yet for Deception*


#### Scratch Bucket

Additionally, we also have a scratch bucket. Every time the CI receives a new SHA from Github, it will build and test the commit. If it passes, it will create a new directory on the scratch bucket matching the name of the short 7 character SHA, and then deploy the build to this folder. The build will then be available to view on the web.

This enables any build to quickly and easily be tested in the booth or through a web browser.

Scratch builds are deployed to:

https://s3.amazonaws.com/deception-scratch.spyscape.net/builds/YOUR-GIT-SHA-HERE/index.html

*!IMPORTANT NOTE: Because `location` is a reserved URL parameter name on Amazon S3, we have to use an alternative when accessing the app from a naked S3 bucket, as we are doing here. So as a workout, you can use `location_name` instead. Internally, the variable is still called as `location`.

So, for example, a full URL with the necessary params might look like this:

https://s3.amazonaws.com/deception-scratch.spyscape.net/builds/4b103c6/index.html?location_name=sshq&device_id=1&cam_orientation=landscape

## Testing

Both unit tests and end-to-end tests are used in the app. The continuous integration system used requires all tests to pass in order for a deploy to S3 to be actioned. Furthermore, failing tests will also block merging onto the master branch on Github.

Before raising a pull request on Github, ensure that all your tests pass.

#### Unit tests

```
npm test
```

#### End-to-end tests

These tests use [Nightmare.js](http://www.nightmarejs.org) to run the app in a Chromium browser, and simulate a 'happy path' user experience. The app includes lots of fixed-time sequences with no user interaction, so it takes a minimum of ~10 minutes to complete. Since this can quickly become a blocker when working on lots of smaller features, several shortcuts have been taken to speed up this testing time. Namely, these involve replacing the video files in the app with a dummy 1 second video file, and overriding all timeouts with a < 1 second value.

To run the end-to-end tests in this fast mode:

```
npm run e2e:serve
```

**NOTE: This is the test that is run on the continuous integration system**


You can still run the slower end-to-end tests with all the correct timeouts and video assets. If you are adding new video content or timeouts, you should run these tests locally and make sure they pass:

```
npm run e2e:serve-fast
```

### Game Events (Kinesis) and URL Parameters for device ID and location

In the museum, there will be 12 booths, each running an instance of the app. In order for various other services such as the lights and the RFID readers to be able to communicate with each instance of the app, they need to know the physical location (eg the museum in New York, the office in London etc) of the app, and the device it's running on (eg booth 1, 2, 3...). The way this information is set in each each is through the use of URL parameters. Two parameters are used for these:

**location** Sets the physical location of the app, eg `sshq`, `ssnyhq`.
**device_id** The ID of the physical box the app is running on. This is an integer >= 1.

An example of how this looks:

http://localhost:8080/?location=sshq&device_id=1

OR

https://deception-staging.spyscape.net/?location=sshq&device_id=1

### Camera Orientation

The camera in the booth is mounted on it's side in a portrait orientation, to enable the user to be better framed. The app takes the incoming video feed and rotates it by 90 degrees in order to correct this. When developing or testing the app, you can override the default camera orientation by either changing the value in the config, or by providing a `cam_orientation` url parameter with a string value of `landscape` or `portrait`. See example below:

http://localhost:8080/?location=sshq&device_id=1&cam_orientation=landscape

### RFID Login

Using the app with an MQTT RFID reader requires the app to be run with above-mentioned URL parameters. If these are absent, a connection to the MQTT server will not be made, and so the app will not be able to respond to the relevant MQTT events. However, the rest of the app will still function correctly.

The location and instance ID must match the those assigned to the Arduino RFID reader.

### Hardware IO

Control of and by the hardware interface components in the installation uses an Arduino Leonardo which spoofs as a Midi USB device. This allows for driverless, plug-and play communication with Chrome via WebMidi. Simply plug the device in to an available USB port __then__ launch or refresh the app.

The app will tolerate the device being un-plugged and plugged back in after it launches, however the device must be plugged back into the same port.

### Use of getUserMedia and WebMidi requires a secure context in Chrome

The app makes use of several advanced Chrome features. In order for these to be enabled, Chrome requires you to run the app in a secure context. This means either localhost via http, or remotely via https.

Access to https://deception-staging.spyscape.net requires a connection to the Spyscape VPN, and the Spyscape Root SSL certificate to be installed on your machine. Speak to Dan Hart about this if you require access.

### Facetracker

The app uses a third-party commercial library to perform face recognition and tracking - [Beyond Reality Facetracker v4](http://beyond-reality-face.com).

The version used in the app is currently a time-limited trial version. After 2 minutes, the facetracker will stop working, and you will have to refresh the app in order to use the facetracker any more. The library also makes a XHR request to the developer's server's to check the status of the user's licence on load, so this requires an internet connection.
