const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchResult = document.getElementById("book-container");

const errorDiv = document.getElementById("error");
const resultNumber = document.getElementById("resultNumber");
const spinner = document.getElementById("spinner");

searchBtn.addEventListener("click", function () {
    console.log(spinner);
    const search = searchInput.value;
    if (search === "") {
        errorDiv.innerText = "Search field cannot be empty.";
        return;
    }
    //   Clear
    searchResult.innerHTML = "";

    const url = `http://openlibrary.org/search.json?q=${search}`;
    spinner.classList.remove("d-none");
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            // Setting a timer of 1.5s, before removing the spinnner, and showing data
            setTimeout(() => {
                spinner.classList.add("d-none");
                showData(data.docs);
            }, 1500);
        })
        .finally(() => {
            searchInput.value === "";
        });
});

function showData(data) {
    // Error Handing

    if (data.length === 0) {
        errorDiv.innerText = "NO Result Found";
    } else {
        errorDiv.innerText = "";
    }

    data.forEach((book) => {
        resultNumber.innerText = `${data.length} Result Found`;

        const imgURL = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        const div = document.createElement("div");
        div.classList.add("col-md-4");
        div.innerHTML = `
        <div class="card h-100">
            <img src = "${imgURL}"/>
            <div class="card-body">
        
                <h5 class="card-title">${book.title} </h5>
                <p class="card-text">Author Name: ${book.author_name} </p>
                <p class="card-text">Publish Date: ${book.publish_date} </p>
                <p class="card-text">Publish Year: ${book.publish_year}</p>    
                <p class="card-text">First Publish Year: ${book.first_publish_year} </p>

            </div>
        </div>
      `;
        searchResult.appendChild(div);
    });
}