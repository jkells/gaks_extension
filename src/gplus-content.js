function Extension()
{
    var _this = this;

    this.already_triggered = false;
    this.dom_modified = function () {

        // Super simple rate limiting
        if(_this.already_triggered){
           return;
        }

         _this.already_triggered = true;
        setTimeout(function(){
            _this.already_triggered = false;
           _this.AddMuteLink();
        }, 800);
    };

    // Helper to dispatch an event
    var dispatchMouseEvent = function(target, var_args) {
        var e = document.createEvent("MouseEvents");
        e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
        target.dispatchEvent(e);
    };

    this.AddMuteLink = function() {
        // These are the items we click on to mute a post
        var muteItems = $('div .a-b-f-i-Fb-C').not("div.gak-applied");
        muteItems.addClass("gak-applied");

        muteItems.each(function(){
            var oldMuteLink = $(this);

            //Add a new link
            var newMuteLink = $("<span class='d-h' style='position: absolute; right: 40px; top: 11px;'>Mute</div>");
            $(this)
                .parent()
                .parent()
                .prepend(newMuteLink);

            // Proxy the click event
            newMuteLink.click(function(){
                newMuteLink.remove();
                dispatchMouseEvent(oldMuteLink[0], 'mouseover', true, true);
                dispatchMouseEvent(oldMuteLink[0], 'mousedown', true, true);
                dispatchMouseEvent(oldMuteLink[0], 'click', true, true);
                dispatchMouseEvent(oldMuteLink[0], 'mouseup', true, true);
            });
        });
    };

    this.init = function()
    {
        console.log("Gak's Extension Loaded.");
        setTimeout(function()
        {
            _this.AddMuteLink();
        }, 100);
        $("#contentPane").bind("DOMSubtreeModified", this.dom_modified);
    };
}

// Initialize the extension.
ext = new Extension();
ext.init();
