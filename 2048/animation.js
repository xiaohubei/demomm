
function showNumWithAnimation( i,j,randomNum ){
//alert(1)
	var NumCell=$('#number-cell-'+i+'-'+j);
    NumCell.css('background-color',getNumberBackgroundColor( randomNum ) );
    NumCell.css('color',getNumberColor(randomNum ) );
    NumCell.text( getNumberText( randomNum ) );
    //NumCell.text(  randomNum  );

    NumCell.animate({
    	'width':cellBlockWidth,
    	'height':cellBlockWidth,
    	'left':getPostLeft(i,j),
    	'top':getPostTop(i,j),

    },50);
};

function showMoveAnimation( fromx,fromy,tox,toy ){
	var cellNum=$('#number-cell-'+fromx+'-'+fromy);
	cellNum.animate({
			left:getPostLeft(tox, toy),
			top:getPostTop(tox, toy),
			},200);
}

function updateScore(score){
	$('#score').text(score);
};








