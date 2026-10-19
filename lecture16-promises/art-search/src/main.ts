import './style.css'

const formElement =
  document.querySelector<HTMLFormElement>(
    "#search-form"
  )!;

const searchResultsElement =
  document.querySelector<HTMLDivElement>(
    ".search-results"
  )!;

formElement.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  // convert form data into JSON
  const formData = new FormData(formElement);
  const formObject = Object.fromEntries(formData.entries());

  console.log("form submitted!");
  console.log(formObject);

  performSearch(formObject.query.toString());
}

interface SearchResult {
  title: string,
  url: string,
}

interface ArtworkInfo {
  title: string,
  artist: string,
  short_description: string,
  date: string
}

const performSearch = async (query: string) => {
  const url = `https://api.artic.edu/api/v1/artworks/search?q=${query}`;
  const result: Response = await fetch(url);
  const json: any = await result.json();

  const artworkInfo: ArtworkInfo[] = [];

  for(let artwork of json["data"].slice(0, 5)) {
    const artwork_url = artwork["api_link"];

    // make another request to get more detailed information about this artwork
    const artwork_response = await fetch(artwork_url);
    const artwork_json = await artwork_response.json();

    // extract all the information we need
    artworkInfo.push({
      title: artwork_json["data"]["title"],
      artist: artwork_json["data"]["artist_title"],
      date: artwork_json["data"]["date_display"],
      short_description: artwork_json["data"]["short_description"]
    })
  }

  console.log(artworkInfo);
  displaySearchResults(artworkInfo);
}

const displaySearchResults = (artworkInfo: ArtworkInfo[]) => {
  // clear the contents of the search results element
  searchResultsElement.replaceChildren();

  // show a count of the results
  let countElement = document.createElement("div");
  countElement.textContent = `Found ${artworkInfo.length} search results.`;
  searchResultsElement.appendChild(countElement);

  // create a new div for every piece of artwork
  for(let artwork of artworkInfo) {
    let artElement = document.createElement("div");
    artElement.className = "search-result";

    let titleElement = document.createElement("div");
    titleElement.className = "title";
    titleElement.textContent = artwork.title;
    artElement.appendChild(titleElement);

    let descriptionElement = document.createElement("div");
    if(artwork.short_description === null) {
      descriptionElement.textContent = "No description provided."
    } else {
      descriptionElement.textContent = artwork.short_description;
    }
    artElement.appendChild(descriptionElement);

    searchResultsElement.appendChild(artElement);
  }
}