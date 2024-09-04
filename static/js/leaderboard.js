document.addEventListener("DOMContentLoaded", () => {
    loadLeaderboard();
});

async function loadLeaderboard() {
    try {
        // Fetch user data from the Flask endpoint
        const response = await fetch("/get_users");
        
        if (!response.ok) {
            throw new Error("Failed to load users");
        }
        
        // Parse the JSON data from the response
        const users = await response.json();
        
        // Sort users by points in descending order
        const sortedUsers = users.sort((a, b) => b.points - a.points);
        
        // Select top 5 users
        const topUsers = sortedUsers.slice(0, 5);
        
        // Get the leaderboard table element
        const leaderboard = document.querySelector('#leaderboard table');
        leaderboard.innerHTML = ''; // Clear any existing rows
        
        topUsers.forEach((user, index) => {
            // Create a new row for each user
            const row = document.createElement('tr');
            
            // Create and populate the place cell
            const placeCell = document.createElement('td');
            placeCell.className = `place ${index === 0 ? 'first' : ''}`;
            placeCell.textContent = index + 1;
            
            // Create and populate the name cell
            const nameCell = document.createElement('td');
            nameCell.className = 'name';
            nameCell.textContent = `${user.first_name} ${user.last_name}`;
            
            // Create and populate the points cell
            const pointsCell = document.createElement('td');
            pointsCell.className = 'points';
            pointsCell.textContent = user.points;
            
            // Add a medal for the top user
            if (index === 0) {
                const medal = document.createElement('img');
                medal.className = 'gold-medal';
                medal.src = '/static/src/medal.png';
                medal.alt = 'gold medal';
                pointsCell.appendChild(medal);
            }
            
            // Append cells to the row and the row to the table
            row.appendChild(placeCell);
            row.appendChild(nameCell);
            row.appendChild(pointsCell);
            leaderboard.appendChild(row);
        });
    } catch (error) {
        console.error("Error loading leaderboard:", error);
    }
}

