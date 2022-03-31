// logick for show selected file name
// search element
let label = document.querySelector(".label");
let fileInput = document.querySelector("#fileInput");

// add event to change value in file input
fileInput.addEventListener("change" ,(event) => {
    // check for length
    label.textContent = fileInput.files.length > 0 ? fileInput.files[0].name : "Select file";
});