// serch all elements
fileName = document.querySelector(".file-name");
fileStatus = document.querySelector(".file-status");
link = document.querySelector(".link");

// function for get status
async function refresh() {
    // make request
    let response = await fetch(`/status/${fileName.textContent}`,{method:'GET' });

    // convert to json
    let jsonObj = await response.json();

    // update UI
    fileStatus.textContent = jsonObj.status;
    link.textContent = jsonObj.linkName;
    link.href = jsonObj.link;
}

setTimeout(()=>{refresh()}, 5000);
// start every 5 sec
// window.setInterval(refresh, 5000); 	