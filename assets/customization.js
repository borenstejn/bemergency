// console.log('testboren')
//
var colorsAvailable = ["blanc", "orange", "bleu", "jaune", "rose", "gris", "vert", "violet", "noir", "vert-clair"];
var crewneckColorsAvailable = ['pink', 'blue', 'grey', 'yellow'];
var frenchCrewneckColorsAvailable = ['rose', 'bleu', 'gris', 'jaune'];
var stainsColorsAvailable = ["green", "white", "black"];
var wordsAvailable = $('#be-words input:radio').map(function () {
    return this.value;
})
var defaultColor = "black";

var colorStainsMapping = {
    rose: "pink",
    jaune: "yellow",
    vertclair: "green",
    bleu: "blue",
    gris: 'grey'
}

var textColorHash = {
    gris: "#86c9dd",
    rose: "#f1ddaa",
    bleu: "#43ad4e",
    jaune: "#86c9dd",

    noir: "pink",
    blanc: "pink",
    vert: "yellow",
    // rose: "yellow",
    // bleu: "orange",
    // gris: "yellow",
    // jaune: "grey",
    orange: "yellow",
    violet: defaultColor
}

var beColorHash = {
    gris: "white",
    rose: "white",
    bleu: "white",
    jaune: "black",

    noir: "white",
    blanc: "black",
    orange: "black",
    vert: "white",
    violet: "white"
}

let cloudinaryPath = "https://res.cloudinary.com/landly/image/upload/v1677583051/BE/";
var srcPath = "https://cdn.shopify.com/s/files/1/0505/5751/7976/files/";
var fullWords = "";
var colorSelected = colorsAvailable[0];
var stainsSelected = "none";
var $customImage = $('.custom-image');
var $customField = $('.custom-field');
var $customText = $('.custom-text');
var $beWord = $('.be-word');
var $firstLine = $('#first-line');
var $secondLine = $('#second-line');
$customImage.hide();
$(".custom-field" ).hide();

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded')
    document.querySelector('#be-stains input[value="1"]').checked = true;

});


function setSrc(color, word, format) {
    var productPath = [myProductType, color, word].join("-");
    var src = srcPath + productPath + "." + format;
    $(".main-image").attr("src", src);
}

//
function setStainsSrc(color, option) {
    if (option === "none") {
        $(".stains").css('opacity', 0);
    } else {
        $(".stains").css('opacity', 1);
        var productPath = [myProductType, colorStainsMapping[color], "stains", option].join("-");
        var src = cloudinaryPath + productPath + ".png";
        console.log("stains path")
        console.log(src);
        $(".stains").attr("src", src);
    }
}

function computeWord() {
    var firstWord = $("#make-your-own").val().trim().replace(/\s+/g, '-').toLowerCase();
    var secondWord = $("#make-your-own-2").val().trim().replace(/\s+/g, '-').toLowerCase();
    fullWords = secondWord.length > 0 ? (firstWord + '-' + secondWord) : firstWord;
    return fullWords
}

function fontColorFrom(color) {
    return textColorHash[color];
}

function beColorFrom(color) {
    return beColorHash[color];
}

function formatCustomWord(word) {
    return word.replace('be', "<span class='be-word'>be</span>");
}

$('#be-stains input[type=radio]').change(function () {
    console.log(this.value)
    loadCurrentStains(this.value)
});

$('input').keyup(function () {
    console.log('keyup')
    computeWord();
    if (('[data-product-swatch="1"] .option--active .form-radio')[0] !== 'undefined') {
        colorSelected = $('[data-product-swatch="1"] .option--active .form-radio')[0].value.replace(/\s+/g, '').toLowerCase();
    }
    $customText.hide();
    $customText.show();
    $customText.css('color', fontColorFrom(colorSelected));
    $beWord.css('color', beColorFrom(colorSelected));
});

$("#make-your-own").keyup(function () {
    $firstLine.empty();
    $firstLine.append(formatCustomWord(this.value.toLowerCase()));
});

$("#make-your-own-2").keyup(function () {
    $secondLine.empty();
    $secondLine.append(formatCustomWord(this.value.toLowerCase()));
});


var max_chars = 13;

$('input').keydown(function () {
    if ($(this).val().length >= max_chars) {
        $(this).val($(this).val().substr(0, max_chars));
    }
});

$('input').keyup(function () {
    if ($(this).val().length >= max_chars) {
        $(this).val($(this).val().substr(0, max_chars));
    }
});

