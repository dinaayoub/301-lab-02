'use strict'

function Photo(item) {
    this.title = item.title;
    this.image_url = item.image_url;
    this.description = item.description;
    this.keyword = item.keyword;
}

Photo.prototype.render = function () {
    let $gallerySection = $('.photo-template').clone();
    $('main').append($gallerySection);
    $gallerySection.find('h2').text(this.title);
    $gallerySection.find('img').attr('src', this.image_url);
    $gallerySection.find('p').text(this.description);
    $gallerySection.removeClass('photo-template');
    $gallerySection.attr('class', this.keyword);
}

const ajaxSettings = {
    method: 'get',
    dataType: 'json'
}


$.ajax('data/page-1.json', ajaxSettings)
    .then(data => {
        data.forEach(item => {
            let photo = new Photo(item);
            photo.render();
            let $option = $(`\<option>${item.title}\</option>`).attr('value', item.keyword);
            // $option.attr('class', item.keyword);
            dropDownMenu.append($option);
        });
    })


let dropDownMenu = $('select');
dropDownMenu.on('change', function () {
    //Code for filtering images here
    let $sections = $('section');
    $sections.hide();
    let title = dropDownMenu[0][dropDownMenu[0].selectedIndex].value;
    $(`.${title}`).show();
})