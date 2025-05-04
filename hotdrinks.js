function toggleFavorite(element) {
    element.classList.toggle('active');
  }
  
  function setGridView(sectionId) {
    const container = document.querySelector(`#${sectionId} .products-container`);
    container.classList.add('grid-view');
    container.classList.remove('list-view');
  }
  
  function setListView(sectionId) {
    const container = document.querySelector(`#${sectionId} .products-container`);
    container.classList.add('list-view');
    container.classList.remove('grid-view');
  }
  
  