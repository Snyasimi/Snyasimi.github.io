

//GET IMAGES FROM NASA API
//FOR EACH IMAGE CREATE THE IMAGE CARD
//ADD THE CARD TO GALLERY
//MAX OF 50 IMAGES
//

const API_KEY = "EjUoC9JtUKrteFF8ZUBjbcUUMXfwcgii9SOuIr8r";

const IMAGE_URL =`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=5`;
//Take in the imageobj as argument

function createCard(imageobj){
	
	try{

		let imageGallery = document.querySelector("#image-gallery");
		let imageContainer  = document.createElement("div");
		let figure = document.createElement("figure");
		let caption = document.createElement("figcaption");
		let image = document.createElement("img");
		
		image.src = imageobj['url'];
		imageContainer.className = "image-container";
		
		imageContainer.appendChild(figure)
			      .appendChild(image);

		caption.textContent = imageobj['title']; 
		figure.appendChild(caption);


		//AFTER SETTING All ATTRIBUTES
		imageGallery.appendChild(imageContainer);
	
	
		return true;
	}

	catch(error){
		console.log(`Error creating image card\n${error}`);
		return false;

	}



	
	
	
}






async function getImages(url){
	//Get images from api and store them.
	
	try{

		const response = await fetch(url);
		
		if(response.ok){
			
			let data = await response.json();
			
			for(image of data){

				createCard(image);
				console.log(`${image['title']} appended`);
			}
		}

	}
	catch(error){
		console.log(`Error creating image card\n${error}`);


	}

}



getImages(IMAGE_URL);

