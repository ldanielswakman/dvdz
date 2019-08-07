
	
	/*
	
	jquery code is nu een beetje chaos geworden, opnieuw ordenen. Nu vanuit basis van PHPPOST, moet isotope daar wel bij? Ja.
	
	*/


/* ---------- MySQL image loader script ---------- */
$(window).load(function() {
    $range = ['1','10'];
    $filter = 'all';
    $value = '';
    phppost($range,$filter,$value);
		
});

function phppost(dataRange, dataFilter, dataValue) {
    $.post('oeuvre', {range: dataRange, filter: dataFilter, value: dataValue},
        function(output) {
	    $('.clicked-loader').remove();
            $('#oeuvre #container').append(output);
            if(typeof amount == 'undefined') { amount = '[not defined]'; }
            console.log("matching entries: "+amount);
	    
            $presentStart = $range[0];
            $presentEnd = $range[1];
	    
            for (i=$range[0]; i<=$range[1]; i++) {
                j=i+1;
                $('#oeuvre #container .item:nth-child('+j+')').hide().fadeIn(500);
                //$('#oeuvre #container .item:nth-child('+j+') .info').css('maxWidth',$(this).parent().width());
            }
	    
	    if (amount > 10) {
		$('#container').append("<div class='load-more'><a href='#'><span>&rarr;</span><br />volgende 10</a></div>");
	    }
            
            $('.item').click(function() {
		$('#detail .img img').remove();
                $('#detail .img').removeClass('align-width');
                $('#detail .text').empty();
                
		var imgwidth = $(this).find('img').width();
		var imgheight = $(this).find('img').height();
                $img_url = $(this).find('img').attr('src');
                $('#detail .img').append('<img src="' + $img_url + '" alt=" " title="kilk om te sluiten" />');
		if (imgwidth > imgheight) {
		    $('#detail .img').addClass('align-width');
		}
                $('#detail .text').html($(this).find('.info').html());
                
                $('#detail').addClass('isActive');
                setTimeout(function() {
                }, 200);
            });
	    
	    setInterval(function() {
		$('.item').each(function() {
		    $('.info', this).css('width', $('img', this).width());
		});
	    }, 500);
	    
	    
    
	    $('.load-more a').click(function(event) {
		event.preventDefault();
		$range[0] = parseInt($presentEnd) + 1;
		$range[1] = parseInt($presentEnd) + 10;
		
		console.log($filter+' = '+$value+', range = '+$range);
		phppost($range,$filter,$value);
		$(this).parent().addClass('clicked-loader');
	    });
    });
}

function imgLoaded(a) {
	a.parent().parent().css('display','inline-block').css('opacity', 0)
	a.parent().parent().animate({opacity: 1}, {duration: 1000, queue: false});
}





/*---------- ISOTOPE SORTING script ----------*/
function callIsotope(mode) {
    $('#oeuvre #container').isotope({
        // options
        itemSelector : '.item',
        layoutMode : mode,
        getSortData : {
            titel : function ( $elem ) {return $elem.find('.titel').text();},
            techniek : function ( $elem ) {return $elem.find('.techniek').text();},
            afmeting : function ( $elem ) {return $elem.find('.afmeting').text();},
            periode : function ( $elem ) {return $elem.find('.periode').text();},
            bezit : function ( $elem ) {return $elem.find('.bezti').text();},
            id : function ( $elem ) {return parseInt( $elem.find('.id').text().replace(/\D/g, ''), 10 );}
        }
    });
    t = setTimeOut(function() {$('#oeuvre #container').isotope('reloadItems')}, 500);
}

function getSortCategories(mode) {
    tech = 'none';
    var t=setTimeout(function(){
        
        $('.item').each(function(index) {
            test = $(this).find('.'+mode).text();
            if (test !== tech) {
                tech = test;
                $(this).before("<div class='item capped'>"+tech+"</div>");
                return true;
            } else {
                return true;
            }
        });
        
    },800);
}





