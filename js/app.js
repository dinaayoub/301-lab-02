/*'use strict'




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
      let $option = $(`<option>${item.title}</option>`).attr('value', item.keyword);
      // $option.attr('class', item.keyword);
      $dropDownMenu.append($option);
    });
  })


*/

'use strict';
let $paginationButton = $('#pagination');
let $dropDownMenu = $('select');
let templateId = '.photo-template';
let photos = [];

function Photo(rawDataObject) {
  for (let key in rawDataObject) {
    //assign the property name as our object's property name
    //then assign that property's value to the raw object data's value
    //object[key] is a way of doing object.key when all you have is a string.
    this[key] = rawDataObject[key];
  }
}

//"this" means the object that we are within.

Photo.prototype.toHtml = function () {
  //1. grab the template from our html document
  let template = $(templateId).html();

  //2. use Mustache to render the new html by merging it with data
  let html = Mustache.render(template, this)

  //3. return our html so it can be put on the page
  return html;
};


page1.forEach(item => {
  photos.push(new Photo(item));
  let $option = $(`<option>${item.title}</option>`).attr('value', item.keyword);
  $dropDownMenu.append($option);
});

photos.forEach(photo => {
  $('#gallery').append(photo.toHtml())
});

$paginationButton.on('click', () => {
  if ($paginationButton.attr('value') === 'Next Page') {
    photos.splice(0, photos.length);
    $paginationButton.attr('value', 'Previous Page');
    $('section').remove();
    $('option').not(':first-child').remove();
    page2.forEach(item => {
      photos.push(new Photo(item));
      let $option = $(`<option>${item.title}</option>`).attr('value', item.keyword);
      $dropDownMenu.append($option);
    });
    photos.forEach(photo => {
      $('#gallery').append(photo.toHtml())
    });
  } else {
    photos.splice(0, photos.length);
    $paginationButton.attr('value', 'Next Page');
    $('section').remove();
    $('option').not(':first-child').remove();
    page1.forEach(item => {
      photos.push(new Photo(item));
      let $option = $(`<option>${item.title}</option>`).attr('value', item.keyword);
      $dropDownMenu.append($option);
    });
    photos.forEach(photo => {
      $('#gallery').append(photo.toHtml())
    });
  }
});

$dropDownMenu.on('change', function () {
  //Code for filtering images here
  let $sections = $('section');
  $sections.hide();
  let title = $dropDownMenu[0][$dropDownMenu[0].selectedIndex].value;
  if (title === 'default') {
    $('section').show();
  } else {
    $(`.${title}`).show();
  }
});
