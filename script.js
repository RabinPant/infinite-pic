const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
// Unsplash API
const count=30;
const apiKey ='BQ7A7eTxHKgYt1A0yaxHmUQaPt24CCE_KZMrdnOy9C0';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}
`;
// check if all images were loaded
function imageLoaded(){
    console.log('image loaded');
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log('ready=',ready);
    }
}
// Help function to set attributes
function setAttributes(elements,attributes){
    for(const key in attributes){
        elements.setAttribute(key,attributes[key]);
    }
}
// Create Elements for links & Photos, Add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images',totalImages);
    // Run function for each object in photosArray
    photosArray.forEach((photo)=>{
        console.log(photo);
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target','_blank');
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank',
        });
        // create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description);
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        });
        // Event listener , to check finish lodaing
        img.addEventListener('load',imageLoaded);
        // // put <img> inside <a>, then put both on image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos sfrom Unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        //console.log(photosArray);
        displayPhotos();
    }catch(error){
        // Catch Error here
    }
}
// check to see if scrolling at the bottom
window.addEventListener('scroll',()=>{
    // console.log('scrolled')
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000  && ready){
        ready=false;
        getPhotos();
    }
    // ready=true;
});
getPhotos();