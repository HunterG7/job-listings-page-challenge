import {fetchData, listingsParent, renderAllListings, renderListing} from "./renderListings.js";

(async()=>{

await renderAllListings();
const tagsBox = document.querySelector('.tag-selection');
const listingContainer = document.querySelector('.listing-container');
let listingTags = document.querySelectorAll('.listing-tag');
const filtersParent = document.querySelector('.filter-options-row');
const clearFilters = document.querySelector('#clear');
let closeFilterBtns = document.querySelectorAll('.close');
let activeFilters = [];

filterTagListener(listingTags);
removeFilter(closeFilterBtns);
document.addEventListener('DOMSubtreeModified', function() {
	closeFilterBtns = document.querySelectorAll('.close');
	removeFilter(closeFilterBtns);

	listingTags = document.querySelectorAll('.listing-tag');
	filterTagListener(listingTags);

	if (activeFilters.length < 1) {
		tagsBox.style.display = 'none';
		listingContainer.style.marginTop = '0';

	} else {
		tagsBox.style.display = 'flex';
		listingContainer.style.marginTop = '1vh';
	}
});

// add event listener to each filter tag
function filterTagListener (listingTags) {
	listingTags.forEach((tag)=>{
		tag.addEventListener('click', async () => {
			let tagName = tag.innerText;
			if (!activeFilters.includes(tagName)) {
				activeFilters.push(tagName);
				updateFilters(tagName);
				await filterListings(activeFilters);
			}
		});
	});
}

// add filters to filter bar
const updateFilters = () => {
	filtersParent.innerHTML = '';
	activeFilters.forEach((filter)=>{
		let filterElement = document.createElement('div');
		filterElement.classList.add('filter-option');
		filterElement.innerHTML = `
			<p>${filter}</p>
			<div class="close">X</div>`;
		filtersParent.append(filterElement);
	});
}

// filter listings based on active filters
const filterListings = async (activeFilters) => {
	let listings = (await fetchData()).listings;
	listingsParent.innerHTML = '';
	listings.forEach((listing)=>{
		let listingTags = [listing.role, listing.level, ...listing.languages, ...listing.tools];
		if (activeFilters.every(element => listingTags.includes(element))){
			renderListing(listing);
		}
	});
}

// clear filters
clearFilters.addEventListener('click', async () => {
	activeFilters = [];
	updateFilters();
	listingsParent.innerHTML = '';
	await renderAllListings();

	listingTags = document.querySelectorAll('.listing-tag');
	filterTagListener(listingTags);
});

// remove filter with "x" button
function removeFilter (closeFilterBtns) {
	closeFilterBtns.forEach((button) => {
		button.addEventListener('click', () => {
			activeFilters = activeFilters.filter((filter) => filter !== button.previousElementSibling.innerText);
			updateFilters();
			filterListings(activeFilters);
		});
	});
}

})();
