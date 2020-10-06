'use strict'

function Photo(item) {
    this.title = item.title;
    this.image_url = item.image_url;
    this.description = item.description;    
}

Photo.prototype.render = function () {
    let $gallerySection = $('.photo-template').clone();
    $('main').append($gallerySection);
    $gallerySection.find('h2').text(this.title);
    $gallerySection.find('img').attr('src',this.image_url);
    $gallerySection.find('p').text(this.description);
    $gallerySection.removeClass('photo-template');
}

const ajaxSettings = {
    method: 'get',
    dataType: 'json'
}

$.ajax('/data/page-1.json',ajaxSettings)
    .then(data => {
        data.forEach(item => {
            let photo = new Photo(item);
            photo.render();
        });
    })