export const listingsParent = document.querySelector('.listing-container');

export const fetchData = async () => {
	try {
		const response = await fetch('data/data.json');
		return await response.json();
	} catch (error) {
		console.error(error);
		return [];
	}
}

export const renderListingTags = (listing, listingElement) => {
	let listingTags = [listing.role, listing.level, ...listing.languages, ...listing.tools];
	let listingTagsElement = document.createElement('div');
	listingTagsElement.classList.add('column', 'justify-center', 'grow');

	let listingTagsRow = document.createElement('div');
	listingTagsRow.classList.add('row', 'justify-right', 'no-padding', 'gap-10');

	listingTags.forEach((tag)=>{
		let tagElement = document.createElement('div');
		tagElement.classList.add('column', 'justify-center','shrink', 'listing-tag');
		tagElement.innerHTML = `<span>${tag}</span>`;

		listingTagsRow.append(tagElement);
	});

	listingTagsElement.append(listingTagsRow);
	listingElement.append(listingTagsElement);
	listingsParent.append(listingElement);
}

export const renderNewFeaturedTags = (listing, listingElement) => {
	if (listing.new === true && listing.featured === true){
		listingElement.innerHTML += `
		<!-- listing title and info -->
		<div class="column shrink listing-info">
			<div class="row align-center no-padding info-top-row">
				<h6 class="company-name">${listing.company}</h6>
				<div class="column justify-center align-center shrink new-tag">
					<p>NEW!</p>
				</div>
				<div class="column justify-center align-center shrink featured-tag">
					<p>FEATURED</p>
				</div>
			</div>
			<div class="row no-padding">
				<h5 class="job-position">${listing.position}</h5>
			</div>
			<div class="row no-padding">
				<p class="time-since-listing">${listing.postedAt}</p>
				<p class="part-or-full">${listing.contract}</p>
				<p class="job-location">${listing.location}</p>
			</div>
		</div>`;
	} else if (listing.new === true){
		listingElement.innerHTML += `
		<!-- listing title and info -->
		<div class="column shrink listing-info">
			<div class="row align-center no-padding info-top-row">
				<h6 class="company-name">${listing.company}</h6>
				<div class="column justify-center align-center shrink new-tag">
					<p>NEW!</p>
				</div>
			</div>
			<div class="row no-padding">
				<h5 class="job-position">${listing.position}</h5>
			</div>
			<div class="row no-padding">
				<p class="time-since-listing">${listing.postedAt}</p>
				<p class="part-or-full">${listing.contract}</p>
				<p class="job-location">${listing.location}</p>
			</div>
		</div>`;
	} else if (listing.featured === true){
		listingElement.innerHTML += `
		<!-- listing title and info -->
		<div class="column shrink listing-info">
			<div class="row align-center no-padding info-top-row">
				<h6 class="company-name">${listing.company}</h6>
				<div class="column justify-center align-center shrink featured-tag">
					<p>FEATURED</p>
				</div>
			</div>
			<div class="row no-padding">
				<h5 class="job-position">${listing.position}</h5>
			</div>
			<div class="row no-padding">
				<p class="time-since-listing">${listing.postedAt}</p>
				<p class="part-or-full">${listing.contract}</p>
				<p class="job-location">${listing.location}</p>
			</div>
		</div>`;
	} else {
		listingElement.innerHTML += `
		<!-- listing title and info -->
		<div class="column shrink listing-info">
			<div class="row align-center no-padding info-top-row">
				<h6 class="company-name">${listing.company}</h6>
			</div>
			<div class="row no-padding">
				<h5 class="job-position">${listing.position}</h5>
			</div>
			<div class="row no-padding">
				<p class="time-since-listing">${listing.postedAt}</p>
				<p class="part-or-full">${listing.contract}</p>
				<p class="job-location">${listing.location}</p>
			</div>
		</div>`;
	}

	renderListingTags(listing, listingElement);
}

export const renderListing = (listing) => {
	let listingElement = document.createElement('div');
	listingElement.classList.add('row', 'align-center', 'listing');
	if (listing.id <= 2){
		listingElement.classList.add('featured');
	}
	let imageURL = listing.logo.substring(9, listing.logo.length);

	listingElement.innerHTML = `
		<!-- listing pic -->
		<div class="column shrink">
			<div class="img-wrapper">
				<img src="/static-job-listings-master/images/${imageURL}" alt="${listing.company} Picture">
			</div>
		</div>`;

	renderNewFeaturedTags(listing, listingElement);
}

export const renderAllListings = async () => {
	let listings = (await fetchData()).listings;

	listings.forEach((listing)=>{
		renderListing(listing);
	});
}
