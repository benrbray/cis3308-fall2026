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

const performSearch = (query: string) => {
  const url = `https://api.artic.edu/api/v1/artworks/search?q=${query}`;
  const result: Promise<Response> = fetch(url);

  // define what action to take when the promise resolves
  result.then(response => {
    response.json().then(data => {

      /// PHASE 1:  Process the initial set of search results.
      let searchResults: SearchResult[] = [];
      
      // extract the title and url for each piece of artwork
      for(let artwork of data["data"]) {
        searchResults.push({
          title: artwork["title"],
          url: artwork["api_link"]
        })
      }

      // only include 5 search results
      searchResults = searchResults.slice(0, 5);

      // PHASE 2:  get more detailed information about each piece of artwork
      let artworkInfo: ArtworkInfo[] = [];

      for(let searchResult of searchResults) {
        const result: Promise<Response> = fetch(searchResult.url);
        result.then(response => {
          response.json().then(json => {
            artworkInfo.push({
              title: json["data"]["title"],
              artist: json["data"]["artist_title"],
              date: json["data"]["date_display"],
              short_description: json["data"]["short_description"],
            })
          })
        })
      }

      console.log("ARTWORK INFO:", artworkInfo.length);
      displaySearchResults(artworkInfo);
    })
  });

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
    artElement.textContent = artwork.title;

    let descriptionElement = document.createElement("div");
    descriptionElement.textContent = artwork.short_description;
    artElement.appendChild(descriptionElement);

    searchResultsElement.appendChild(artElement);
  }
}