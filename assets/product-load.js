// Section 1: Variable declarations and initializations

var $mainImages = $('.main-images');
var $customImage = $('.custom-image');
var $customField = $('.custom-field');
var $customText = $('.custom-text');
var $pinkButton = $('.form-radio[value="Rose"]');

let cloudinaryPath = "https://res.cloudinary.com/landly/image/upload/v1677583051/BE/";
var srcPath = "https://cdn.shopify.com/s/files/1/0505/5751/7976/files/";
var fullWords = "";
var $beWord = $('.be-word');
var $firstLine = $('#first-line');
var $secondLine = $('#second-line');

$customImage.hide();
$customField.hide();


// Section 2: Mapping objects for color codes and available colors

var colorStainsMapping = {
    rose: "pink",
    jaune: "yellow",
    vertclair: "green",
    bleu: "blue",
    gris: 'grey'
};

var textColorHash = {
    gris: "#86c9dd",
    rose: "#f1ddaa",
    bleu: "#43ad4e",
    jaune: "#86c9dd",
    noir: "pink",
    blanc: "pink",
    vert: "yellow",
    orange: "yellow",
    violet: "black"
};

var crewneckColorsAvailable = ['pink', 'blue', 'grey', 'yellow'];
var frenchCrewneckColorsAvailable = ['rose', 'bleu', 'gris', 'jaune'];


// Section 3: Helper functions

function preloadImage(url) {
    const image = new Image();
    image.src = url;
}

function setSrc(color, word, format) {
    var productPath = [myProductType, color, word].join("-");
    var src = srcPath + productPath + "." + format;
    $(".main-image").attr("src", src);
}


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

function loadCurrentStains(optionSelected) {
    console.log("loadCurrentStains")


    if (('[data-product-swatch="1"] .option--active .form-radio')[0] !== 'undefined') {
        colorSelected = $('[data-product-swatch="1"] .option--active .form-radio')[0].value.replace(/\s+/g, '').toLowerCase();
    }
    setStainsSrc(colorSelected, optionSelected);
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



if (myProductTitle.includes('customizable')) {
    console.log("myProductTitle");

    $('#be-stains input[type=radio]').change(function () {
        loadCurrentStains(this.value)
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

    $('[data-product-swatch="1"] .form-radio').click(function() {
        colorSelected = this.value.replace(/\s+/g, '').toLowerCase();
        $customText.css('color', fontColorFrom(colorSelected));
        let stainsSelected = $('input[name="properties[choose your stains]"]:checked').val();
        setStainsSrc(colorSelected, stainsSelected);
        $('.be-word').css('color', beColorFrom(colorSelected));
        setSrc(colorSelected, 'other', 'png');
    });

    window.addEventListener('load', function () {
        $pinkButton.click();
        console.log("myProductTitle2");
        colorSelected = 'rose';

        console.log("beforesetsrc");
        setSrc(colorSelected, 'other', 'png');
        console.log("aftersetsrc");
        $customImage.addClass(myProductType);
        $mainImages.hide();
        $customImage.show();
        $customField.show();

        const baseStainsUrl = 'https://res.cloudinary.com/landly/image/upload/v1677583051/BE/crewneck-';
        for (const color of crewneckColorsAvailable) {
            for (let i = 1; i <= 4; i++) {
                preloadImage(`${baseStainsUrl}${color}-stains-${i}.png`);
            }
        }

        frenchCrewneckColorsAvailable.forEach(color => {
            const url = `${baseStainsUrl}${color}-other.png`;
            preloadImage(url);
        });
        setStainsSrc(colorSelected, '1');
        document.querySelector('#be-stains input[value="1"]').checked = true;
    })
}
