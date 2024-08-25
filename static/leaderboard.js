document.addEventListener("DOMContentLoaded", () => {
    loadLeaderboard();
});

function loadLeaderboard() {
    // Fetch user data from the Flask endpoint
    fetch("/get_users")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load users");
            return response.json();
        })
        .then(users => {
            // Sort users by points in descending order
            const sortedUsers = users.sort((a, b) => b.points - a.points);

            // Select top 5 users
            const topUsers = sortedUsers.slice(0, 5);

            // Display leaderboard
            const leaderboard = document.querySelector('#leaderboard table');
            leaderboard.innerHTML = ''; // Clear any existing rows

            topUsers.forEach((user, index) => {
                const row = document.createElement('tr');

                const placeCell = document.createElement('td');
                placeCell.className = `place ${index === 0 ? 'first' : ''}`;
                placeCell.textContent = index + 1;

                const nameCell = document.createElement('td');
                nameCell.className = 'name';
                nameCell.textContent = `${user.first_name} ${user.last_name}`;

                const pointsCell = document.createElement('td');
                pointsCell.className = 'points';
                pointsCell.textContent = user.points;

                if (index === 0) {
                    const medal = document.createElement('img');
                    medal.className = 'gold-medal';
                    medal.src = 'https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true';
                    medal.alt = 'gold medal';
                    pointsCell.appendChild(medal);
                }

                row.appendChild(placeCell);
                row.appendChild(nameCell);
                row.appendChild(pointsCell);

                leaderboard.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error loading leaderboard:", error);
        });
}
