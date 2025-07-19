const userForm = document.getElementById("userForm");
const userList = document.getElementById("userList");
let users = [];
let editId = null;

userForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !email) return;

  const userData = { name, email };

  if (editId !== null) {
    users[editId] = userData;
    editId = null;
  } else {
    users.push(userData);
  }

  renderUsers();
  userForm.reset();
});

function renderUsers() {
  userList.innerHTML = "";
  users.forEach((user, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `
      <span>${user.name} - ${user.email}</span>
      <span>
        <span class="badge text-bg-warning" onclick="editUser(${index})">✏️</span>
        <span class="badge text-bg-danger" onclick="deleteUser(${index})">🗑️</span>
      </span>
    `;
    userList.appendChild(li);
  });
}

function editUser(index) {
  const user = users[index];
  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
  editId = index;
}

function deleteUser(index) {
  if (confirm("Are you sure you want to delete this user?")) {
    users.splice(index, 1);
    renderUsers();
  }
}

// Fetch sample users from placeholder API
async function loadSampleUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  users = data.slice(0, 5).map(u => ({ name: u.name, email: u.email }));
  renderUsers();
}
