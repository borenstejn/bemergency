var $mainImages = $('.main-images');
var $customImage = $('.custom-image');
var $customField = $('.custom-field');
var $customText = $('.custom-text');
var $beWords = $('#be-words');
var inCustomizationMode = false

var summer2023 = [
    "belle-de-jour",
    "belle-de-nuit",
    "beach-lover",
    "beatitude",
    "beautiful-day",
    "bekini",
    "belle-ile-en-mer",
    "globe-trotter",
    "good-vibes",
    "hello-beach",
    "liberte",
    "life-is-better-with-a-tan",
    "sex-on-the-beach",
    "other"
];

var mothersDay = ["best-dad", "best-mum"];

function optionFrom(item) {
    var itemUppercase = item.replaceAll('-', ' ').toUpperCase();
    var string = "<input required class='required' type='radio' name='properties[choose your word]' value="+item+"> <span>"+itemUppercase+"</span><br>"
    return string
};

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

$customImage.hide();
$(".custom-field" ).hide();

function preloadImage(url) {
    const image = new Image();
    image.src = url;
}

function loadCurrentStains(optionSelected) {
    console.log("loadCurrentStains")


    if (('.color .option--active .form-radio')[0] !== 'undefined') {
        colorSelected = $('.color .option--active .form-radio')[0].value.replace(/\s+/g, '').toLowerCase();
    }
    console.log(colorSelected)
    console.log("optionSelected")
    console.log(optionSelected)
    setStainsSrc(colorSelected, optionSelected);
}


if (myProductTitle.includes('customizable')) {
    // console.log("myProductTitle");
    // console.log(myProductTitle);
    window.addEventListener('load', function () {
        // console.log('customizable')
        inCustomizationMode = true
        colorSelected = $('.color .option--active .form-radio')[0].value.replace(/\s+/g, '').toLowerCase();

        setSrc(colorSelected, 'other', 'png');
        $customImage.addClass(myProductType);
        $mainImages.hide();
        $customImage.show();
        $customField.show();

        const baseStainsUrl = 'https://cdn.shopify.com/s/files/1/0505/5751/7976/files/crewneck-';
        for (const color of crewneckColorsAvailable) {
            for (let i = 1; i <= 4; i++) {
                preloadImage(`${baseStainsUrl}${color}-stains-${i}.png`);
            }
        }

        frenchCrewneckColorsAvailable.forEach(color => {
            const url = `${baseStainsUrl}${color}-other.png`;
            preloadImage(url);
        });

        console.log('images loaded')
        setStainsSrc(colorSelected, '1');
    })

} else {
    // console.log('not customizable')

    $beWords.show();
    $customImage.hide();
    $customField.hide();
    var collectionString = myProductTags.split('words-')[1].split('-custom')[0]
    var collection = window[collectionString]
    if (typeof collection !== 'undefined') {
        collection.forEach(function(item){
            $beWords.append(optionFrom(item));
        });
    }
}

$('#be-words input[type=radio]').change(function() {
    // console.log('click');
    if ($mainImages[0].style.display !== "none") {
        $mainImages.toggle();
        $customImage.toggle();
    };
    colorSelected = $('.color .option--active .form-radio')[0].value.toLowerCase();
    setSrc(colorSelected, this.value, 'jpg');
    $('.back-print').hide();
});

$('.color .form-radio').click(function() {
    colorSelected = this.value.replace(/\s+/g, '').toLowerCase();
    // console.log("newColor");
    // console.log(colorSelected);
    if (inCustomizationMode) {
        $customText.css('color', fontColorFrom(colorSelected));
        let stainsSelected = $('input[name="properties[choose your stains]"]:checked').val();
        setStainsSrc(colorSelected, stainsSelected);
        $('.be-word').css('color', beColorFrom(colorSelected));
        setSrc(colorSelected, 'other', 'png');
    } else {
        let wordSelected = $('input[name="properties[choose your word]"]:checked').val();
        setSrc(colorSelected, wordSelected, 'jpg');
    }
});
