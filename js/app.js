`use strict`;
$( document ).ready( function(){


  let keywords = [];
  let galary;
  $.ajax( './data/page-1.json' )
    .then( data => {
      data.forEach( dataVal => {
        galary = new Galary( dataVal );
        galary.renderTemplate();
      } );
      // $('#photo-template').first().remove();
    } );

  $('#first').on('click',function (){
    keywords=[];
    $('main').empty();
    $('.keyword > option').not(':first').remove();
    $.ajax( './data/page-1.json' )
      .then( data => {
        data.forEach( dataVal => {
          // console.log(dataVal+'nnnn');
          galary = new Galary( dataVal );
          galary.renderTemplate();
        } );
      // $('#photo-template').first().remove();
      } );
    // galary.renderTemplate();
  });


  $('#second').on('click',function(){
    keywords=[];
    $('main').empty();
    $('.keyword > option').not(':first').remove();

    $.ajax('./data/page-2.json')
      .then(data2 =>{
        data2.forEach(dataVal2=>{
          let galary2 = new Galary(dataVal2);
          galary2.renderTemplate();
        });
      });
  });



  function Galary ( obj ){
    this.title = obj.title;
    this.img = obj.image_url;
    this.description = obj.description;
    this.keyword = obj.keyword;
    this.horns = obj.horns;
  }
  Galary.prototype.renderTemplate = function(){

    // let tempClone = $( '#photo-template' ).first().clone();
    // tempClone.addClass( this.keyword );
    // tempClone.find( 'img' ).attr( 'src',this.img );
    // tempClone.find( 'h2' ).text( this.title );
    // tempClone.find('p').text(this.description);
    // $( 'main' ).append( tempClone );



    let tTemplate=$('#photo-Mustache').html();
    let renderTemplate=Mustache.render(tTemplate,this);
    $('main').append(renderTemplate);

    // $('#first').click(function(){

    // });

    if ( !( keywords.includes( this.keyword ) ) ){
      keywords.push( this.keyword );
      let optionElement = $( '<option> </option>' ).attr( 'value',this.keyword ).text( this.keyword );
      $( '.keyword' ).append( optionElement );
    }
  };
  $( '.keyword' ).change( ( e ) => {
    $( 'div' ).hide();
    let targetValue = e.target.value;
    $( `.${targetValue}` ).show();
    if( targetValue === 'default' ){
      $( 'div' ).show();
    }
  } );

  $('#filter').change((e)=>{
    let targetValue =e.target.value ;
    if(targetValue==='title'){

    }

    else if(targetValue==='horns'){
      
    }
    else if(targetValue==='sortBy'){

    }
  });


} );




