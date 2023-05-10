




// Calendar for blog.html
function generateCalendar(year, month) {
  const calendar = document.querySelector('#calendar');
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  const numDays = endDate.getDate();

  // Clear existing calendar days
  calendar.innerHTML = '';

  // Add calendar days
  for (let i = 1; i <= numDays; i++) {
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

  // Populate the month select field
  const monthSelect = document.querySelector('#month');
  monthSelect.innerHTML = '';
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  months.forEach((monthName, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = monthName;
    if (index === month) {
      option.selected = true;
    }
    monthSelect.appendChild(option);
  });

  // Populate the year select field
  const yearSelect = document.querySelector('#year');
  yearSelect.innerHTML = '';
  const currentYear = new Date().getFullYear();
  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    if (i === year) {
      option.selected = true;
    }
    yearSelect.append(option);
  }
}

// Fetch blog posts (replace with actual API call)
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

// Display blog posts
function displayPosts(posts) {
  const postsContainer = document.getElementById('posts');
  postsContainer.innerHTML = '';

  posts.forEach((post) => {
    const postElement = document.createElement('div');
    postElement.textContent = post.title;
    postsContainer.appendChild(postElement);
  });
}

// Get the current date and generate the calendar
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
generateCalendar(currentYear, currentMonth);

// Listen for changes in the month and year select fields
const monthSelect = document.querySelector('#month');
const yearSelect = document.querySelector('#year');
monthSelect.addEventListener('change', () => {
  const selectedMonth = parseInt(monthSelect.value, 10);
  const selectedYear = parseInt(yearSelect.value, 10);
  generateCalendar(selectedYear, selectedMonth);
});
yearSelect.addEventListener('change', () => {
  const selectedMonth = parseInt(monthSelect.value, 10);
  const selectedYear = parseInt(yearSelect.value, 10);
  generateCalendar(selectedYear, selectedMonth);
});

// Filter the blog posts by the current date by default
filterPostsByDate(today);