$j(document).on({mouseover:function(){HoverIntent.onEnterIntent(this,function(){$j(this).find(".groupUserDetails").show()})},mouseout:function(){HoverIntent.onLeaveIntent(this,function(){$j(this).find(".groupUserDetails").hide()})}},".comment .commentAuthor");