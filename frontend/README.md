# Huawei OBS + H5P POC

## Results

### H5P standalone

- We can listening to `xApi` events when user interact with interactive content. See [here](https://github.com/tunapanda/h5p-standalone?tab=readme-ov-file#h5p-options)
- We can configure the player to send `POST /my-api` when user finish the video. However, the API will not be sent if user does not submitting the form. **WE MAY NEED TO FIND WORKAROUND**
- The player can understand url path to config files and assets files eg. `https://my-domain/assets/h5p.json`

### Huawei OBS

- We can use [esdk-obs-nodejs](https://www.npmjs.com/package/esdk-obs-nodejs) sdk to get assets (object) from Huawei OBS.
- Some assets like (images, fonts) need to be handled by let the server redirect the request to file to Huawei OBS Url. Please refer to the code and screentshot below.

### Results

1. Serving H5P content from Huawei OBS
   ![huawei-obs-assets](/frontend/public/examples/huawei-obs-assets.png)

2. Listening to xApi events
   ![xapi-events](/frontend/public/examples/x-api-event.png)

3. Sending API when user finish the video
   ![send-api](/frontend/public/examples/finish-api.png)
