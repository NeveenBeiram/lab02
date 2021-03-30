`use strict`;
$( document ).ready( function(){


  let keywords = [];
  $.ajax( './data/page-1.json' )
    .then( data => {
      data.forEach( dataVal => {
        let galary = new Galary( dataVal );
        galary.renderTemplate();
      } );
    } );
  $('.photo-template').first().remove();//not working ask about it!
  function Galary ( obj ){
    this.title = obj.name;
    this.img = obj.image_url;
    this.description = obj.description;
    this.keyword = obj.keyword;
    this.horns = obj.horns;
  }
  Galary.prototype.renderTemplate = function(){

    let tempClone = $( '#photo-template' ).first().clone();
    tempClone.addClass( this.keyword );
    tempClone.find('h2').text(this.title);//not working!
    tempClone.find( 'img' ).attr( 'src',this.img );
    tempClone.find('p').text(this.description);
    $( 'main' ).append( tempClone );
    if ( !( keywords.includes( this.keyword ) ) ){
      keywords.push( this.keyword );
      let optionElement = $( '<option> </option>' ).attr( 'value',this.keyword ).text( this.keyword );
      $( 'select' ).append( optionElement );
    }
  };
  $( 'select' ).change( ( e ) => {
    $( 'div' ).hide();
    let targetValue = e.target.value;
    $( `.${targetValue}` ).show();
    if( targetValue === 'default' ){
      $( 'div' ).show();
    }
  } );
} );




