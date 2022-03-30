// serch all elements
fileName = document.querySelector(".file-name");
fileStatus = document.querySelector(".file-status");
link = document.querySelector(".link");

// function for get status
async function refresh(timer) {
    // make request
    let response = await fetch(`/status/${fileName.textContent}`,{method:'GET' });

    // convert to json
    let jsonObj = await response.json();

    // check for status ready
    if (jsonObj.status == "Ready!") {

        // change UI to load link
        fileStatus.textContent = jsonObj.status;
        link.classList.remove("hidden");
        fileStatus.classList.add("success");

        // stop timer
        clearInterval(timer);
    }

    // file was deleted
    else if (jsonObj.status == "File was deleted from server"){
        // change UI to load link
        fileStatus.textContent = jsonObj.status;
        fileStatus.classList.add("error");

        // stop timer
        clearInterval(timer);
    }
}
// wait 1 and refresh status every 3 sec
setTimeout(()=>{let timer = window.setInterval(() => {refresh(timer);}, 3000); },1000);