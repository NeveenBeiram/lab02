`use strict`;
$( document ).ready( function(){
  const firstPage='./data/page-1.json';
  const secondPage='./data/page-2.json';
  let filterArr=[];
  let keywords = [];
  // let galary;

  // $.ajax( './data/page-1.json' )
  //   .then( data => {
  //     data.forEach( dataVal => {
  //       filterArr=data;
  //       galary = new Galary( dataVal );
  //       galary.renderTemplate();
  //     } );

  //   } );

  function renderpage(galaryData){
    $('main').empty();
    $('.keyword > option').not(':first').remove();
    keywords=[];
    galaryData.forEach(data=>{
      let galary = new Galary(data);
      galary.renderTemplate();
    });
  }

  function getData (jsonPage){
    $.ajax(jsonPage)
      .then (data =>{
        filterArr =data;
        data.sort ((a,b)=>(a.title>b.title)?1 :-1);
        renderpage(data);
      });
  }


  // $('#first').on('click',function (){
  //   keywords=[];
  //   $('main').empty();
  //   $('.keyword > option').not(':first').remove();
  //   $.ajax( './data/page-1.json' )
  //     .then( data => {
  //       data.forEach( dataVal => {
  //         // console.log(dataVal+'nnnn');
  //         galary = new Galary( dataVal );
  //         galary.renderTemplate();
  //       } );

  //     } );

  // });


  // $('#second').on('click',function(){
  //   keywords=[];
  //   $('main').empty();
  //   $('.keyword > option').not(':first').remove();

  //   $.ajax('./data/page-2.json')
  //     .then(data2 =>{
  //       data2.forEach(dataVal2=>{
  //         let galary2 = new Galary(dataVal2);
  //         galary2.renderTemplate();
  //       });
  //     });
  // });



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



    if ( !( keywords.includes( this.keyword ) ) ){
      keywords.push( this.keyword );
      let optionElement = $( '<option> </option>' ).attr( 'value',this.keyword ).text( this.keyword );
      $( '.keyword' ).append( optionElement );
    }
  };
  getData(firstPage);

  $( '.keyword' ).change( ( e ) => {
    $( 'div' ).hide();
    let targetValue = e.target.value;
    $( `.${targetValue}` ).show();
    if( targetValue === 'default' ){
      $( 'div' ).show();
    }
  } );

  $('#filter').change((e)=>{
    if(e.target.value==='horns'){
      filterArr.sort((a,b)=>(a.horns>b.horns)?1:-1);
      renderpage(filterArr);
    }
    if(e.target.value==='name'){
      filterArr.sort((a,b)=>{
        a.title.toUpperCase() < b.title.toUpperCase() ?-1:a.title.toUpperCase() > b.title.toUpperCase()?1:0;
      });
      renderpage(filterArr);

    }
  });
  // filterArr.sort((a,b)=>(a.title>b.title)?1:-1);

  $('.page').click((e)=>{
    let numOfPage=e.target.value;
    if(numOfPage==='page1'){
      getData(firstPage);
    }
    if(numOfPage==='page2'){
      getData(secondPage);
    }
    // $('select').prop('selectedIndex',0);
  });

  //   let targetValue =e.target.value ;
  //   if(targetValue==='title'){
  //     $('main').empty();
  //   $('.keyword > option').not(':first').remove();
  //     filterArr.sort((a,b)=>{
  //       if( a.title.toUpperCase()>b.toUpperCase())return 1;
  //       if(a.title.toUpperCase()<b.toUpperCase())return -1;
  //       // else return 0;
  //     });filterArr.renderTemplate();
  //   }

  //   else if(targetValue==='horns'){
  //     filterArr.sort((a,b)=>{
  //       return a.horns - b.horns;
  //     });filterArr.renderTemplate();
  //   }
  //   else if(targetValue==='sortBy'){
  //     filterArr.renderTemplate();
  //   }
  // });


} );




