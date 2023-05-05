// Generate a calendar
function generateCalendar() {
    const calendar = document.querySelector('#calendar');
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
  
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
  
    for (let i = 1; i <= endDate.getDate(); i++) {
      const day = document.createElement('div');
      day.classList.add('calendar-day');
      day.textContent = i;
      day.addEventListener('click', () => {
        document
          .querySelectorAll('.calendar-day.selected')
          .forEach((selected) => selected.classList.remove('selected'));
        day.classList.add('selected');
        filterPostsByDate(new Date(year, month, i));
      });
      calendar.append(day);
    }
  }
  
  // Fetch blog posts (replace with actual API call)
  // use date ---
  async function fetchPosts() {
    return [
      { title: 'Post 1', date: '2023-05-01' },
      { title: 'Post 2', date: '2023-05-03' },
      { title: 'Post 3', date: '2023-05-05' },
    ];
  }
  
  // Filter posts by date
  async function filterPostsByDate(date) {
    const posts = await fetchPosts();
    const filteredPosts = posts.filter(
      (post) => new Date(post.date).toDateString() === date.toDateString()
    );
    displayPosts(filteredPosts);
  }
  
  // Display posts
  function displayPosts(posts) {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';
  
    posts.forEach((post) => {
      const postElement = document.createElement('div');
      postElement.textContent = post.title;
      postsContainer.appendChild(postElement);
    });
  }
  
  generateCalendar();
  filterPostsByDate(new Date());