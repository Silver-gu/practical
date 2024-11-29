fetch('https://api.escuelajs.co/api/v1/users')
    .then(response => response.json())
    .then(users => {
        const userContainer = document.getElementById('user-container');
        users.forEach(user => {
            // Create a user card
            const userCard = document.createElement('div');
            userCard.classList.add('user-card');
            userCard.innerHTML = `
        <img src="${user.avatar}" alt="${user.name}">
        <h3>${user.name}</h3>
        <p>${user.email}</p>
        <button class="delete-btn">Delete</button>
      `;

            userContainer.appendChild(userCard);
            const deleteBtn = userCard.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                userCard.remove();
            });
        });
    })
