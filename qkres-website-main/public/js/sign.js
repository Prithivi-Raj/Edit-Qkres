function myFunction(){document.getElementById("userInfo").style.display="block",document.getElementById("signbutton").style.display="none"}$(document).ready(function(){$("#signbutton").click(function(s){$("#inputPassword").val()!=$("#confirmPassword").val()&&s.preventDefault()})}),$("#inputPassword, #confirmPassword").on("keyup",function(){$("#inputPassword").val().length>=8&&$("#confirmPassword").val().length>=8?$("#inputPassword").val()===$("#confirmPassword").val()?($("#message").css("color","green"),$("#message").html("Matched")):($("#message").css("color","red"),$("#message").html("Both Passwords are not matching")):$("#inputPassword").val().length<8&&$("#inputPassword").val().length>=1?($("#message").css("color","red"),$("#message").html("Password should be atleast 8 characters")):$("#inputPassword").val().length<=0?($("#message").css("color","red"),$("#message").html("Enter password")):$("#inputPassword").val().length>=8&&($("#message").css("color","green"),$("#message").html("Confirm your password"))}),$.strength=function(s,e){var t=["","progress-bar-danger","progress-bar-danger","progress-bar-warning","progress-bar-success","progress-bar-success"],o=0;e.length>6&&o++,e.match(/[a-z]/)&&e.match(/[A-Z]/)&&o++,e.match(/\d+/)&&o++,e.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)&&o++,e.length>10&&o++,s.removeClass(t[o-1]).addClass(t[o]).css([{width:"0px"},{width:"20%"},{width:"40%"},{width:"60%"},{width:"80%"},{width:"100%"}][o])},$(function(){$("#inputPassword").keyup(function(){$.strength($("#progress-bar"),$(this).val())})}),$(window).scroll(function(){$(window).scrollTop()<150?$(".fixed-top").css("background","#fff"):$(".fixed-top").css("background","#d3dbff")});