/*---------- doc ready & click events ----------*/
$(document).ready(function() {
    $('.wrapper').not(location.hash).hide();
    $('ul#menu > li > a').removeClass('active');
    $('ul#menu > li > a[href='+location.hash+']').addClass('active');
    $('.submenu > ul').hide();
    $(location.hash+'menu').fadeIn(300);
    if(location.hash == '#kumulth') {
		$('#infomenu').fadeIn(300);
		$('ul#menu > li > a[href=#info]').addClass('active');
		$('.submenu ul > li > a').removeClass('active');
		$('a[href=#kumulth]').addClass('active');
    } else if(location.hash == '') {
		$('#oeuvre').show();
		$('#oeuvremenu').fadeIn(300);
    }
    
    
    
    //var logoLeft = $('#logo').offset().left-580;
    //$('#detail').css('width', logoLeft);
    
    $('ul#menu > li > a').click(function(e) {
        e.preventDefault();                             //prevent default click action
        
        var previous = $(this).parent().parent().find('a.active').attr('href');
        var target = $(this).attr('href');              //store 'target' and 'previous' variables
        
        $('ul#menu > li > a').removeClass('active');
        $(this).addClass('active');                     //place 'active' class on clicked item
        
        location.hash = target;
        $('body').animate({scrollLeft: $(target).offset().left}, 100);
        $(target).fadeIn(300);
        $('.wrapper').not(target).fadeOut(100);         //show target wrapper and hide others
        
        if(target !== previous) {
            $('.submenu > ul').hide();
            $(target+'menu').fadeIn(300);
        }                                               //show/hide submenus
        
        if(target === '#info') {
            $('ul#infomenu > li > a').removeClass('active');
            $('ul#infomenu > li > a[href$="#info"]').addClass('active');
        }
    });
    
    $('ul#infomenu > li > a').click(function(e) {
        e.preventDefault();                             //prevent default click action
        
        var previous = $(this).parent().parent().find('a.active').attr('href');
        var target = $(this).attr('href');              //store 'target' and 'previous' variables
        
        $('ul#infomenu > li > a').removeClass('active');
        $(this).addClass('active');                     //place 'active' class on clicked item
        
        location.hash = target;
        $('body').animate({scrollLeft: $(target).offset().left}, 300);
        $(target).fadeIn(300);
        $('.wrapper').not(target).fadeOut(100);         //show target wrapper and hide others
    });
    
    $('ul#menu > li > a, a[href$="kumulth"]').click(function(e) {
        
        /*
        $('body').animate({scrollTop: $(target).offset().top}, 300, function() {
            $(target+'menu').fadeIn(300);
            if(target === "#oeuvre") {
                $('#sort').fadeIn();
            }
        });*/
    });
    
    var t;
    $('.submenu > ul. > li').hover(function() {
	$(this).find('ul.refresh').stop(true, true).fadeIn(200);
        $(this).find('ul').stop(true, true).fadeIn(500);
    }, function() {
	$(this).find('ul.refresh').stop(true, true).fadeOut(200);
        $(this).find('ul').stop(true, true).delay(500).fadeOut(100);
    });
    
    $('ul#sort a').click(function(e) {
        var sortmode = $(this).attr('href').replace('#',"");
        $('ul#sort a').removeClass('active');
        $(this).addClass('active');
        $('.capped').remove();
        getSortCategories(sortmode);
        $('#oeuvre #container').isotope({ sortBy : sortmode });
    });
    
    $('ul.sub-categories a').click(function(event) {
	
	//zorgt dat alle oeuvremenu items weer op originele type springen en kruisje weg
	$('ul#oeuvremenu').find('a.main').each(function() {
	    $(this).empty().text($(this).attr('data-type')).removeClass('active');
	    $(this).parent().find('a.unfilter').hide();
	});
        
        event.preventDefault();
        var $category = $(this).closest('ul').parent().find('a.main');
        $value = $(this).attr('data-category');
		$range = ['1','10'];
        if ($value.indexOf(",") >= 0) {
            $value = $value.split(',');
        }
        $('#container > span').remove();
        $('#container').find('*').remove();
        $filter = $category.attr('data-type');
        $category.text($(this).clone().children().remove().end().text());
        $category.addClass('active');
        $(this).closest('ul').parent().find('a.unfilter').show();
        console.log($filter+' = '+$value+', range = '+$range);
        phppost($range,$filter,$value);
    });
    
    $('a.unfilter').click(function() {
        event.preventDefault();
        $filter = 'all';
        $value = '%';
        $('#container').find('*').remove();
        phppost(['1','10'],$filter,$value);
        $(this).parent().find('a.main').empty().text($(this).parent().find('a.main').attr('data-type')).removeClass('active');
	$('a.refresh').html('<img src="images/refresh.png" alt="" />');
        $(this).hide();
	$('body').animate({scrollLeft: 0}, 100);
    });
    
    
    $('a.refresh').click(function() {
        event.preventDefault();
        $filter = 'all';
        $value = '%';
        $('#container').find('*').remove();
        phppost(['1','10'],$filter,$value);
        $('a.unfilter').hide();
    });
    
    $('#detail .cross, #detail .img').click(function() {
        //$('#detail').hide();
        $('#detail').removeClass('isActive');
        setTimeout(function() {
            $('#detail .img img').remove();
            $('#detail .img').removeClass('align-width');
            $('#detail .text').empty();
        }, 200);
    });
});