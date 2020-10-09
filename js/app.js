'use strict';

let $paginationButton = $('#pagination');
let $dropDownMenu = $('select');
let templateId = '.photo-template';
let photos = [];

function renderNewPage(page) {
  photos.splice(0, photos.length);
  $('section').remove();
  $('option').not(':first-child').remove();
  page.forEach(item => {
    photos.push(new Photo(item));
    let $option = $(`<option>${item.keyword}</option>`).attr('value', item.keyword);
    let optionExists = false;
    for (let i = 0; i < $dropDownMenu.children().length; i++){
      if ($dropDownMenu.children()[i].label == item.keyword){
        optionExists = true;
      }
    }
    if (optionExists == false){
      $dropDownMenu.append($option);
    }
  });

  //remove the duplicate options from the drop down (select)
  //first, create an options array that we're going to put all the unique values in
  var optionsArray = [];
  //get all the select options from the page
  $('select option').each(function () {
    //if that option's value already exists in the array, then delete the option from the page.
    if (optionsArray.includes(this.value)) {
      $(this).remove();
    }
    else {
      //otherwise, this option isn't in the array, so add it and leave the option on the page alone
      optionsArray.push(this.value);
    }
  });

  if ($('#titleRadioButton').is(':checked')) {
    photos.sort((a, b) => {
      return (a['title'] > b['title'] ? 1 : -1);
    });
  }
  else {
    photos.sort((a, b) => {
      return a['horns'] - b['horns'];
    })
  }
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
  if ($paginationButton.attr('value') === 'Next Page') {
    renderNewPage(page2);
    $paginationButton.attr('value', 'Previous Page');
  } else {
    renderNewPage(page1);
    $paginationButton.attr('value', 'Next Page');
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

$('input:radio').on('change', () => {
  let selection = $dropDownMenu[0].selectedIndex;
  if ($paginationButton.attr('value') === 'Next Page') {
    renderNewPage(page1);
  } else {
    renderNewPage(page2);
  }
  $dropDownMenu[0].selectedIndex = selection;
  $dropDownMenu.trigger('change');
});
