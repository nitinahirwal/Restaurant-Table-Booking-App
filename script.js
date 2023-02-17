var selectedRow = null;

//Show Alerts

function showAlert(message, className){
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main);

  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

//Clear All fields
function cleaFields(){
  document.querySelector("#dish").value = "";
  document.querySelector("#price").value = "";
  document.querySelector("#table-no").value = "";
}

//Add Data
document.querySelector("#order-form").addEventListener("submit", (e) => {
  e.preventDefault();

  //Get Form Values
  const dish = document.querySelector("#dish").value;
  const price = document.querySelector("#price").value;
  const table_no = document.querySelector("#table-no").value;

  //Validate
  if(dish == "" || price == "" || table_no == ""){
    showAlert("All fields are required", "danger");
  }
  else{
    if(selectedRow == null){
      const list = document.querySelector("#dish-list");
      const row = document.createElement("tr");

      row.innerHTML = `
      <td>${dish}</td>
      <td>${price}</td>
      <td>${table_no}</td>
      <td>
      <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
      <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
      </td>
      `;
      list.appendChild(row);
      selectedRow = null;
      showAlert("Order Added","success");
    }
    else{
      selectedRow.children[0].textContent = dish;
      selectedRow.children[1].textContent = price;
      selectedRow.children[2].textContent = table_no;
      selectedRow = null;
      showAlert("Order Edited", "info");
    }
    clearFields();
  }
});

//Edit Data
document.querySelector("#dish-list").addEventListener("click", (e) => {
  target = e.target;
  if(target.classList.contains("edit")){
    selectedRow = target.parentElement.parentElement;
    document.querySelector("#dish").value = selectedRow.children[0].textContent;
    document.querySelector("#price").value = selectedRow.children[1].textContent;
    document.querySelector("#table-no").value = selectedRow.children[2].textContent;
  }
})

//Delete Data
document.querySelector("#dish-list").addEventListener("click", (e) => {
  target = e.target;
  if(target.classList.contains("delete")){
    target.parentElement.parentElement.remove();
    showAlert("Order Deleted", "danger");
  }
});