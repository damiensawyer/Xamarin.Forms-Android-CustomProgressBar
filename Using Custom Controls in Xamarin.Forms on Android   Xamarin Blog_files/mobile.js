$(function() {
    
    var globalBar = $('#global-header .global-bar');
    var localBar = $('.local-bar');
    
    if (globalBar.length > 0) {
        
        if ($('body').attr('data-format') == 'tablet') {
            globalBar.find('.navigation > ul > li.dropdown').attr('data-hover');
            globalBar.find('.navigation > ul > li.dropdown > a').attr('data-toggle', 'dropdown');
        } else {
            globalBar.find('.navigation > ul > li.dropdown').attr('data-hover', 'dropdown');
            globalBar.find('.navigation > ul > li.dropdown > a').attr('data-toggle', '');
        }
        
        // Replace "Menu" from mobile global-bar into active item label
        
        var activeGlobalBarItem = globalBar.find('.navigation > ul > li.active');
        if (activeGlobalBarItem.length > 0) {
            globalBar.find('.label .menu').text(activeGlobalBarItem.find('> a').text());
        }
        
        
        // Show mobile global bar dropdown
        
        globalBar.find('.navigation > .label').on('click', function(e) {
            e.preventDefault();
            var navigation = $(this).parents('.navigation');
            navigation.toggleClass('in');
        });
        
    }
    
    if (localBar.length > 0) {
        
        // Show mobile local bar dropdown
        
        localBar.find('.navigation').on('click', '> ul > li.active > a', function(e) {
            if ($('body').attr('data-format') == 'mobile') {
                e.preventDefault();
                var navigation = $(this).parents('.navigation');
                navigation.toggleClass('in');
            }
        });
                
    }
    
});