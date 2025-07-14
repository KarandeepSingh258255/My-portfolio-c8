function uploadAndIdentifyPlantID(){
    // Get the photo from the front end 
    const photoInput = document.getElementById("photoInput");

    //if no photo was selected the user clicks on submit
    // alerts to upload photo
    if (photoInput.files.length === 0){
        alert("please select a photo to upload.");
        return;
    }
// select the file from the file arrays of an input element 
const selectedFile = photoInput.files[0];

// create new file reader to read files
const reader = new FileReader();

// trigger the onload event when the reading is done
reader.onload = function (e){
    //store base64image in var
    const base64Image = e.target.result;
    console.log('base64Image', base64Image);
    // store variable for api call
    const apiKey = 'LmuZmtHi4WxzSmVQs1DHpPw1UBg8F2rA2g9QYMNgrq3Xyp73Hx'
    const latitude = 49.207;
    const longitude = 16.608;
    const  health = 'all';
    const similarImages = true;
    const details = 'common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering,propagation_methods,treatment,cause'
    const language = 'en'
    const apiUrlPlantID = `https://plant.id/api/v3/identification?details=${details}&language=${language}`;

    //make first api call with your base64Image
    axios.post(apiUrlPlantID, {
        "images": [base64Image],
        "latitude": latitude,
        "longitude": longitude,
        "health": health,
        "similar_images": similarImages
    },{
        headers: {
            "Api-key": apiKey,
            "Content-Type": "application/json"
        }
    })
    //this is the pending state of the promise
    .then (function(response){
        console.log('Response from Plant ID API:', response.data);
        displayPlantIDInfo(response.data, base64Image)
    })
    //this is the error state of the promise
    .catch(function (error){
        alert(`Error: ${error} XXX`);
        console.error('Error:', error);
        });
    }; 

    // read the selected file as a data url a base 64 rep of the files content
    reader.readAsDataURL(selectedFile);
}




