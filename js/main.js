!function(){    
"use strict";
    //*********//
    //Page Load//
    //*********//
        var turnCounter = 0;
        var computerOption = document.getElementsByClassName('box');
        var userName;
    //build start screen and winner screen
        $('body').append('<div class="screen screen-start" id="start"><header><h1>Tic Tac Toe</h1><a href="#" class="button">Start game</a></header></div>');
        $('body').append('<div class="screen screen-win" id="finish"><header><h1>Tic Tac Toe</h1><p class="message"></p><a href="#" class="button">New game</a></header></div>');
    
//    <form><input type="text" id="startname"</form>
    
    //functions
        function hoverOn() {
            if ($(this).hasClass('box-filled-1') || $(this).hasClass('box-filled-2')){
                //do nothing
            }else if ($('#player1').hasClass('active')){
                $(this).css('background-image', 'url(img/o.svg)');
            } else $(this).css('background-image', 'url(img/x.svg)');
        }
        function hoverOff() {
            if ($(this).hasClass('box-filled-1') || $(this).hasClass('box-filled-2')){
                //do nothing
            } else $(this).css('background-image', 'none');
        }
    
    //add hover attribute to board boxes
        $('.box').hover(hoverOn, hoverOff);
    //hide gameboard
        function hideBoard() {
            $('#board').hide();
        }
        function showBoard() {
            $('#board').show();
        }
    //show and hide start page
        function showStartPage() {
            $('#start').show();
        }
        function hideStartPage() {
            $('#start').hide();
        }
    //show and hide Winner page
        function showWinPage() {
            $('#finish').show();
        }
        function hideWinPage() {
            $('#finish').hide();
        }
    //hide board and winner page on boot
        hideBoard();
        hideWinPage();
    //set event listener for start button
        $('#start a').on('click', function(){
            userName = prompt('enter a name to play')
            hideStartPage();
            showBoard();
            //show player ones turn
            $('#player1').after("<h2 id='username'>" + userName + "</h2>");
            $('#player1').addClass('active');
            
        });
    
    //*********//
    //Game Play//
    //*********//
    
        
    //Check for winner
    function checkWinner(){
        turnCounter++;
        var winCombo = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        var checkedO = [];
        var checkedX = [];
        var counter = 0;
        var oPoints = 0;
        var xPoints = 0;
        
        $('.box').each(function(){
            if ($(this).hasClass('box-filled-1')){
                checkedO.push(counter)
            } else if ($(this).hasClass('box-filled-2')){
                checkedX.push(counter)
            }
            counter++;
        });
        if (checkedO.length >= 3){
            for (var i = 0; i < winCombo.length; i++){
                oPoints = 0;
                for (var x = 0; x < winCombo[i].length; x++){
                    for (var z = 0; z < checkedO.length; z++){
                        if (checkedO[z].toString() === winCombo[i][x].toString()){
                            oPoints++;
                            if(oPoints >= 3){
                                hideBoard();
                                $('#finish').addClass('screen-win-one');
                                if (userName === ''){
                                   $('#finish p').text("O Wins!"); 
                                }else $('#finish p').text(userName + " Wins!");
                                showWinPage();
                                return;
                            }   
                        }
                    }
                }
            }
        }
        if (checkedX.length >= 3){
            for (var i = 0; i < winCombo.length; i++){
                xPoints = 0;
                for (var x = 0; x < winCombo[i].length; x++){
                    for (var z = 0; z < checkedX.length; z++){
                        if (checkedX[z].toString() === winCombo[i][x].toString()){
                            xPoints++;
                            if(xPoints >= 3){
                                hideBoard();
                                $('#finish').addClass('screen-win-two');
                                $('#finish p').text("X Wins!");
                                showWinPage();
                                return;
                            }   
                        }
                    }
                }
            }
        }
        if (turnCounter === 9){
            hideBoard();
            $('#finish').addClass('screen-win-tie');
            $('#finish p').text("It's a Draw...");
            showWinPage();
            return;
        }
        
    }
    
    //computer player
        function aiTurn() {
            if (turnCounter === 9){
                return;
            } else {
                var openSpaces = [];
                var counter2 = 0;
                $('.box').each(function(){
                    if ($(this).hasClass('box-filled-1') || $(this).hasClass('box-filled-2')){
                        //do nothing
                    } else {
                        openSpaces.push(counter2);
                    }
                    counter2++;
                });
                var pickSpace = openSpaces[Math.floor(Math.random()*openSpaces.length)];
                computerOption[pickSpace].className += ' box-filled-2 ';
                computerOption[pickSpace].style.backgroundImage = 'url(img/x.svg)';
//                $('.box').find(pickSpace).css('background-image', 'url(img/x.svg)');
                $('#player2').removeClass('active');
                $('#player1').addClass('active');
                checkWinner();  
            }
            
        }
    
    
    //X's and O's
        $('.box').on('click', function(){
            if ($(this).hasClass('box-filled-1') || $(this).hasClass('box-filled-2')){
                return;
            }else if ($('#player1').hasClass('active')){
                $(this).addClass('box-filled-1');
                $('#player1').removeClass('active');
                $('#player2').addClass('active');
            }
            checkWinner();
            aiTurn();
        });
    //restart game
        $('#finish a').on('click', function(){
            $('.box').removeClass('box-filled-1');
            $('.box').removeClass('box-filled-2');
            $('.box').css('background-image', 'none');
            hideWinPage();
            $('#finish').removeClass('screen-win-tie screen-win-one screen-win-two')
            showBoard();
            $('#player1').addClass('active');
            $('#player2').removeClass('active');
            turnCounter = 0;
        })
}();