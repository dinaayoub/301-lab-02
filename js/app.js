'use strict'

let $paginationButton = $('#pagination');
let $dropDownMenu = $('select');

$paginationButton.on('click', () => {
  if ($paginationButton.attr('value') === 'Next Page'){
    $paginationButton.attr('value', 'Previous Page');
    $('section').not('.photo-template').remove();
    $('option').not(':first-child').remove();
    $.ajax('data/page-2.json', ajaxSettings)
      .then(data => {
        data.forEach(item => {
          let photo = new Photo(item);
          photo.render();
          let $option = $(`<option>${item.title}</option>`).attr('value', item.keyword);
          // $option.attr('class', item.keyword);
          $dropDownMenu.append($option);
        });
        $('section').not('.photo-template').show();
      })
    // $('#myDropDown option').val('default').change();
  } else {
    $paginationButton.attr('value', 'Next Page');
    $('section').not('.photo-template').remove();
    $('option').not(':first-child').remove();
    $.ajax('data/page-1.json', ajaxSettings)
      .then(data => {
        data.forEach(item => {
          let photo = new Photo(item);
          photo.render();
          let $option = $(`<option>${item.title}</option>`).attr('value', item.keyword);
          // $option.attr('class', item.keyword);
          $dropDownMenu.append($option);
        });
        $('section').not('.photo-template').show();
      })
    // $('#myDropDown option').val('default').change();
  }
})

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

$dropDownMenu.on('change', function () {
  //Code for filtering images here
  let $sections = $('section');
  $sections.hide();
  let title = $dropDownMenu[0][$dropDownMenu[0].selectedIndex].value;
  console.log(title);
  if (title === 'default'){
    $('section').not('.photo-template').show();
  } else {
    $(`.${title}`).show();
  }
});