// display function for the plant ID info
function displayPlantIDInfo(plantIDResponse, base64Image){
// VARIABLE to store the first suggestion
const plantIDClassification = plantIDResponse.result.classification;
const plantIdDisease = plantIDResponse.result.disease;
const plantIdIsHealthy = plantIDResponse.result.is_healthy;
const plantIdIsPlant = plantIDResponse.result.is_plant;

//plan preview image 
// grab the preview element from the plant iden html file

const previewImage = document.getElementById('previewImage')
previewImage.src = base64Image

// plant name
//grab the html for the plant title container
const plantNameContainer = document.getElementById('plant-name-container');
const plantNameElement = document.createElement('p');
//add the name of the tag to the new p tag
plantNameElement.innerHTML =`<strong>Name:</strong> ${plantIDClassification.suggestions[0].name}`;
// append the new div to the api result container we got from html 
plantNameContainer.appendChild(plantNameElement);

// similar image
// grab the similar image from api response
const plantSimiliarImage = plantIDClassification.suggestions[0].similar_images[0].url;
// grab the html where the image will be placed
const similiarImageHTML = document.getElementById('plant-similiar-image');
//set image html arc attribute to the image
similiarImageHTML.src - plantSimiliarImage;


// grab the score from the API response
const probabilityOfPlant = plantIDClassification.suggestions[0].probability;
// grab the html where the probability will be placed 
const probabilityNameContainer = document.getElementById('probability-container');
// create a new p tag for the probability text
const probabilityNameElement = document.createElement('p');
// add the probability to the inner HTML of the new p tag
probabilityNameElement.innerHTML = `<strong> Probability: </strong> ${probabilityOfPlant}`;
//append the new div
probabilityNameContainer.appendChild(probabilityNameElement);

// is plant section
// grab the isplant boolean avlue from the api section

const isPlant = plantIdIsPlant.binary
// grab the html where the boolean will be placed
const isPlantContainer = document.getElementById('isPlant-container');
//create new p tag for the is plant boolean
const isPlantElement = document.createElement('p');
// check to see if the picture submitted is a plant
if (isPlant === false){
    alert("The picture you have submitted is not a plant");
    window.location.reload();

}
// add the boolean to the inner html of the new p tag

isPlantElement.innerHTML = `<strong> Is Plant: </strong> ${isPlant}`;
//append the new div
isPlantContainer.appendChild(isPlantElement);

//common name - grab the first common name from the api response 
const commonName = plantIDClassification.suggestions[0].details.common_names[0];
// grab the html where the common name will be placed
const commonNameContainer = document.getElementById('common-name-container')
// create a new p tag
const commonNameElement = document.createElement('p');
// add the common name to the innerHTML of the new P tag
commonNameElement.innerHTML = `<strong> Common Name: </strong> ${commonName}`;
//append the new div
commonNameContainer.appendChild(commonNameElement);


//description - GRAB VALUE FROM THE API RESPONSE
const plantDescription = plantIDClassification.suggestions[0].details.description.value;

//GRAB CONTAINER FROM THE FRONT END
const descriptionContainer = document.getElementById('description-container');

// CREATE NEW P TAG
const descriptionElement = document.createElement('p');

// ADD THE TEXT TO THE INNER HTML
descriptionElement.innerHTML =  `<strong> Description: </strong> ${plantDescription}`;
// append the new div
descriptionContainer.appendChild(descriptionElement);



// PLANT HEALTH STATUS- GRAB VALUE FROM THE API RESPONSE
const plantHealthStatus = plantIdIsHealthy.binary

//GRAB CONTAINER FROM THE FRONT END
const plantHealthStatusContainer = document.getElementById('plant-health-status-container');

// CREATE NEW P TAG
const plantHealthStatusElement = document.createElement('p');

plantHealthStatusElement.innerHTML = `<strong> Plant Health Status: </strong> ${plantHealthStatus}`;
//append the new div
plantHealthStatusContainer.appendChild(plantHealthStatusElement);


// SIMILAR IMAGE WITH DISEASE
const plantSimiliarImageWithDisease = plantIdDisease.suggestions[0].similar_images[0].url;
//grab the html where the image will be placed 
const similiarImageWithDiseaseHTML = document.getElementById('plant-similiar-image-with-disease')
// set the image html src attribute 
similiarImageWithDiseaseHTML.src = plantSimiliarImageWithDisease;

//disease - GRAB VALUE FROM THE API RESPONSE
const plantDiseaseName = plantIdDisease.suggestions[0].name;

const plantDiseaseNameContainer = document.getElementById('plant-disease-name-container');

const plantDiseaseNameElement = document.createElement('p');

plantDiseaseNameElement.innerHTML = `<strong> Plant Disease Name: </strong> ${plantDiseaseName}`;

plantDiseaseNameContainer.appendChild(plantDiseaseNameElement);

// Disease Probability

const plantDiseaseProbability = plantIdDisease.suggestions[0].probability;

const plantDiseaseProbabilityContainer = document.getElementById('plant-disease-probability-container')

const plantDiseaseProbabilityElement = document.createElement('p');

plantDiseaseProbabilityElement.innerHTML = `<strong> Plant Disease Probability: </strong> ${plantDiseaseProbability}`;

plantDiseaseProbabilityContainer.appendChild(plantDiseaseProbabilityElement);

//plantDiseaseDescription
const plantDiseaseDescription = plantIdDisease.suggestions[0].details.descriptions;

const plantDiseaseDescriptionContainer = document.getElementById('plant-disease-description-container')

const plantDiseaseDescriptionElement = document.createElement('p');

plantDiseaseDescriptionElement.innerHTML = `<strong>Plant Disease Description:</strong> ${plantDiseaseDescription}`;

plantDiseaseDescriptionContainer.appendChild(plantDiseaseDescriptionElement);

// disease treatment

const plantDiseaseTreatment = plantIdDisease.suggestions[0].details.treatment;

const plantDiseaseTreatmentContainer = document.getElementById('plant-disease-treatment-container');

const plantDiseaseTreatmentElement = document.createElement('p');



// check if the plant is dead

if(Object.keys(plantDiseaseTreatment).length === 0){
    //add text to the inner html of the new p tag created
    plantDiseaseTreatmentElement.innerHTML = '<strong> Disease Treatment: </strong>No Treatment Available';
    plantDiseaseTreatmentContainer.appendChild(plantDiseaseTreatmentElement);
}

// for loop through the object and map the keys to value then attach them to their html containers 

for (const key in plantDiseaseTreatment){
    // if the object has a key value pair 
    if(plantDiseaseTreatment.hasOwnProperty(key)){
        // create a variable that matches the key with values and wraps them in html
        const plantDiseaseTreatmentValues = plantDiseaseTreatment[key].map(value =>`<li>${value}</li>`).join('');
        const plantDiseaseTreatmentText = `<strong>Disease Treatment ${key}</strong> <ul>${plantDiseaseTreatmentValues}</ul>`;
        // append the key value pairs into the html container
        plantDiseaseTreatmentContainer.innerHTML +=plantDiseaseTreatmentText;
    }

}


}