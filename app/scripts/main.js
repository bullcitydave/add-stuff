// var ListView,
//   __hasProp = {}.hasOwnProperty,
//   __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
//
// ListView = (function(_super) {
//   var list_view;
//
//   __extends(ListView, _super);
//
//   function ListView() {
//     return ListView.__super__.constructor.apply(this, arguments);
//   }
//
//   ListView.prototype.el = $('body');
//
//   ListView.prototype.initialize = function() {
//     _.bindAll(this, _.functions(this));
//     return this.render();
//   };
//
//   ListView.prototype.render = function() {};
//
//   $(ListView.el).append('<ul><li>Hello, Backbone!</li></ul>');
//
//   list_view = new ListView;
//
//   return ListView;
//
// })(Backbone.View);



var iterators = _.range(1,11);
var list = ("<% _.each(iterators, function(iterator) { %> <input type='number' name='myinput<%= iterator %>'> <% }); %>");
var listOutput = _.template(list);
$('form').append(listOutput);





// var calculateTotal = function (event) {
//
//   var inputs = $('input[name^=myinput]');
//   var inputValues= _.map(inputs, function(input) {
//     return (isNaN(parseInt($(input).val())) ? 0 : parseInt($(input).val()))
//   });
//   var total = _.reduce(inputValues, function(memo, inputValue) { return memo + inputValue; }, 0);
//   $('p#total').html(total);
//
// }
//
// $('.btn-success').on("click", calculateTotal);
// $('input[name^=myinput]').on("blur", calculateTotal);



var calculateTotal = function (event) {
    var inputs = $('input[name^=myinput]');
    var inputValues= _.map(inputs, function(input) {
        return (isNaN(parseFloat($(input).val())) ? 0 : parseFloat($(input).val()))
    });
    var total = _.reduce(inputValues, function(memo, inputValue) { return memo + inputValue; }, 0);
    $('p#total').html(parseFloat(total.toFixed(8)));
};

var resetInput = function (event) {
    $('input').val(null);
    $('p#total').html('0');
};

var prependRow = function (event) {
    event.preventDefault();
    var inputLength = $('input[name^=myinput]').length;
    $('form').prepend("<input type='number' name='myinput" + (inputLength+1) + "'>");
    $('input[type=number]').eq(0).focus();
}

var appendRow = function (event) {
    event.preventDefault();
    var inputLength = $('input[name^=myinput]').length;
    $('form').append("<input type='number' name='myinput" + (inputLength+1) + "'>");
    $('input[type=number]').eq(inputLength).focus();
}




$('.btn-success').on("click", resetInput);

$(document).on('blur', 'input[name^=myinput]', calculateTotal);

// disable mousewheel on a input number field when in focus
// (to prevent Cromium browsers change the value when scrolling)
$('form').on('focus', 'input[type=number]', function (e) {
  $(this).on('mousewheel.disableScroll', function (e) {
    e.preventDefault()
  })
})
$('form').on('blur', 'input[type=number]', function (e) {
  $(this).off('mousewheel.disableScroll')
})

$('.glyphicon-plus').eq(0).on("click", prependRow);
$('.glyphicon-plus').eq(1).on("click", appendRow);
