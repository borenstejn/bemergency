var $mainImages = $('.main-images');
var $customImage = $('.custom-image');
var $customField = $('.custom-field');
var $customText = $('.custom-text');
var $beWords = $('#be-words');
var $pinkButton = $('.form-radio[value="Rose"]');
var inCustomizationMode = false;


function optionFrom(item) {
    var itemUppercase = item.replaceAll('-', ' ').toUpperCase();
    var string = "<input required class='required' type='radio' name='properties[choose your word]' value="+item+"> <span>"+itemUppercase+"</span><br>"
    return string
};

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
    console.log(colorSelected)
    console.log("optionSelected")
    console.log(optionSelected)
    setStainsSrc(colorSelected, optionSelected);
}


if (myProductTitle.includes('customizable')) {
    console.log("myProductTitle");

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
        inCustomizationMode = true
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

        console.log('images loaded')
        setStainsSrc(colorSelected, '1');
    })
}
