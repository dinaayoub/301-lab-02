'use strict'

const ajaxSettings = {
    method: 'get',
    dataType: 'json'
}

$.ajax('/data/page-1.json',ajaxSettings)
    .then(data => {
        data.forEach(item => {
            let $gallerySection = $('<section></section>');
            $gallerySection.addClass('galleryPhoto');
            $('main').append($gallerySection);
            let $photoTitle = $('<h1></h1>').text(item['title']);
            $gallerySection.append($photoTitle);
            let $photoImage = $('<img>').attr('src',item['image_url']);
            $gallerySection.append($photoImage);
            let $photoDescription = $('<p></p>').text(item['description']);
            $gallerySection.append($photoDescription);
        });
    })