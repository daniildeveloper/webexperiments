export let assets = {
  //properties to help assets being loaded
  toLoad: 0,
  loaded: 0,

  //File extensions for diffirent types of assets
  imageExtensions: ["png", "jpg", "gif"],
  fontExtensions: ["ttf", "otf", "ttc", "woff"],
  jsonExtensions: ["json"],
  audioExtensions: ['mp3', 'wav', 'ogg', 'webm'],

  //the load method create and load all assets. USe it like this:
  //assets.load([...]);
  load(sources) {
    //the load method will return a promise when everything has been loaded
    return new Promise(resolve => {

      //the load handler counts the number of assets loaded, compares it to the total numbers of 
      //assets that need to be loaded and resolves the Promise when everything is loaded
      let loadHandler = () => {
        this.loaded += 1;
        console.log(this.loaded);

        //check whatevere everything has loaded
        if (this.toLoad === this.loaded) {

          //reset `toLoad` and `loaded` to 0 so you can use them
          //to load more assets if needed
          this.loaded = 0;
          this.toLoad = 0;
          console.log('Assets finished to load');

          //resole the promisse
          resolve();
        }
      };

      //display that assets are loading
      console.log('Loading assets ...');

      //find the number of files the need be loaded
      this.toLoad = sources.length;

      //loop throught all file assets and find out how they should be interpreted
      sources.forEach(source => {
        //find the file extensions of assets
        let extension = source.split(".").pop();

        //load images that have file extensions that match

        //the imageExtensions array
        if (this.imageExtensions.indexOf(extension) !== -1) {
          this.load(source, loadHandler);
        }

        //load fonts
        else if (this.fontExtensions.indexOf(extension) !== -1) {
          this.load(source, loadHandler);
        }

        //load json file
        else if (this.jsonExtensions.indexOf(extension) !== -1) {
          this.load(source, loadHandler);
        }

        //load audioExtensions
        else if (this.audioExtensions.indexOf(extension) !== -1) {
          this.load(source, loadHandler);
        }

        //display the message that file type is not recognised
        else {
          console.log("File type not recognized: " + source);
        }
      });
    });
  },

  loadImage(source, loadHandler) {

    //create new image and call `loadHandler`when the oimage has bee loaded
    let image = new Image();
    image.addEventListener("load", loadHandler, false);

    //asign the image as property of the assets object
    //so you can access it like this asstes["path/to/image.png"]
    this[source] = image;

    //set images `src property to steart load it
    image.src = source;
  },

  loadFont(source, loadHandler) {
    //use file name as fontfamily name
    let fontFamily = source.split("/").pop().split(".")[0];

    //append a `@font-face` style rule to head of document
    let newStyle = document.createElement("style");
    let fontFace = "@font=face{font-family: '" + fontFamily + "'; src: url('" + source + "');}";
    newStyle.appendChild(document.createTextNode(fontFace));
    document.head.appendChild(newStyle);

    //talk the load handlere where loadng font
    loadHandler();
  },

  loadJson(source, loadHandler) {
    //create new XmlHttpRequest
    let xhr = new XMLHttpRequest();

    //use xhr to load json file
    xhr.open("GET", source, true);

    //create `onload` callback
    xhr.onload = event => {

      //check to make sure that file has loaded properly
      if (xhr.status === 200) {

        //convert the json file into ordonary object
        let file = JSON.parse(xhr.responseText);

        //get the filename
        file.name = source;

        //assign a file name as property of asset object
        this[file.name] = file;

        //texture atlas support
        //if json has `frames` property then it is texture packer format
        if (file.frames) {

          //crate the tileset frames
          this.createTilesetFrames(file, source, loadHandler);
        } else {
          loadHandler();
        }
      }
    };
    //send the request to load the file
    xhr.send();
  },

  createTilesetFrames(file, source, loadHandler) {
    //get tile set images file path
    let baseUrl = source.replace(/[^\/]*$/, "");

    //full image source path
    let imageSource = baseUrl + file.meta.image;

    //the images load handler
    let imageLoadHandler = () => {

      //asign as the property of assets object
      this[imageSource] = image;

      //loop through all the frames
      Object.keys(file.frames).forEach(frame => {
        //the frame object contains all data of position of sub-images
        //add the frame data to asset object
        this[frame] = file.frames[frame];

        //get reference to the source to access it later
        this[frame].source = image;
      });

      //alert the load handler that the file has been loaded
      loadHandler();
    };

    //load the tileset image
    let image = new Image();
    image.addEventListener("load", imageLoadHandler, false);
    image.src = imageSource;
  },

  loadSound(source, loadHandler){
    console.log('load sound called');
  }



};