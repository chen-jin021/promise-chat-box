document.addEventListener("DOMContentLoaded", main);

async function main() {
  const btn = document.querySelector("#btn");
  btn.addEventListener("click", handleClick);
  getMessages();
}
async function handleClick() {
  const text = document.querySelector("#text").value;
  //looking below, we might think fetch is a method for get
  //it could actually be configured using the second parameter
  const res = await fetch("api/messages", {
    //here, we are mimic a form post
    method: "POST",
    headers: {
      //content type is application/json also works
      //since we are using bodyparser, it is [below] encoded
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "text=" + text,
  });
  const data = await res.json();
  console.log(data);
}
//now get the data
async function getMessages() {
  //use fetch
  const res = await fetch("/api/messages");
  const data = await res.json();
  console.log(data);

  //querySelector selects the id=messages in our index.html
  const container = document.querySelector("#messages");
  for (const m of data) {
    const div = container.appendChild(document.createElement("div"));
    div.textContent = m.text;
  }
  //  setTimeout(getMessages, 1000);
}
