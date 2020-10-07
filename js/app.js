'use strict';

let $paginationButton = $('#pagination');
let $dropDownMenu = $('select');
let templateId = '.photo-template';
let photos = [];

function renderNewPage(page){
  page.forEach(item => {
      photos.push(new Photo(item));
      let $option = $(`<option>${item.title}</option>`).attr('value', item.keyword);
      $dropDownMenu.append($option);
    });
    photos.forEach(photo => {
      $('#gallery').append(photo.toHtml())
    });
}

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


renderNewPage(page1);

$paginationButton.on('click', () => {
  photos.splice(0, photos.length);
  $paginationButton.attr('value', 'Previous Page');
  $('section').remove();
  $('option').not(':first-child').remove();
  if ($paginationButton.attr('value') === 'Next Page') {
    renderNewPage(page2);
  } else {
    renderNewPage(page1);
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
