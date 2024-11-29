fetch('https://api.escuelajs.co/api/v1/users')
    .then(response => response.json())
    .then(users => {
        const userContainer = document.getElementById('user-container');
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.classList.add('user-card');
            userCard.innerHTML = `
        <img src="${user.avatar}" alt="">
        <h3>${user.name}</h3>
        <p>${user.email}</p>
      `;
            userContainer.appendChild(userCard);
        });
    })