const socket = io();

function onLoadFnc(){
    socket.emit('peopleCount', {
    });
};

socket.on('peopleCount', message => {
    if(message.warning){
        $('.warning').show();
        $('.normalView').hide();
    }else{
        $('.warning').hide();
        $('.normalView').show();
    }
    counterLoader(message);
});

(function ($) {
    $.fn.countTo = function (message, options) {
        options = options || {};

        console.log($(this))
        if($(this).attr('id') == 'count-people-capacity'){
            console.log("message.peopleLimit : " + message.peopleLimit);
            $(this).data('to', message.peopleLimit);
        }

        if($(this).attr('id') == 'count-current-people'){
            console.log("message.peopleCount : " + message.peopleCount);
            $(this).data('to', message.peopleCount);
        }

        if($(this).attr('id') == 'count-people-enterable'){
            console.log("message.peopleEnterable : " + message.peopleEnterable)
            $(this).data('to', message.peopleEnterable);
        }

        return $(this).each(function () {
            // set options for current element
            var settings = $.extend({}, $.fn.countTo.defaults, {
                from:            $(this).data('from'),
                to:              $(this).data('to'),
                speed:           $(this).data('speed'),
                refreshInterval: $(this).data('refresh-interval'),
                decimals:        $(this).data('decimals'),
                id:              $(this).attr('id')
            }, options);

            // how many times to update the value, and how much to increment the value on each update
            var loops =     Math.ceil(settings.speed / settings.refreshInterval),
                increment = (settings.to - settings.from) / loops;

            // references & variables that will change with each update
            var self = this,
                $self = $(this),
                loopCount = 0,
                value = settings.from,
                data = $self.data('countTo') || {};
            console.log(settings.to);
            render(settings.to);

            function render(value) {
                var formattedValue = settings.formatter.call(self, value, settings);
                $self.html(formattedValue);
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0,               // the number the element should start at
        to: 0,                 // the number the element should end at
        speed: 5000,           // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,           // the number of decimal places to show
        formatter: formatter,  // handler for formatting the value before rendering
        onUpdate: null,        // callback method for every time the element is updated
        onComplete: null       // callback method for when the element finishes updating
    };

    function formatter(value, settings) {
        console.log("settings.decimals : " + settings.decimals + " value = " + value);
        return value;//value.toFixed(settings.decimals);
    }
}(jQuery));

function counterLoader(message) {
    // custom formatting example

    // start all the timers
    $('.timer').each(count);

    function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(message, options);
    }
};