import './style.css'

const formElement = document.querySelector<HTMLFormElement>("#search-form")!;
const resultsElement = document.querySelector<HTMLDivElement>("#search-results")!;

formElement.onsubmit = (e: SubmitEvent) => {
  // default html form behavior reloads the page
  e.preventDefault();

  // convert form data into JSON
  const formData = new FormData(formElement);
  const formObject = Object.fromEntries(formData.entries());
  
  // query the API
  performSearch(formObject.query.toString());
}

////////////////////////////////////////////////////////////

const performSearch = async (query: string) => {
  const url = `https://api.artic.edu/api/v1/artworks/search?q=${query}`;
  const result = await fetch(url);
  const resultJson = await result.json();

  // collect individual API URLs for all search results
  const maxResults = 5;
  const results: any[] = resultJson["data"].map((data: any) => {
    return { 
      url: data["api_link"]
    }
  }).slice(0, maxResults);

  const searchResults: SearchResult[] = await Promise.all(results.map(async r => {
    const result = await fetch(r.url);
    const json = await result.json();

    console.log(json);

    return {
      image_id: json["data"]["image_id"],
      title: json["data"]["title"],
    }
  }))

  showSearchResults(searchResults);
}

interface SearchResult {
  title: string,
  image_id: string,
}

const showSearchResults = (results: SearchResult[]) => {
  const elements = results.map(r => {
    let elt = document.createElement("div");
    elt.className = "search-result"

    let title = document.createElement("div")
    title.className = "title";
    title.textContent = r.title;
    elt.appendChild(title);

    let img = document.createElement("img");
    console.log(r);
    img.crossOrigin = "anonymous"; // the API server sets the wrong content-type, so we need to add this
    img.src = `https://www.artic.edu/iiif/2/${r.image_id}/full/600,/0/default.jpg`;
    elt.appendChild(img);

    return elt;
  })

  resultsElement.replaceChildren(...elements)
}