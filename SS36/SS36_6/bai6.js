let selectedStar = 0;

const stars = document.querySelectorAll('.stars');
stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedStar = parseInt(star.dataset.star);
    updateStars(selectedStar);
  });
});

function updateStars(score) {
  stars.forEach(star => {
    star.classList.toggle('selected', parseInt(star.dataset.star) <= score);
  });
  document.getElementById('star-msg').innerText = score ? `Bạn đánh giá: ${score} sao.` : 'Bạn chưa đánh giá.';
}

function submitReview() {
  const comment = document.getElementById('comment').value.trim();
  if (selectedStar === 0 || comment === "") {
    alert("Vui lòng đánh giá và nhập bình luận!");
    return;
  }

  const newReview = {
    stars: selectedStar,
    comment: comment
  };

  const reviewList = JSON.parse(localStorage.getItem('reviews') || '[]');
  reviewList.push(newReview);
  localStorage.setItem('reviews', JSON.stringify(reviewList));

  document.getElementById('comment').value = '';
  selectedStar = 0;
  updateStars(0);
  renderReviews();
}

function renderReviews() {
  const reviewList = JSON.parse(localStorage.getItem('reviews') || '[]');
  const container = document.getElementById('review-list');
  container.innerHTML = '';

  reviewList.reverse().forEach(review => {
    const div = document.createElement('div');
    div.className = 'review';
    const stars = '★'.repeat(review.stars) + '☆'.repeat(5 - review.stars);
    div.innerHTML = `<span class="stars">${stars}</span><span>${review.comment}</span>`;
    container.appendChild(div);
  });
}

window.onload = renderReviews;