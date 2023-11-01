const searchBar = (data) => {
  if (/^\s*$/.test(data)) {
    return alert("enter a valid string");
  }
  let searchQuery, searchType;
  data = data.split(":");
  if (data.length < 2) {
    searchType = "post";
    searchQuery = data[0];
  } else {
    searchType = data[0];
    searchQuery = data[1];
  }
  console.log(searchType, searchQuery);

  searchType = searchType.toLowerCase()
  searchQuery = searchQuery.toLowerCase()

  if(!["category", "blog", "author", "post"].includes(searchType)){
    return alert("invalid search param")
  }

  searchQuery = searchQuery
    .split(" ")
    .filter((ele) => ele !== "")
    .join(" ");


  window.location.href = `/pages/search.html?t=${searchType}&q=${searchQuery}`
};
